import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/dcf34c35-43e9-4e43-ad3a-efbf8f2d3ec2";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
}

const News = () => {
  const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=news`);
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <img 
          src="https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg" 
          alt="Логотип фон" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="bg-primary text-white py-8 relative z-10">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/10 mb-4"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад на главную
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-oswald font-bold">НОВОСТИ КОМАНДЫ</h1>
              <p className="text-xl font-roboto mt-2">Последние события и анонсы</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {loading ? (
          <div className="text-center py-12">
            <Icon name="Loader" className="animate-spin mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">Загрузка новостей...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card 
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white/95 backdrop-blur overflow-hidden group"
                onClick={() => handleNewsClick(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white">
                      {item.date}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-oswald font-bold mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 font-roboto">
                    {item.excerpt}
                  </p>
                  <Button variant="link" className="mt-4 p-0 h-auto font-oswald text-primary">
                    Читать далее
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <p className="text-xl text-muted-foreground">Новостей пока нет</p>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-oswald">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{selectedNews.date}</span>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="whitespace-pre-wrap font-roboto">
                    {selectedNews.content || selectedNews.excerpt}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default News;
