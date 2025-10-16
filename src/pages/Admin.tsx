import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

interface Purchase {
  id: string;
  date: string;
  items: Array<{name: string; price: number; quantity: number}>;
  total: number;
  customer: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [activeSection, setActiveSection] = React.useState("dashboard");
  
  const [newNews, setNewNews] = React.useState({
    title: "",
    image: "",
    excerpt: "",
    content: ""
  });

  React.useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === "HK_SIBIRSKIE_SNAIPERS") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "authenticated");
    } else {
      alert("Неверный пароль!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    navigate("/");
  };

  const getClubBalance = () => {
    const balance = localStorage.getItem("club_balance");
    return balance ? parseInt(balance) : 0;
  };

  const getNewsList = (): NewsItem[] => {
    const news = localStorage.getItem("club_news");
    return news ? JSON.parse(news) : [];
  };

  const getPurchases = (): Purchase[] => {
    const purchases = localStorage.getItem("club_purchases");
    return purchases ? JSON.parse(purchases) : [];
  };

  const handleAddNews = () => {
    if (!newNews.title || !newNews.excerpt) {
      alert("Заполните название и краткое описание!");
      return;
    }

    const currentNews = getNewsList();
    const newsItem: NewsItem = {
      id: Date.now(),
      title: newNews.title,
      date: new Date().toLocaleDateString("ru-RU"),
      image: newNews.image || "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg",
      excerpt: newNews.excerpt,
      content: newNews.content
    };

    localStorage.setItem("club_news", JSON.stringify([newsItem, ...currentNews]));
    setNewNews({ title: "", image: "", excerpt: "", content: "" });
    alert("Новость добавлена!");
  };

  const handleDeleteNews = (id: number) => {
    const currentNews = getNewsList();
    const filtered = currentNews.filter(n => n.id !== id);
    localStorage.setItem("club_news", JSON.stringify(filtered));
    alert("Новость удалена!");
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

  const balance = getClubBalance();
  const newsList = getNewsList();
  const purchases = getPurchases();

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-oswald font-bold">ПАНЕЛЬ УПРАВЛЕНИЯ</h1>
              <p className="text-xl font-roboto mt-2">Сибирские Снайперы</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-white/10">
              <Icon name="LogOut" className="mr-2" size={20} />
              ВЫЙТИ
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button
            variant={activeSection === "dashboard" ? "default" : "outline"}
            onClick={() => setActiveSection("dashboard")}
            className="font-oswald h-auto py-4"
          >
            <Icon name="LayoutDashboard" className="mr-2" size={20} />
            ДАШБОРД
          </Button>
          <Button
            variant={activeSection === "news" ? "default" : "outline"}
            onClick={() => setActiveSection("news")}
            className="font-oswald h-auto py-4"
          >
            <Icon name="Newspaper" className="mr-2" size={20} />
            НОВОСТИ
          </Button>
          <Button
            variant={activeSection === "purchases" ? "default" : "outline"}
            onClick={() => setActiveSection("purchases")}
            className="font-oswald h-auto py-4"
          >
            <Icon name="ShoppingCart" className="mr-2" size={20} />
            ПОКУПКИ
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="font-oswald h-auto py-4"
          >
            <Icon name="Home" className="mr-2" size={20} />
            НА САЙТ
          </Button>
        </div>

        {activeSection === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-oswald flex items-center">
                    <Icon name="Wallet" className="mr-2" size={24} />
                    БАЛАНС КЛУБА
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold font-oswald">{balance.toLocaleString()} ₽</p>
                  <p className="text-sm mt-2 opacity-90">Общий доход от продаж</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-oswald flex items-center">
                    <Icon name="ShoppingBag" className="mr-2" size={24} />
                    ПРОДАЖИ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold font-oswald">{purchases.length}</p>
                  <p className="text-sm mt-2 opacity-90">Всего покупок</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-oswald flex items-center">
                    <Icon name="Newspaper" className="mr-2" size={24} />
                    НОВОСТИ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold font-oswald">{newsList.length}</p>
                  <p className="text-sm mt-2 opacity-90">Опубликовано</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-oswald text-2xl">ПОСЛЕДНИЕ ПОКУПКИ</CardTitle>
              </CardHeader>
              <CardContent>
                {purchases.slice(0, 5).map((purchase) => (
                  <div key={purchase.id} className="border-b last:border-0 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-oswald text-lg">{purchase.customer}</p>
                        <p className="text-sm text-muted-foreground">{purchase.date}</p>
                        <div className="mt-2 space-y-1">
                          {purchase.items.map((item, idx) => (
                            <p key={idx} className="text-sm">
                              {item.name} x{item.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                      <Badge className="text-lg px-4 py-1 bg-green-600">
                        +{purchase.total.toLocaleString()} ₽
                      </Badge>
                    </div>
                  </div>
                ))}
                {purchases.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Покупок пока нет</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "news" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-oswald text-2xl">ДОБАВИТЬ НОВОСТЬ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Заголовок *</Label>
                  <Input
                    value={newNews.title}
                    onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                    placeholder="Введите заголовок новости"
                  />
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input
                    value={newNews.image}
                    onChange={(e) => setNewNews({...newNews, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Краткое описание *</Label>
                  <Textarea
                    value={newNews.excerpt}
                    onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})}
                    placeholder="Краткое описание для карточки"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Полный текст</Label>
                  <Textarea
                    value={newNews.content}
                    onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                    placeholder="Полный текст новости"
                    rows={6}
                  />
                </div>
                <Button onClick={handleAddNews} className="w-full font-oswald text-lg">
                  <Icon name="Plus" className="mr-2" size={20} />
                  ОПУБЛИКОВАТЬ НОВОСТЬ
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-oswald text-2xl">ОПУБЛИКОВАННЫЕ НОВОСТИ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsList.map((news) => (
                  <div key={news.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-oswald text-xl">{news.title}</h3>
                      <p className="text-sm text-muted-foreground">{news.date}</p>
                      <p className="text-sm mt-2">{news.excerpt}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteNews(news.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
                {newsList.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Новостей пока нет</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "purchases" && (
          <Card>
            <CardHeader>
              <CardTitle className="font-oswald text-2xl">ВСЕ ПОКУПКИ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-oswald text-xl">{purchase.customer}</p>
                        <p className="text-sm text-muted-foreground">{purchase.date}</p>
                      </div>
                      <Badge className="text-xl px-4 py-2 bg-green-600">
                        {purchase.total.toLocaleString()} ₽
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      {purchase.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm border-t pt-2">
                          <span>{item.name}</span>
                          <span className="text-muted-foreground">
                            {item.quantity} x {item.price} ₽ = {item.quantity * item.price} ₽
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {purchases.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Покупок пока нет</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
