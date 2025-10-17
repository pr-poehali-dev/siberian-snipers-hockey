import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { products } from "@/components/shop/products";
import { CartItem, FormData } from "@/components/shop/types";
import ProductCard from "@/components/shop/ProductCard";
import ProductDialog from "@/components/shop/ProductDialog";
import CartDialog from "@/components/shop/CartDialog";
import CheckoutDialog from "@/components/shop/CheckoutDialog";

const API_URL = "https://functions.poehali.dev/90140830-0c8d-4493-bfe2-be85f46b2961";

const Shop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<typeof products[0] | null>(null);
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
  const [formData, setFormData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: ""
  });

  const filteredProducts = categoryFilter === "all" 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleProductClick = (product: typeof products[0]) => {
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

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      for (const item of cart) {
        const itemName = item.customName && item.customNumber 
          ? `${item.name} (${item.customName} #${item.customNumber})`
          : item.name;
        
        await fetch(`${API_URL}?path=shop-purchase`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            item_name: itemName,
            amount: item.price * item.quantity
          })
        });
      }

      const response = { ok: true };

      if (response.ok) {
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
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      setIsProcessing(false);
      alert("Ошибка при покупке");
    }
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

      <div className="fixed top-4 left-4 z-50">
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
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={handleProductClick}
            />
          ))}
        </div>
      </div>

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={selectedProduct}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        customName={customName}
        setCustomName={setCustomName}
        customNumber={customNumber}
        setCustomNumber={setCustomNumber}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCart}
      />

      <CartDialog
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        total={cartTotal}
      />

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
        formData={formData}
        onFormChange={handleInputChange}
        onPurchase={handlePurchase}
        isProcessing={isProcessing}
        isPurchased={isPurchased}
        isFormValid={isFormValid}
      />
    </div>
  );
};

export default Shop;