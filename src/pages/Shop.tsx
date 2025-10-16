import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  description: string;
}

const Shop = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isPurchased, setIsPurchased] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: ""
  });

  const products: Product[] = [
    {
      id: 1,
      name: "Шарф болельщика (синий)",
      price: 1500,
      image: "https://cdn.poehali.dev/files/8dfe67f9-436f-4f07-97ef-eeaed8547e5f.jpg",
      category: "accessories",
      description: "Фанатский шарф в цветах команды Сибирские Снайперы. Отличный аксессуар для холодных матчей."
    },
    {
      id: 2,
      name: "Вымпел команды (синий)",
      price: 1200,
      image: "https://cdn.poehali.dev/files/29db9d33-8826-4926-8137-b51a4332b977.jpg",
      category: "accessories",
      description: "Официальный вымпел с логотипом Сибирских Снайперов. Синий цвет с белой бахромой."
    },
    {
      id: 3,
      name: "Вымпел команды (голубой)",
      price: 1200,
      image: "https://cdn.poehali.dev/files/66332941-ba92-4144-8086-aff1bc66bb4b.jpg",
      category: "accessories",
      description: "Официальный вымпел с логотипом Сибирских Снайперов. Голубой цвет с белой бахромой."
    },
    {
      id: 4,
      name: "Значок команды",
      price: 400,
      image: "https://cdn.poehali.dev/files/d57890bf-5a57-4480-9c91-61a71afce555.jpg",
      category: "accessories",
      description: "Коллекционный значок с логотипом Сибирских Снайперов. Металл с эмалью."
    },
    {
      id: 5,
      name: "Игровое джерси с логотипом",
      price: 4500,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "apparel",
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Официальное игровое джерси команды Сибирские Снайперы. Высококачественный материал с технологией отвода влаги."
    },
    {
      id: 6,
      name: "Худи с логотипом",
      price: 3200,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "apparel",
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Удобная толстовка с капюшоном и большим логотипом команды."
    },
    {
      id: 7,
      name: "Футболка фанатская",
      price: 1800,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "apparel",
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Повседневная футболка с принтом команды. 100% хлопок."
    },
    {
      id: 8,
      name: "Шайба с логотипом команды",
      price: 800,
      image: "https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg",
      category: "accessories",
      description: "Официальная игровая шайба с логотипом Сибирских Снайперов. Идеальный сувенир для коллекционеров."
    },
    {
      id: 9,
      name: "Кепка с логотипом",
      price: 1200,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "accessories",
      description: "Стильная бейсболка с вышитым логотипом команды. Регулируемый размер."
    },
    {
      id: 10,
      name: "Термокружка",
      price: 900,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "accessories",
      description: "Термокружка с логотипом команды. Сохраняет температуру до 6 часов."
    }
  ];

  const filteredProducts = categoryFilter === "all" 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes ? product.sizes[0] : "");
    setQuantity(1);
    setIsDialogOpen(true);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      const numbers = value.replace(/\D/g, "").slice(0, 16);
      setFormData({ ...formData, [field]: numbers });
    } else if (field === "phone") {
      const numbers = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, [field]: numbers });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handlePurchase = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchased(true);
      
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsPurchased(false);
        setSelectedProduct(null);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          cardNumber: ""
        });
      }, 2500);
    }, 2000);
  };

  const isFormValid = 
    formData.firstName && 
    formData.lastName && 
    formData.email && 
    formData.phone.length >= 10 && 
    formData.address && 
    formData.cardNumber.length >= 13;

  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;

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
          <h1 className="text-5xl font-oswald font-bold">МАГАЗИН АТРИБУТИКИ</h1>
          <p className="text-xl font-roboto mt-2">Официальная продукция команды</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex gap-4 mb-8 flex-wrap">
          <Button
            variant={categoryFilter === "all" ? "default" : "outline"}
            onClick={() => setCategoryFilter("all")}
            className="font-oswald"
          >
            <Icon name="Grid3x3" className="mr-2" size={20} />
            ВСЁ
          </Button>
          <Button
            variant={categoryFilter === "apparel" ? "default" : "outline"}
            onClick={() => setCategoryFilter("apparel")}
            className="font-oswald"
          >
            <Icon name="Shirt" className="mr-2" size={20} />
            ОДЕЖДА
          </Button>
          <Button
            variant={categoryFilter === "accessories" ? "default" : "outline"}
            onClick={() => setCategoryFilter("accessories")}
            className="font-oswald"
          >
            <Icon name="ShoppingBag" className="mr-2" size={20} />
            АКСЕССУАРЫ
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-w-full max-h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
                {product.category === "apparel" && (
                  <Badge className="absolute top-4 right-4 bg-accent">
                    <Icon name="Shirt" size={14} className="mr-1" />
                    Одежда
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-oswald">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-accent">{product.price} ₽</span>
                  <Button size="sm" className="font-oswald">
                    <Icon name="ShoppingCart" size={16} className="mr-1" />
                    КУПИТЬ
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-oswald">
              {isPurchased ? "ПОКУПКА ОФОРМЛЕНА!" : "ОФОРМЛЕНИЕ ПОКУПКИ"}
            </DialogTitle>
          </DialogHeader>

          {isPurchased ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Check" size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-oswald text-green-600">СПАСИБО ЗА ПОКУПКУ!</h3>
              <p className="text-muted-foreground">Ваш заказ успешно оформлен. Мы отправим детали на указанный email.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedProduct && (
                <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-oswald text-lg">{selectedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                    {selectedProduct.sizes && (
                      <div className="flex gap-2 mt-2">
                        {selectedProduct.sizes.map(size => (
                          <Button
                            key={size}
                            size="sm"
                            variant={selectedSize === size ? "default" : "outline"}
                            onClick={() => setSelectedSize(size)}
                            className="w-12"
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">{selectedProduct.price} ₽</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Количество</Label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center"
                      min="1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="w-full">
                    <Label>Итого</Label>
                    <div className="text-3xl font-bold text-accent mt-1">{totalPrice} ₽</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-oswald text-lg">ДАННЫЕ ПОКУПАТЕЛЯ</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Имя *</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Иван"
                    />
                  </div>
                  <div>
                    <Label>Фамилия *</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Иванов"
                    />
                  </div>
                </div>

                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@mail.com"
                  />
                </div>

                <div>
                  <Label>Телефон *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="89001234567"
                  />
                </div>

                <div>
                  <Label>Адрес доставки *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="г. Москва, ул. Ленина, д. 1, кв. 1"
                  />
                </div>

                <div>
                  <Label>Номер карты *</Label>
                  <Input
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                  />
                </div>
              </div>

              <Button
                className="w-full font-oswald text-lg py-6"
                onClick={handlePurchase}
                disabled={!isFormValid || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    ОБРАБОТКА...
                  </>
                ) : (
                  <>
                    <Icon name="CreditCard" className="mr-2" size={20} />
                    ОПЛАТИТЬ {totalPrice} ₽
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;
