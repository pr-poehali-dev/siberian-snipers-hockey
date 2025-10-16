import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const API_URL = "https://functions.poehali.dev/90140830-0c8d-4493-bfe2-be85f46b2961";

interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  goals: number;
  assists: number;
  games_played: number;
  image: string;
  is_captain: boolean;
  is_assistant: boolean;
  height?: string;
  weight?: string;
  birth_date?: string;
  nationality?: string;
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
  content?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [activeSection, setActiveSection] = React.useState("players");
  const [loading, setLoading] = React.useState(false);

  const [players, setPlayers] = React.useState<Player[]>([]);
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);

  const [editingPlayer, setEditingPlayer] = React.useState<Player | null>(null);
  const [editingMatch, setEditingMatch] = React.useState<Match | null>(null);
  const [editingNews, setEditingNews] = React.useState<NewsItem | null>(null);

  const [isPlayerDialogOpen, setIsPlayerDialogOpen] = React.useState(false);
  const [isMatchDialogOpen, setIsMatchDialogOpen] = React.useState(false);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
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

  const handleLogin = () => {
    if (password === "HK_SIBIRSKIE_SNAIPERS") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "authenticated");
      loadData();
    } else {
      alert("Неверный пароль!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    navigate("/");
  };

  const handleUpdatePlayer = async () => {
    if (!editingPlayer) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=players/${editingPlayer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlayer)
      });

      if (response.ok) {
        await loadData();
        setIsPlayerDialogOpen(false);
        setEditingPlayer(null);
      }
    } catch (error) {
      console.error("Failed to update player:", error);
      alert("Ошибка при обновлении игрока");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMatch = async () => {
    if (!editingMatch) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=matches/${editingMatch.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMatch)
      });

      if (response.ok) {
        await loadData();
        setIsMatchDialogOpen(false);
        setEditingMatch(null);
      }
    } catch (error) {
      console.error("Failed to update match:", error);
      alert("Ошибка при обновлении матча");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNews = async () => {
    if (!editingNews) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=news/${editingNews.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.dumps(editingNews)
      });

      if (response.ok) {
        await loadData();
        setIsNewsDialogOpen(false);
        setEditingNews(null);
      }
    } catch (error) {
      console.error("Failed to update news:", error);
      alert("Ошибка при обновлении новости");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative">
        <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
          <img 
            src="https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg" 
            alt="Логотип фон" 
            className="w-full h-full object-contain"
          />
        </div>

        <Card className="w-full max-w-md relative z-10">
          <CardHeader className="text-center">
            <img 
              src="https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png" 
              alt="Логотип" 
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <CardTitle className="text-3xl font-oswald">АДМИН-ПАНЕЛЬ</CardTitle>
            <p className="text-muted-foreground">Введите пароль для доступа</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Пароль</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Введите пароль"
              />
            </div>
            <Button onClick={handleLogin} className="w-full font-oswald text-lg">
              <Icon name="LogIn" className="mr-2" size={20} />
              ВОЙТИ
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full font-oswald">
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              НА ГЛАВНУЮ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-oswald font-bold">АДМИН-ПАНЕЛЬ</h1>
            <p className="text-muted-foreground">Управление контентом сайта</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/")} variant="outline">
              <Icon name="Home" className="mr-2" size={20} />
              На сайт
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              <Icon name="LogOut" className="mr-2" size={20} />
              Выход
            </Button>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => setActiveSection("players")}
            variant={activeSection === "players" ? "default" : "outline"}
            className="font-oswald"
          >
            <Icon name="Users" className="mr-2" size={20} />
            ИГРОКИ
          </Button>
          <Button
            onClick={() => setActiveSection("matches")}
            variant={activeSection === "matches" ? "default" : "outline"}
            className="font-oswald"
          >
            <Icon name="Calendar" className="mr-2" size={20} />
            МАТЧИ
          </Button>
          <Button
            onClick={() => setActiveSection("news")}
            variant={activeSection === "news" ? "default" : "outline"}
            className="font-oswald"
          >
            <Icon name="Newspaper" className="mr-2" size={20} />
            НОВОСТИ
          </Button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <Icon name="Loader" className="animate-spin mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        )}

        {!loading && activeSection === "players" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-oswald font-bold">Управление игроками</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map(player => (
                <Card key={player.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <img src={player.image} alt={player.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h3 className="font-oswald text-xl">{player.name}</h3>
                        <Badge variant="secondary">#{player.number}</Badge>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm mb-3">
                      <p><strong>Позиция:</strong> {player.position}</p>
                      <p><strong>Голы:</strong> {player.goals} | <strong>Передачи:</strong> {player.assists}</p>
                      <p><strong>Матчи:</strong> {player.games_played}</p>
                    </div>
                    <Button
                      onClick={() => {
                        setEditingPlayer(player);
                        setIsPlayerDialogOpen(true);
                      }}
                      className="w-full"
                      size="sm"
                    >
                      <Icon name="Edit" className="mr-2" size={16} />
                      Редактировать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && activeSection === "matches" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-oswald font-bold">Управление матчами</h2>
            <div className="space-y-3">
              {matches.map(match => (
                <Card key={match.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-oswald text-lg">{match.date} - {match.opponent}</h3>
                      <p className="text-sm text-muted-foreground">
                        {match.is_home ? "Домашний матч" : "Выездной матч"} | Счет: {match.score} | {match.status}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setEditingMatch(match);
                        setIsMatchDialogOpen(true);
                      }}
                      size="sm"
                    >
                      <Icon name="Edit" className="mr-2" size={16} />
                      Редактировать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && activeSection === "news" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-oswald font-bold">Управление новостями</h2>
            <div className="space-y-3">
              {news.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-24 h-24 rounded object-cover" />
                    <div className="flex-1">
                      <h3 className="font-oswald text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                      <p className="text-sm">{item.excerpt}</p>
                    </div>
                    <Button
                      onClick={() => {
                        setEditingNews(item);
                        setIsNewsDialogOpen(true);
                      }}
                      size="sm"
                    >
                      <Icon name="Edit" className="mr-2" size={16} />
                      Редактировать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Dialog open={isPlayerDialogOpen} onOpenChange={setIsPlayerDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-oswald text-2xl">Редактирование игрока</DialogTitle>
            </DialogHeader>
            {editingPlayer && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Имя</Label>
                    <Input
                      value={editingPlayer.name}
                      onChange={(e) => setEditingPlayer({...editingPlayer, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Номер</Label>
                    <Input
                      type="number"
                      value={editingPlayer.number}
                      onChange={(e) => setEditingPlayer({...editingPlayer, number: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div>
                  <Label>Позиция</Label>
                  <Input
                    value={editingPlayer.position}
                    onChange={(e) => setEditingPlayer({...editingPlayer, position: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Голы</Label>
                    <Input
                      type="number"
                      value={editingPlayer.goals}
                      onChange={(e) => setEditingPlayer({...editingPlayer, goals: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Передачи</Label>
                    <Input
                      type="number"
                      value={editingPlayer.assists}
                      onChange={(e) => setEditingPlayer({...editingPlayer, assists: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Матчи</Label>
                    <Input
                      type="number"
                      value={editingPlayer.games_played}
                      onChange={(e) => setEditingPlayer({...editingPlayer, games_played: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Рост</Label>
                    <Input
                      value={editingPlayer.height || ""}
                      onChange={(e) => setEditingPlayer({...editingPlayer, height: e.target.value})}
                      placeholder="180 см"
                    />
                  </div>
                  <div>
                    <Label>Вес</Label>
                    <Input
                      value={editingPlayer.weight || ""}
                      onChange={(e) => setEditingPlayer({...editingPlayer, weight: e.target.value})}
                      placeholder="75 кг"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Дата рождения</Label>
                    <Input
                      value={editingPlayer.birth_date || ""}
                      onChange={(e) => setEditingPlayer({...editingPlayer, birth_date: e.target.value})}
                      placeholder="01.01.2000"
                    />
                  </div>
                  <div>
                    <Label>Гражданство</Label>
                    <Input
                      value={editingPlayer.nationality || ""}
                      onChange={(e) => setEditingPlayer({...editingPlayer, nationality: e.target.value})}
                      placeholder="Россия"
                    />
                  </div>
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={editingPlayer.image}
                    onChange={(e) => setEditingPlayer({...editingPlayer, image: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingPlayer.is_captain}
                      onChange={(e) => setEditingPlayer({...editingPlayer, is_captain: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span>Капитан</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingPlayer.is_assistant}
                      onChange={(e) => setEditingPlayer({...editingPlayer, is_assistant: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span>Ассистент</span>
                  </label>
                </div>
                <Button onClick={handleUpdatePlayer} className="w-full" disabled={loading}>
                  <Icon name="Save" className="mr-2" size={20} />
                  Сохранить изменения
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isMatchDialogOpen} onOpenChange={setIsMatchDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-oswald text-2xl">Редактирование матча</DialogTitle>
            </DialogHeader>
            {editingMatch && (
              <div className="space-y-4">
                <div>
                  <Label>Дата</Label>
                  <Input
                    value={editingMatch.date}
                    onChange={(e) => setEditingMatch({...editingMatch, date: e.target.value})}
                    placeholder="16.10"
                  />
                </div>
                <div>
                  <Label>Соперник</Label>
                  <Input
                    value={editingMatch.opponent}
                    onChange={(e) => setEditingMatch({...editingMatch, opponent: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Счет</Label>
                  <Input
                    value={editingMatch.score}
                    onChange={(e) => setEditingMatch({...editingMatch, score: e.target.value})}
                    placeholder="5:3"
                  />
                </div>
                <div>
                  <Label>Статус</Label>
                  <Input
                    value={editingMatch.status}
                    onChange={(e) => setEditingMatch({...editingMatch, status: e.target.value})}
                    placeholder="Скоро / Завершен"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingMatch.is_home}
                    onChange={(e) => setEditingMatch({...editingMatch, is_home: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span>Домашний матч</span>
                </label>
                <Button onClick={handleUpdateMatch} className="w-full" disabled={loading}>
                  <Icon name="Save" className="mr-2" size={20} />
                  Сохранить изменения
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-oswald text-2xl">Редактирование новости</DialogTitle>
            </DialogHeader>
            {editingNews && (
              <div className="space-y-4">
                <div>
                  <Label>Заголовок</Label>
                  <Input
                    value={editingNews.title}
                    onChange={(e) => setEditingNews({...editingNews, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Дата</Label>
                  <Input
                    value={editingNews.date}
                    onChange={(e) => setEditingNews({...editingNews, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={editingNews.image}
                    onChange={(e) => setEditingNews({...editingNews, image: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Краткое описание</Label>
                  <Textarea
                    value={editingNews.excerpt}
                    onChange={(e) => setEditingNews({...editingNews, excerpt: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Полный текст (опционально)</Label>
                  <Textarea
                    value={editingNews.content || ""}
                    onChange={(e) => setEditingNews({...editingNews, content: e.target.value})}
                    rows={6}
                  />
                </div>
                <Button onClick={handleUpdateNews} className="w-full" disabled={loading}>
                  <Icon name="Save" className="mr-2" size={20} />
                  Сохранить изменения
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
