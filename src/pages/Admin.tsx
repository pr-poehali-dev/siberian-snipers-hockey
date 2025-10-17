import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import AdminLogin from "@/components/admin/AdminLogin";
import PlayersSection from "@/components/admin/PlayersSection";
import MatchesSection from "@/components/admin/MatchesSection";
import NewsSection from "@/components/admin/NewsSection";
import PlayerEditDialog from "@/components/admin/PlayerEditDialog";
import MatchEditDialog from "@/components/admin/MatchEditDialog";
import NewsEditDialog from "@/components/admin/NewsEditDialog";
import { Player, Match, NewsItem, API_URL } from "@/components/admin/types";

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
      </div>
    </div>
  );
};

export default Admin;