import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  author: string;
  image: string;
  content: string;
  category: string;
}

const News = () => {
  const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isAdminMode, setIsAdminMode] = React.useState(false);
  const [adminPassword, setAdminPassword] = React.useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newNewsForm, setNewNewsForm] = React.useState({
    title: "",
    content: "",
    category: "news",
    image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg"
  });
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const [news, setNews] = React.useState<NewsItem[]>([
    {
      id: 1,
      title: "Сибирские Снайперы готовятся к новому сезону",
      date: "15.10.2025",
      author: "@DriverEdits",
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg",
      content: "Команда провела интенсивные тренировки перед стартом сезона. Игроки в отличной форме и готовы показать лучший хоккей!",
      category: "news"
    },
    {
      id: 2,
      title: "Новые игроки в составе команды",
      date: "14.10.2025",
      author: "@DriverEdits",
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg",
      content: "Руководство клуба объявило о подписании контрактов с новыми хоккеистами. Среди новичков - kenzo, который займет позицию под номером 10.",
      category: "transfers"
    },
    {
      id: 3,
      title: "Билеты на первый матч уже в продаже",
      date: "13.10.2025",
      author: "@DriverEdits",
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg",
      content: "Не упустите возможность поддержать команду на домашней арене. Билеты доступны в разделе 'Купить билеты'.",
      category: "news"
    }
  ]);

  const handleAdminLogin = () => {
    if (adminPassword === "DriverEdits2025") {
      setIsAdminMode(true);
      setAdminPassword("");
    } else {
      alert("Неверный пароль!");
    }
  };

  const handleCreateNews = () => {
    const newItem: NewsItem = {
      id: news.length + 1,
      title: newNewsForm.title,
      date: new Date().toLocaleDateString('ru-RU'),
      author: "@DriverEdits",
      image: newNewsForm.image,
      content: newNewsForm.content,
      category: newNewsForm.category
    };
    
    setNews([newItem, ...news]);
    setIsCreateDialogOpen(false);
    setNewNewsForm({
      title: "",
      content: "",
      category: "news",
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg"
    });
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm("Удалить эту новость?")) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  const filteredNews = categoryFilter === "all" 
    ? news 
    : news.filter(item => item.category === categoryFilter);

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
            {!isAdminMode ? (
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const password = prompt("Введите пароль администратора:");
                  if (password === "DriverEdits2025") {
                    setIsAdminMode(true);
                  }
                }}
              >
                <Icon name="Lock" className="mr-2" size={20} />
                Вход для @DriverEdits
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <Icon name="Plus" className="mr-2" size={20} />
                  Создать новость
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => setIsAdminMode(false)}
                >
                  <Icon name="LogOut" className="mr-2" size={20} />
                  Выйти
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex gap-4 mb-8 flex-wrap">
          <Button
            variant={categoryFilter === "all" ? "default" : "outline"}
            onClick={() => setCategoryFilter("all")}
            className="font-oswald"
          >
            ВСЕ НОВОСТИ
          </Button>
          <Button
            variant={categoryFilter === "news" ? "default" : "outline"}
            onClick={() => setCategoryFilter("news")}
            className="font-oswald"
          >
            <Icon name="Newspaper" className="mr-2" size={20} />
            НОВОСТИ
          </Button>
          <Button
            variant={categoryFilter === "transfers" ? "default" : "outline"}
            onClick={() => setCategoryFilter("transfers")}
            className="font-oswald"
          >
            <Icon name="ArrowLeftRight" className="mr-2" size={20} />
            ТРАНСФЕРЫ
          </Button>
          <Button
            variant={categoryFilter === "matches" ? "default" : "outline"}
            onClick={() => setCategoryFilter("matches")}
            className="font-oswald"
          >
            <Icon name="Trophy" className="mr-2" size={20} />
            МАТЧИ
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card 
              key={item.id} 
              className="hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
            >
              <div 
                className="relative h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-accent">
                  {item.category === "news" && "Новости"}
                  {item.category === "transfers" && "Трансферы"}
                  {item.category === "matches" && "Матчи"}
                </Badge>
                {isAdminMode && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-4 right-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNews(item.id);
                    }}
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Icon name="Calendar" size={16} />
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="text-primary font-semibold">{item.author}</span>
                </div>
                <CardTitle className="font-oswald text-xl group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2 mb-4">{item.content}</p>
                <Button 
                  className="w-full font-oswald"
                  onClick={() => {
                    setSelectedNews(item);
                    setIsDialogOpen(true);
                  }}
                >
                  ЧИТАТЬ ПОЛНОСТЬЮ
                  <Icon name="ArrowRight" className="ml-2" size={18} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <Icon name="FileText" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-2xl font-oswald text-muted-foreground">Новостей пока нет</h3>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <div 
                  className="h-64 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url('${selectedNews.image}')` }}
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Icon name="Calendar" size={16} />
                  <span>{selectedNews.date}</span>
                  <span>•</span>
                  <span className="text-primary font-semibold">{selectedNews.author}</span>
                </div>
                <DialogTitle className="font-oswald text-3xl">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedNews.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-oswald text-2xl">СОЗДАТЬ НОВОСТЬ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок *</Label>
              <Input
                id="title"
                value={newNewsForm.title}
                onChange={(e) => setNewNewsForm({ ...newNewsForm, title: e.target.value })}
                placeholder="Введите заголовок новости"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория *</Label>
              <div className="flex gap-2">
                <Button
                  variant={newNewsForm.category === "news" ? "default" : "outline"}
                  onClick={() => setNewNewsForm({ ...newNewsForm, category: "news" })}
                >
                  Новости
                </Button>
                <Button
                  variant={newNewsForm.category === "transfers" ? "default" : "outline"}
                  onClick={() => setNewNewsForm({ ...newNewsForm, category: "transfers" })}
                >
                  Трансферы
                </Button>
                <Button
                  variant={newNewsForm.category === "matches" ? "default" : "outline"}
                  onClick={() => setNewNewsForm({ ...newNewsForm, category: "matches" })}
                >
                  Матчи
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Текст новости *</Label>
              <Textarea
                id="content"
                value={newNewsForm.content}
                onChange={(e) => setNewNewsForm({ ...newNewsForm, content: e.target.value })}
                placeholder="Введите текст новости..."
                rows={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL изображения</Label>
              <Input
                id="image"
                value={newNewsForm.image}
                onChange={(e) => setNewNewsForm({ ...newNewsForm, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <Button 
              className="w-full font-oswald text-lg py-6"
              disabled={!newNewsForm.title || !newNewsForm.content}
              onClick={handleCreateNews}
            >
              <Icon name="Send" className="mr-2" size={20} />
              ОПУБЛИКОВАТЬ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default News;
