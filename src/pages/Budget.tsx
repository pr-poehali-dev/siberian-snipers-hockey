import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/90140830-0c8d-4493-bfe2-be85f46b2961";

interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  category: string;
  transaction_date: string;
}

interface BudgetData {
  transactions: Transaction[];
  total_income: number;
  total_expense: number;
  balance: number;
}

const Budget = () => {
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = React.useState<BudgetData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  React.useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?path=budget`);
      const data = await response.json();
      setBudgetData(data);
    } catch (error) {
      console.error("Failed to load budget:", error);
    } finally {
      setLoading(false);
    }
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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'tickets': 'Ticket',
      'merchandise': 'ShoppingBag',
      'salary': 'Wallet',
      'equipment': 'Wrench',
      'other': 'DollarSign'
    };
    return icons[category] || 'DollarSign';
  };

  const categories = budgetData ? 
    ['all', ...Array.from(new Set(budgetData.transactions.map(t => t.category)))] : 
    ['all'];

  const filteredTransactions = budgetData?.transactions.filter(t => 
    categoryFilter === 'all' || t.category === categoryFilter
  ) || [];

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
            onClick={() => navigate("/admin")}
            className="text-white hover:bg-white/10 mb-4"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад в админку
          </Button>
          <div className="flex items-center gap-4">
            <Icon name="DollarSign" size={48} />
            <div>
              <h1 className="text-5xl font-oswald font-bold">БЮДЖЕТ КЛУБА</h1>
              <p className="text-xl font-roboto mt-2">Финансовый учет и статистика</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {loading ? (
          <div className="text-center py-12">
            <Icon name="Loader" className="animate-spin mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">Загрузка данных...</p>
          </div>
        ) : budgetData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
                <CardHeader>
                  <CardTitle className="font-oswald flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} />
                    Доход
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{formatAmount(budgetData.total_income)}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-700 text-white">
                <CardHeader>
                  <CardTitle className="font-oswald flex items-center gap-2">
                    <Icon name="TrendingDown" size={24} />
                    Расход
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{formatAmount(budgetData.total_expense)}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                <CardHeader>
                  <CardTitle className="font-oswald flex items-center gap-2">
                    <Icon name="Wallet" size={24} />
                    Баланс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{formatAmount(budgetData.balance)}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="font-oswald text-2xl">ИСТОРИЯ ТРАНЗАКЦИЙ</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                      <Button
                        key={cat}
                        variant={categoryFilter === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategoryFilter(cat)}
                        className="font-oswald"
                      >
                        {cat === 'all' ? 'Все' : cat}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="FileText" size={48} className="mx-auto mb-2 opacity-30" />
                      <p>Транзакций пока нет</p>
                    </div>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <Icon 
                              name={getCategoryIcon(transaction.category)} 
                              size={24}
                              className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                            />
                          </div>
                          <div>
                            <h3 className="font-oswald text-lg">{transaction.description}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{formatDate(transaction.transaction_date)}</span>
                              <Badge variant="outline">{transaction.category}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Не удалось загрузить данные</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
