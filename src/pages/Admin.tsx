import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AdminLogin from "@/components/admin/AdminLogin";
import PlayersSection from "@/components/admin/PlayersSection";
import MatchesSection from "@/components/admin/MatchesSection";
import NewsSection from "@/components/admin/NewsSection";
import PlayerEditDialog from "@/components/admin/PlayerEditDialog";
import MatchEditDialog from "@/components/admin/MatchEditDialog";
import NewsEditDialog from "@/components/admin/NewsEditDialog";
import StreamEditDialog from "@/components/admin/StreamEditDialog";
import { Player, Match, NewsItem, Stream, API_URL } from "@/components/admin/types";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [activeSection, setActiveSection] = React.useState("players");
  const [loading, setLoading] = React.useState(false);

  const [players, setPlayers] = React.useState<Player[]>([]);
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [streams, setStreams] = React.useState<Stream[]>([]);

  const [editingPlayer, setEditingPlayer] = React.useState<Player | null>(null);
  const [editingMatch, setEditingMatch] = React.useState<Match | null>(null);
  const [editingNews, setEditingNews] = React.useState<NewsItem | null>(null);
  const [editingStream, setEditingStream] = React.useState<Stream | null>(null);

  const [isPlayerDialogOpen, setIsPlayerDialogOpen] = React.useState(false);
  const [isMatchDialogOpen, setIsMatchDialogOpen] = React.useState(false);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = React.useState(false);
  const [isStreamDialogOpen, setIsStreamDialogOpen] = React.useState(false);

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
      const [playersRes, matchesRes, newsRes, streamsRes] = await Promise.all([
        fetch(`${API_URL}?path=players`),
        fetch(`${API_URL}?path=matches`),
        fetch(`${API_URL}?path=news`),
        fetch(`${API_URL}?path=streams`)
      ]);

      const playersData = await playersRes.json();
      const matchesData = await matchesRes.json();
      const newsData = await newsRes.json();
      const streamsData = await streamsRes.json();

      setPlayers(playersData.players || []);
      setMatches(matchesData.matches || []);
      setNews(newsData.news || []);
      setStreams(streamsData.streams || []);
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

  const handleAddPlayer = () => {
    const newPlayer: Player = {
      id: 0,
      name: "Новый игрок",
      number: 0,
      position: "Нападающий",
      goals: 0,
      assists: 0,
      games_played: 0,
      image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400",
      is_captain: false,
      is_assistant: false,
      height: "",
      weight: "",
      birth_date: "",
      nationality: "Россия"
    };
    setEditingPlayer(newPlayer);
    setIsPlayerDialogOpen(true);
  };

  const handleAddMatch = () => {
    const newMatch: Match = {
      id: 0,
      date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
      opponent: "",
      score: "",
      status: "Скоро",
      is_home: true
    };
    setEditingMatch(newMatch);
    setIsMatchDialogOpen(true);
  };

  const handleAddNews = () => {
    const newNews: NewsItem = {
      id: 0,
      title: "Новая новость",
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=800",
      excerpt: "",
      content: ""
    };
    setEditingNews(newNews);
    setIsNewsDialogOpen(true);
  };

  const handleSavePlayer = async () => {
    if (!editingPlayer) return;
    
    setLoading(true);
    try {
      const isNewPlayer = editingPlayer.id === 0;
      const url = isNewPlayer 
        ? `${API_URL}?path=players`
        : `${API_URL}?path=players/${editingPlayer.id}`;
      
      const response = await fetch(url, {
        method: isNewPlayer ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlayer)
      });

      if (response.ok) {
        await loadData();
        setIsPlayerDialogOpen(false);
        setEditingPlayer(null);
      } else {
        alert("Ошибка при сохранении игрока");
      }
    } catch (error) {
      console.error("Failed to save player:", error);
      alert("Ошибка при сохранении игрока");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMatch = async () => {
    if (!editingMatch) return;
    
    setLoading(true);
    try {
      const isNewMatch = editingMatch.id === 0;
      const url = isNewMatch 
        ? `${API_URL}?path=matches`
        : `${API_URL}?path=matches/${editingMatch.id}`;
      
      const response = await fetch(url, {
        method: isNewMatch ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMatch)
      });

      if (response.ok) {
        await loadData();
        setIsMatchDialogOpen(false);
        setEditingMatch(null);
      } else {
        alert("Ошибка при сохранении матча");
      }
    } catch (error) {
      console.error("Failed to save match:", error);
      alert("Ошибка при сохранении матча");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNews = async () => {
    if (!editingNews) return;
    
    setLoading(true);
    try {
      const isNewNews = editingNews.id === 0;
      const url = isNewNews 
        ? `${API_URL}?path=news`
        : `${API_URL}?path=news/${editingNews.id}`;
      
      const response = await fetch(url, {
        method: isNewNews ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingNews)
      });

      if (response.ok) {
        await loadData();
        setIsNewsDialogOpen(false);
        setEditingNews(null);
      } else {
        alert("Ошибка при сохранении новости");
      }
    } catch (error) {
      console.error("Failed to save news:", error);
      alert("Ошибка при сохранении новости");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlayer = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого игрока?")) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=players/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        await loadData();
      } else {
        alert("Ошибка при удалении игрока");
      }
    } catch (error) {
      console.error("Failed to delete player:", error);
      alert("Ошибка при удалении игрока");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMatch = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот матч?")) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=matches/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        await loadData();
      } else {
        alert("Ошибка при удалении матча");
      }
    } catch (error) {
      console.error("Failed to delete match:", error);
      alert("Ошибка при удалении матча");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту новость?")) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=news/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        await loadData();
      } else {
        alert("Ошибка при удалении новости");
      }
    } catch (error) {
      console.error("Failed to delete news:", error);
      alert("Ошибка при удалении новости");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setIsPlayerDialogOpen(true);
  };

  const handleEditMatch = (match: Match) => {
    setEditingMatch(match);
    setIsMatchDialogOpen(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setIsNewsDialogOpen(true);
  };

  const handleAddStream = () => {
    const newStream: Stream = {
      id: 0,
      title: "Новая трансляция",
      stream_url: "",
      status: "scheduled",
      scheduled_time: new Date().toISOString(),
      thumbnail: ""
    };
    setEditingStream(newStream);
    setIsStreamDialogOpen(true);
  };

  const handleEditStream = (stream: Stream) => {
    setEditingStream(stream);
    setIsStreamDialogOpen(true);
  };

  const handleSaveStream = async () => {
    if (!editingStream) return;

    setLoading(true);
    try {
      const isNewStream = editingStream.id === 0;
      const path = isNewStream ? "streams" : `streams/${editingStream.id}`;

      const response = await fetch(`${API_URL}?path=${path}`, {
        method: isNewStream ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStream)
      });

      if (response.ok) {
        await loadData();
        setIsStreamDialogOpen(false);
        setEditingStream(null);
      } else {
        alert("Ошибка при сохранении трансляции");
      }
    } catch (error) {
      console.error("Failed to save stream:", error);
      alert("Ошибка при сохранении трансляции");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStream = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту трансляцию?")) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=streams/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        await loadData();
      } else {
        alert("Ошибка при удалении трансляции");
      }
    } catch (error) {
      console.error("Failed to delete stream:", error);
      alert("Ошибка при удалении трансляции");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
      />
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
            <Button onClick={() => navigate("/budget")} variant="outline">
              <Icon name="DollarSign" className="mr-2" size={20} />
              Бюджет
            </Button>
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
          <Button
            onClick={() => setActiveSection("streams")}
            variant={activeSection === "streams" ? "default" : "outline"}
            className="font-oswald"
          >
            <Icon name="Video" className="mr-2" size={20} />
            ТРАНСЛЯЦИИ
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-oswald font-bold">Управление игроками</h2>
              <Button onClick={handleAddPlayer}>
                <Icon name="Plus" className="mr-2" size={20} />
                Добавить игрока
              </Button>
            </div>
            <PlayersSection
              players={players}
              onEditPlayer={handleEditPlayer}
              onDeletePlayer={handleDeletePlayer}
            />
          </div>
        )}

        {!loading && activeSection === "matches" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-oswald font-bold">Управление матчами</h2>
              <Button onClick={handleAddMatch}>
                <Icon name="Plus" className="mr-2" size={20} />
                Добавить матч
              </Button>
            </div>
            <MatchesSection
              matches={matches}
              onEditMatch={handleEditMatch}
              onDeleteMatch={handleDeleteMatch}
            />
          </div>
        )}

        {!loading && activeSection === "news" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-oswald font-bold">Управление новостями</h2>
              <Button onClick={handleAddNews}>
                <Icon name="Plus" className="mr-2" size={20} />
                Добавить новость
              </Button>
            </div>
            <NewsSection
              news={news}
              onEditNews={handleEditNews}
              onDeleteNews={handleDeleteNews}
            />
          </div>
        )}

        {!loading && activeSection === "streams" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-oswald font-bold">Управление трансляциями</h2>
              <Button onClick={handleAddStream}>
                <Icon name="Plus" className="mr-2" size={20} />
                Добавить трансляцию
              </Button>
            </div>
            <div className="grid gap-4">
              {streams.map((stream) => (
                <Card key={stream.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-oswald mb-2">{stream.title}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Статус: {stream.status === 'live' ? '🔴 В эфире' : stream.status === 'scheduled' ? '📅 Запланирована' : '✅ Завершена'}</p>
                          <p>Время: {new Date(stream.scheduled_time).toLocaleString('ru-RU')}</p>
                          <p className="truncate max-w-md">Ссылка: {stream.stream_url}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStream(stream)}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteStream(stream.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {streams.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Icon name="Video" size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">Трансляций пока нет</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        <PlayerEditDialog
          isOpen={isPlayerDialogOpen}
          onClose={() => setIsPlayerDialogOpen(false)}
          player={editingPlayer}
          onPlayerChange={setEditingPlayer}
          onSave={handleSavePlayer}
          loading={loading}
        />

        <MatchEditDialog
          isOpen={isMatchDialogOpen}
          onClose={() => setIsMatchDialogOpen(false)}
          match={editingMatch}
          onMatchChange={setEditingMatch}
          onSave={handleSaveMatch}
          loading={loading}
        />

        <NewsEditDialog
          isOpen={isNewsDialogOpen}
          onClose={() => setIsNewsDialogOpen(false)}
          news={editingNews}
          onNewsChange={setEditingNews}
          onSave={handleSaveNews}
          loading={loading}
        />

        <StreamEditDialog
          isOpen={isStreamDialogOpen}
          onClose={() => setIsStreamDialogOpen(false)}
          stream={editingStream}
          onStreamChange={setEditingStream}
          onSave={handleSaveStream}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Admin;