import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/90140830-0c8d-4493-bfe2-be85f46b2961";

interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  goals: number;
  assists: number;
  image: string;
  is_captain?: boolean;
  is_assistant?: boolean;
}

interface Match {
  id: number;
  date: string;
  opponent: string;
  is_home: boolean;
  score: string;
  status: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("players");
  const [positionFilter, setPositionFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [playersRes, matchesRes, newsRes] = await Promise.all([
        fetch(`${API_URL}?path=players`),
        fetch(`${API_URL}?path=matches`),
        fetch(`${API_URL}?path=news`)
      ]);

      const playersData = await playersRes.json();
      const matchesData = await matchesRes.json();
      const newsData = await newsRes.json();

      setPlayers(playersData.players || []);
      setMatches(matchesData.matches || []);
      setNews(newsData.news || []);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const standings: Array<{place: number; team: string; games: number; wins: number; losses: number; points: number}> = [];

  const management: Array<{name: string; position: string; experience: string}> = [];

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/shop")}
          className="bg-white/90 hover:bg-white shadow-lg"
        >
          <Icon name="ShoppingBag" className="mr-2" size={16} />
          Магазин
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/admin")}
          className="bg-white/90 hover:bg-white shadow-lg"
        >
          <Icon name="Settings" className="mr-2" size={16} />
          Админ
        </Button>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <img 
          src="https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg" 
          alt="Логотип фон" 
          className="w-full h-full object-contain"
        />
      </div>
      <div 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center text-white z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 38, 71, 0.7), rgba(10, 38, 71, 0.85)), url('https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg')`
        }}
      >
        <div className="text-center space-y-6 animate-fade-in">
          <img 
            src="https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png" 
            alt="Логотип Сибирские Снайперы" 
            className="w-64 h-64 mx-auto mb-6 object-contain"
          />
          <h1 className="text-7xl font-oswald font-bold tracking-wider">СИБИРСКИЕ СНАЙПЕРЫ</h1>
          <p className="text-2xl font-roboto tracking-wide">ХОККЕЙНЫЙ КЛУБ</p>
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-oswald text-lg px-8"
              onClick={() => navigate("/tickets")}
            >
              КУПИТЬ БИЛЕТЫ
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-oswald text-lg px-8"
              onClick={() => navigate("/streams")}
            >
              ТРАНСЛЯЦИИ МАТЧЕЙ
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">


        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="players" className="font-oswald text-sm py-4 px-2">ИГРОКИ</TabsTrigger>
            <TabsTrigger value="matches" className="font-oswald text-sm py-4 px-2">МАТЧИ</TabsTrigger>
            <TabsTrigger value="news" className="font-oswald text-sm py-4 px-2">НОВОСТИ</TabsTrigger>
            <TabsTrigger value="standings" className="font-oswald text-sm py-4 px-2">ТАБЛИЦА</TabsTrigger>
            <TabsTrigger value="streams" className="font-oswald text-sm py-4 px-2" onClick={() => navigate("/streams")}>ТРАНСЛЯЦИИ</TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-6 min-h-[400px]">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-4xl font-oswald">СОСТАВ КОМАНДЫ</h2>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={positionFilter === "all" ? "default" : "outline"}
                    onClick={() => setPositionFilter("all")}
                    className="font-oswald"
                  >
                    ВСЕ
                  </Button>
                  <Button 
                    variant={positionFilter === "Универсальный" ? "default" : "outline"}
                    onClick={() => setPositionFilter("Универсальный")}
                    className="font-oswald"
                  >
                    УНИВЕРСАЛЬНЫЕ
                  </Button>
                  <Button 
                    variant={positionFilter === "Вратарь" ? "default" : "outline"}
                    onClick={() => setPositionFilter("Вратарь")}
                    className="font-oswald"
                  >
                    ВРАТАРИ
                  </Button>
                </div>
              </div>
              <div className="relative max-w-md">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Поиск по имени или номеру..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-roboto"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {players
                .filter(player => positionFilter === "all" || player.position === positionFilter)
                .filter(player => {
                  const query = searchQuery.toLowerCase();
                  return player.name.toLowerCase().includes(query) || 
                         player.number.toString().includes(query);
                })
                .map((player) => (
                <Card key={player.id} className="overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative h-64 overflow-hidden bg-gradient-to-b from-primary/20 to-primary/5">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-oswald text-xl font-bold shadow-lg">
                      {player.number}
                    </div>
                    {player.is_captain && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full font-oswald text-sm font-bold shadow-lg">
                        C
                      </div>
                    )}
                    {player.is_assistant && (
                      <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full font-oswald text-sm font-bold shadow-lg">
                        A
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-oswald text-xl mb-2">{player.name}</h3>
                    <Badge variant="secondary" className="mb-3">{player.position}</Badge>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Голы</p>
                        <p className="font-bold text-lg">{player.goals || '-'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Передачи</p>
                        <p className="font-bold text-lg">{player.assists || '-'}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full font-oswald" 
                      size="sm"
                      onClick={() => navigate(`/player/${player.id}`)}
                    >
                      <Icon name="BarChart" className="mr-2" size={16} />
                      СТАТИСТИКА
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {players.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Users" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВЯТСЯ ИГРОКИ</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">РАСПИСАНИЕ МАТЧЕЙ</h2>
            <div className="space-y-4">
              {matches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-6 flex-wrap">
                        <div className="text-center min-w-[100px]">
                          <p className="font-oswald text-sm text-muted-foreground">{match.date}</p>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="font-oswald text-xl">Сибирские Снайперы</span>
                          <Icon name="Swords" size={20} className="text-accent" />
                          <span className="font-oswald text-xl">{match.opponent}</span>
                        </div>
                        <Badge variant={match.is_home ? "default" : "outline"}>
                          {match.is_home ? "Дома" : "В гостях"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-oswald text-3xl font-bold">{match.score}</span>
                        <Badge 
                          variant={match.status === "Победа" ? "default" : match.status === "Ничья" ? "secondary" : "outline"}
                          className={match.status === "Победа" ? "bg-green-600" : ""}
                        >
                          {match.status}
                        </Badge>
                        {match.is_home && (
                          <Button 
                            onClick={() => navigate("/tickets")}
                            className="font-oswald"
                          >
                            <Icon name="Ticket" size={18} className="mr-2" />
                            КУПИТЬ БИЛЕТ
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {matches.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Calendar" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВЯТСЯ МАТЧИ</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="news" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">НОВОСТИ КЛУБА</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-primary hover:bg-white">
                        {article.date}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-oswald text-xl mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground font-roboto text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Button variant="link" className="mt-4 p-0 font-oswald text-accent">
                      ЧИТАТЬ ДАЛЕЕ
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                variant="outline"
                className="font-oswald text-lg px-8"
                onClick={() => navigate("/news")}
              >
                <Icon name="Newspaper" className="mr-2" size={20} />
                ВСЕ НОВОСТИ
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="standings" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">ВОСТОЧНАЯ ЛИГА</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="p-4 text-left font-oswald">МЕСТО</th>
                        <th className="p-4 text-left font-oswald">КОМАНДА</th>
                        <th className="p-4 text-center font-oswald">И</th>
                        <th className="p-4 text-center font-oswald">В</th>
                        <th className="p-4 text-center font-oswald">П</th>
                        <th className="p-4 text-center font-oswald">ОЧКИ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team) => (
                        <tr 
                          key={team.place} 
                          className={`border-b hover:bg-muted/50 transition-colors ${team.place === 1 ? 'bg-accent/10' : ''}`}
                        >
                          <td className="p-4 font-bold">{team.place}</td>
                          <td className="p-4 font-oswald text-lg">{team.team}</td>
                          <td className="p-4 text-center">{team.games}</td>
                          <td className="p-4 text-center font-bold">{team.wins}</td>
                          <td className="p-4 text-center">{team.losses}</td>
                          <td className="p-4 text-center font-bold text-lg">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            {standings.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Trophy" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВИТСЯ ТУРНИРНАЯ ТАБЛИЦА</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="streams" className="min-h-[400px]">
            <div className="text-center py-16">
              <Icon name="Video" size={64} className="mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-oswald mb-4">ТРАНСЛЯЦИИ МАТЧЕЙ</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Смотрите прямые эфиры и повторы всех игр команды
              </p>
              <Button 
                size="lg" 
                className="font-oswald text-lg px-8"
                onClick={() => navigate("/streams")}
              >
                <Icon name="Play" className="mr-2" size={20} />
                СМОТРЕТЬ ТРАНСЛЯЦИИ
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">РУКОВОДСТВО КЛУБА</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {management.map((person, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-oswald text-2xl">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-oswald">{person.name}</CardTitle>
                        <p className="text-muted-foreground">{person.position}</p>
                        <p className="text-sm text-accent font-medium mt-1">Опыт: {person.experience}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            {management.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="UserCog" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВИТСЯ РУКОВОДСТВО</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-primary text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="font-oswald text-2xl mb-4">СИБИРСКИЕ СНАЙПЕРЫ</h3>
              <p className="text-white/80">Профессиональный хоккейный клуб</p>
            </div>
            <div className="text-center md:text-right">
              <h4 className="font-oswald text-lg mb-4">КОНТАКТЫ</h4>
              <div className="space-y-3 text-white/80">
                <a 
                  href="https://t.me/DriverEditor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-end gap-2 hover:text-white transition-colors"
                >
                  <span>Связь с владельцем</span>
                  <Icon name="Send" size={18} />
                </a>
                <a 
                  href="https://yandex.ru/maps/org/ledovy_dvorets_sporta_sibir/97679228834/?ll=82.943296%2C55.071828&z=13" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-end gap-2 hover:text-white transition-colors"
                >
                  <span>Арена: ЛДС СИБИРЬ (временно)</span>
                  <Icon name="MapPin" size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>© 2025 Сибирские Снайперы. Все права защищены.</p>
            <button 
              onClick={() => navigate("/admin")}
              className="mt-4 text-xs opacity-20 hover:opacity-100 transition-opacity"
            >
              Админ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;