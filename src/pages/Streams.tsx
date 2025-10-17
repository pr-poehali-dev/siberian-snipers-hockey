import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/90140830-0c8d-4493-bfe2-be85f46b2961";

interface Stream {
  id: number;
  match_id?: number;
  title: string;
  stream_url: string;
  status: string;
  scheduled_time: string;
  thumbnail?: string;
}

const Streams = () => {
  const navigate = useNavigate();
  const [streams, setStreams] = React.useState<Stream[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadStreams();
  }, []);

  const loadStreams = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=streams`);
      const data = await response.json();
      setStreams(data.streams || []);
    } catch (error) {
      console.error("Failed to load streams:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      live: { text: '🔴 В ЭФИРЕ', color: 'bg-red-600' },
      scheduled: { text: '📅 По расписанию', color: 'bg-blue-600' },
      ended: { text: '✅ Завершен', color: 'bg-gray-600' }
    };
    const badge = badges[status as keyof typeof badges] || badges.scheduled;
    return <Badge className={`${badge.color} text-white`}>{badge.text}</Badge>;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleWatchStream = (streamUrl: string) => {
    window.open(streamUrl, '_blank');
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
          <div className="flex items-center gap-4">
            <Icon name="Video" size={48} />
            <div>
              <h1 className="text-5xl font-oswald font-bold">ТРАНСЛЯЦИИ МАТЧЕЙ</h1>
              <p className="text-xl font-roboto mt-2">Смотрите все игры команды онлайн</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {loading ? (
          <div className="text-center py-12">
            <Icon name="Loader" className="animate-spin mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">Загрузка трансляций...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {streams.map((stream) => (
              <Card 
                key={stream.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-white/95 backdrop-blur"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center">
                  {stream.thumbnail ? (
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="Video" size={80} className="text-white opacity-50" />
                  )}
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(stream.status)}
                  </div>
                  {stream.status === 'live' && (
                    <div className="absolute inset-0 bg-red-600/20 animate-pulse" />
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-oswald font-bold mb-3">
                    {stream.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Icon name="Calendar" size={16} />
                    <span className="font-roboto">{formatDate(stream.scheduled_time)}</span>
                  </div>
                  
                  <Button 
                    onClick={() => handleWatchStream(stream.stream_url)}
                    className="w-full font-oswald text-lg"
                    variant={stream.status === 'live' ? 'default' : 'outline'}
                  >
                    {stream.status === 'live' ? (
                      <>
                        <Icon name="Play" className="mr-2" size={20} />
                        Смотреть прямой эфир
                      </>
                    ) : stream.status === 'ended' ? (
                      <>
                        <Icon name="RotateCcw" className="mr-2" size={20} />
                        Смотреть повтор
                      </>
                    ) : (
                      <>
                        <Icon name="Clock" className="mr-2" size={20} />
                        Напомнить о трансляции
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && streams.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Video" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <p className="text-xl text-muted-foreground">Трансляций пока нет</p>
            <p className="text-sm text-muted-foreground mt-2">Следите за расписанием матчей</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Streams;
