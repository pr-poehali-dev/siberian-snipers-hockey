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
        body: JSON.stringify(editingNews)
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
          <PlayersSection
            players={players}
            onEditPlayer={handleEditPlayer}
          />
        )}

        {!loading && activeSection === "matches" && (
          <MatchesSection
            matches={matches}
            onEditMatch={handleEditMatch}
          />
        )}

        {!loading && activeSection === "news" && (
          <NewsSection
            news={news}
            onEditNews={handleEditNews}
          />
        )}

        <PlayerEditDialog
          isOpen={isPlayerDialogOpen}
          onClose={() => setIsPlayerDialogOpen(false)}
          player={editingPlayer}
          onPlayerChange={setEditingPlayer}
          onSave={handleUpdatePlayer}
          loading={loading}
        />

        <MatchEditDialog
          isOpen={isMatchDialogOpen}
          onClose={() => setIsMatchDialogOpen(false)}
          match={editingMatch}
          onMatchChange={setEditingMatch}
          onSave={handleUpdateMatch}
          loading={loading}
        />

        <NewsEditDialog
          isOpen={isNewsDialogOpen}
          onClose={() => setIsNewsDialogOpen(false)}
          news={editingNews}
          onNewsChange={setEditingNews}
          onSave={handleUpdateNews}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Admin;
