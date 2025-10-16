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
  customizable?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  customName?: string;
  customNumber?: string;
}

const Shop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = React.useState("");
  const [customName, setCustomName] = React.useState("");
  const [customNumber, setCustomNumber] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
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
      name: "Джерси (Белое)",
      price: 5500,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "jerseys",
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizable: true,
      description: "Белое игровое джерси. Кастомизация: ваша фамилия и номер."
    },
    {
      id: 2,
      name: "Джерси (Синее)",
      price: 5500,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "jerseys",
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizable: true,
      description: "Синее игровое джерси. Кастомизация: ваша фамилия и номер."
    },
    {
      id: 3,
      name: "Джерси (Чёрное)",
      price: 5500,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "jerseys",
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizable: true,
      description: "Чёрное игровое джерси. Кастомизация: ваша фамилия и номер."
    },
    {
      id: 4,
      name: "Джерси (Голубое)",
      price: 5500,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "jerseys",
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizable: true,
      description: "Голубое игровое джерси. Кастомизация: ваша фамилия и номер."
    },
    {
      id: 5,
      name: "Шарф болельщика (синий)",
      price: 1500,
      image: "https://cdn.poehali.dev/files/8dfe67f9-436f-4f07-97ef-eeaed8547e5f.jpg",
      category: "accessories",
      description: "Фанатский шарф в цветах команды Сибирские Снайперы."
    },
    {
      id: 6,
      name: "Вымпел команды (синий)",
      price: 1200,
      image: "https://cdn.poehali.dev/files/29db9d33-8826-4926-8137-b51a4332b977.jpg",
      category: "accessories",
      description: "Официальный вымпел с логотипом. Синий цвет с белой бахромой."
    },
    {
      id: 7,
      name: "Вымпел команды (голубой)",
      price: 1200,
      image: "https://cdn.poehali.dev/files/66332941-ba92-4144-8086-aff1bc66bb4b.jpg",
      category: "accessories",
      description: "Официальный вымпел с логотипом. Голубой цвет с белой бахромой."
    },
    {
      id: 8,
      name: "Значок команды",
      price: 400,
      image: "https://cdn.poehali.dev/files/d57890bf-5a57-4480-9c91-61a71afce555.jpg",
      category: "accessories",
      description: "Коллекционный значок с логотипом. Металл с эмалью."
    },
    {
      id: 9,
      name: "Худи с логотипом",
      price: 3200,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "apparel",
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Удобная толстовка с капюшоном и большим логотипом команды."
    },
    {
      id: 10,
      name: "Футболка фанатская",
      price: 1800,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "apparel",
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Повседневная футболка с принтом команды. 100% хлопок."
    },
    {
      id: 11,
      name: "Шайба с логотипом",
      price: 800,
      image: "https://cdn.poehali.dev/files/5eafa8e1-7cd4-4959-927d-702849e9a9e9.jpg",
      category: "accessories",
      description: "Официальная игровая шайба с логотипом. Идеальный сувенир."
    },
    {
      id: 12,
      name: "Кепка с логотипом",
      price: 1200,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "accessories",
      description: "Стильная бейсболка с вышитым логотипом. Регулируемый размер."
    },
    {
      id: 13,
      name: "Термокружка",
      price: 900,
      image: "https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png",
      category: "accessories",
      description: "Термокружка с логотипом. Сохраняет температуру до 6 часов."
    }
  ];

  const filteredProducts = categoryFilter === "all" 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes ? product.sizes[0] : "");
    setCustomName("");
    setCustomNumber("");
    setQuantity(1);
    setIsDialogOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    if (selectedProduct.customizable && (!customName || !customNumber)) {
      alert("Укажите фамилию и номер для джерси!");
      return;
    }

    const cartItem: CartItem = {
      ...selectedProduct,
      quantity,
      selectedSize,
      customName: selectedProduct.customizable ? customName : undefined,
      customNumber: selectedProduct.customizable ? customNumber : undefined
    };

    setCart([...cart, cartItem]);
    setIsDialogOpen(false);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
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
      const currentBalance = parseInt(localStorage.getItem("club_balance") || "0");
      const newBalance = currentBalance + cartTotal;
      localStorage.setItem("club_balance", newBalance.toString());

      const purchases = JSON.parse(localStorage.getItem("club_purchases") || "[]");
      const newPurchase = {
        id: Date.now().toString(),
        date: new Date().toLocaleString("ru-RU"),
        customer: `${formData.firstName} ${formData.lastName}`,
        total: cartTotal,
        items: cart.map(item => ({
          name: item.customName && item.customNumber 
            ? `${item.name} (${item.customName} #${item.customNumber})`
            : item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };
      localStorage.setItem("club_purchases", JSON.stringify([newPurchase, ...purchases]));

      setIsProcessing(false);
      setIsPurchased(true);
      
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
        setIsPurchased(false);
        setCart([]);
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
            <Button
              onClick={() => setIsCartOpen(true)}
              size="lg"
              className="relative bg-accent hover:bg-accent/90"
            >
              <Icon name="ShoppingCart" size={24} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white">
                  {cart.length}
                </Badge>
              )}
            </Button>
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
            <Icon name="Grid3x3" className="mr-2" size={20} />
            ВСЁ
          </Button>
          <Button
            variant={categoryFilter === "jerseys" ? "default" : "outline"}
            onClick={() => setCategoryFilter("jerseys")}
            className="font-oswald"
          >
            <Icon name="Shirt" className="mr-2" size={20} />
            ДЖЕРСИ
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
                {product.customizable && (
                  <Badge className="absolute top-4 right-4 bg-purple-600">
                    <Icon name="Pencil" size={14} className="mr-1" />
                    Кастомизация
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
                    В КОРЗИНУ
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-oswald">ДОБАВИТЬ В КОРЗИНУ</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-contain rounded"
                />
                <div className="flex-1">
                  <h3 className="font-oswald text-lg">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">{selectedProduct.price} ₽</p>
                </div>
              </div>

              {selectedProduct.sizes && (
                <div>
                  <Label>Размер</Label>
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
                </div>
              )}

              {selectedProduct.customizable && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-oswald text-lg flex items-center">
                    <Icon name="Pencil" className="mr-2" size={20} />
                    КАСТОМИЗАЦИЯ
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Фамилия *</Label>
                      <Input
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                        placeholder="IVANOV"
                        maxLength={15}
                      />
                    </div>
                    <div>
                      <Label>Номер *</Label>
                      <Input
                        type="number"
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value)}
                        placeholder="99"
                        min="0"
                        max="99"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label>Количество</Label>
                <div className="flex gap-2 mt-2">
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
                    className="text-center w-20"
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

              <Button
                className="w-full font-oswald text-lg py-6"
                onClick={handleAddToCart}
              >
                <Icon name="ShoppingCart" className="mr-2" size={20} />
                ДОБАВИТЬ В КОРЗИНУ
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-oswald">КОРЗИНА</DialogTitle>
          </DialogHeader>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg text-muted-foreground">Корзина пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 border rounded-lg">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                  <div className="flex-1">
                    <h3 className="font-oswald text-lg">{item.name}</h3>
                    {item.customName && item.customNumber && (
                      <p className="text-sm text-purple-600 font-bold">
                        {item.customName} #{item.customNumber}
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground">Размер: {item.selectedSize}</p>
                    )}
                    <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                    <p className="font-bold mt-2">{item.price * item.quantity} ₽</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-oswald">ИТОГО:</span>
                  <span className="text-3xl font-bold text-accent">{cartTotal} ₽</span>
                </div>
                <Button
                  className="w-full font-oswald text-lg py-6"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                >
                  <Icon name="CreditCard" className="mr-2" size={20} />
                  ОФОРМИТЬ ЗАКАЗ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-oswald">
              {isPurchased ? "ПОКУПКА ОФОРМЛЕНА!" : "ОФОРМЛЕНИЕ ЗАКАЗА"}
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
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-oswald mb-2">ВАШ ЗАКАЗ:</h4>
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm mb-1">
                    <span>
                      {item.name} {item.customName ? `(${item.customName} #${item.customNumber})` : ""} x{item.quantity}
                    </span>
                    <span>{item.price * item.quantity} ₽</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                  <span>ИТОГО:</span>
                  <span className="text-accent text-xl">{cartTotal} ₽</span>
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
                    ОПЛАТИТЬ {cartTotal} ₽
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
