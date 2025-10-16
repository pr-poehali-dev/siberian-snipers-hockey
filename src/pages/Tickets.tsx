import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Seat {
  row: number;
  seat: number;
  status: "available" | "occupied" | "selected";
  sector: string;
  price: number;
}

const Tickets = () => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = React.useState<Seat[]>([]);
  const [viewMode, setViewMode] = React.useState<"list" | "map">("map");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isPurchased, setIsPurchased] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    cardNumber: ""
  });

  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const occupiedSeats = [
      { row: 11, seats: [9, 10, 11, 12, 13, 14, 15, 16] },
      { row: 12, seats: [3] },
      { row: 13, seats: [1, 2, 8, 9, 10, 11] },
      { row: 14, seats: [2, 3, 4, 5, 9, 10, 11, 12] },
      { row: 15, seats: [8, 9] }
    ];

    for (let row = 11; row <= 20; row++) {
      for (let seat = 1; seat <= 16; seat++) {
        const isOccupied = occupiedSeats.some(
          r => r.row === row && r.seats.includes(seat)
        );
        
        seats.push({
          row,
          seat,
          status: isOccupied ? "occupied" : "available",
          sector: "Д3",
          price: row <= 14 ? 500 : 400
        });
      }
    }

    return seats;
  };

  const [seats] = React.useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied") return;

    const isSelected = selectedSeats.some(
      s => s.row === seat.row && s.seat === seat.seat
    );

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(
        s => !(s.row === seat.row && s.seat === seat.seat)
      ));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getSeatStatus = (row: number, seat: number): "available" | "occupied" | "selected" => {
    const isSelected = selectedSeats.some(s => s.row === row && s.seat === seat);
    if (isSelected) return "selected";
    
    const seatData = seats.find(s => s.row === row && s.seat === seat);
    return seatData?.status || "available";
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleFormChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      const numbers = value.replace(/\D/g, "").slice(0, 16);
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
        setSelectedSeats([]);
        setFormData({ firstName: "", lastName: "", cardNumber: "" });
      }, 2500);
    }, 2000);
  };

  const isFormValid = formData.firstName && formData.lastName && formData.cardNumber.length >= 13;

  return (
    <div className="min-h-screen bg-background relative">
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
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate("/")}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-5xl font-oswald font-bold">КУПИТЬ БИЛЕТЫ</h1>
          <p className="text-xl font-roboto mt-2">Матч: Сибирские Снайперы - Академия Михайлова</p>
          <p className="text-lg font-roboto mt-1">Дата: 16 октября 2025, 19:00</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex gap-4 mb-6">
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            className="font-oswald"
          >
            <Icon name="Map" size={18} className="mr-2" />
            СХЕМА АРЕНЫ
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className="font-oswald"
          >
            <Icon name="List" size={18} className="mr-2" />
            СПИСОК МЕСТ
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {viewMode === "map" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="font-oswald flex items-center justify-between flex-wrap gap-4">
                    <span>СЕКТОР Д3</span>
                    <div className="flex gap-4 text-sm font-roboto font-normal">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-muted rounded"></div>
                        <span>Свободно</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-destructive rounded"></div>
                        <span>Занято</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-accent rounded"></div>
                        <span>Выбрано</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-8 rounded-lg">
                    <div className="mb-6">
                      <img 
                        src="https://cdn.poehali.dev/files/f911c5ea-6da9-4a51-9628-84aaccad338c.jpg" 
                        alt="Схема арены"
                        className="w-full rounded-lg mb-4 opacity-40"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {[...Array(10)].map((_, rowIndex) => {
                        const row = 11 + rowIndex;
                        return (
                          <div key={row} className="flex items-center gap-2">
                            <span className="text-sm font-roboto w-8 text-muted-foreground">{row}</span>
                            <div className="flex gap-1 flex-1">
                              {[...Array(16)].map((_, seatIndex) => {
                                const seat = seatIndex + 1;
                                const status = getSeatStatus(row, seat);
                                const seatData = seats.find(s => s.row === row && s.seat === seat);
                                
                                return (
                                  <button
                                    key={seat}
                                    onClick={() => seatData && handleSeatClick(seatData)}
                                    disabled={status === "occupied"}
                                    className={`
                                      w-7 h-7 rounded text-xs font-roboto transition-all
                                      ${status === "available" ? "bg-muted hover:bg-muted/70" : ""}
                                      ${status === "occupied" ? "bg-destructive cursor-not-allowed opacity-50" : ""}
                                      ${status === "selected" ? "bg-accent text-white" : ""}
                                    `}
                                  >
                                    {seat}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="font-oswald">ДОСТУПНЫЕ МЕСТА</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {seats.filter(s => s.status === "available").map((seat) => (
                      <div
                        key={`${seat.row}-${seat.seat}`}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleSeatClick(seat)}
                      >
                        <div className="flex items-center gap-4">
                          <Icon name="Armchair" size={20} className="text-muted-foreground" />
                          <div>
                            <p className="font-oswald">Ряд {seat.row}, Место {seat.seat}</p>
                            <p className="text-sm text-muted-foreground">Сектор {seat.sector}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="font-roboto">{seat.price} ₽</Badge>
                          {selectedSeats.some(s => s.row === seat.row && s.seat === seat.seat) && (
                            <Icon name="Check" size={20} className="text-accent" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="font-oswald">ВАШИ БИЛЕТЫ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedSeats.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Ticket" size={48} className="mx-auto mb-2 opacity-30" />
                    <p>Выберите места</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedSeats.map((seat) => (
                        <div key={`${seat.row}-${seat.seat}`} className="flex items-center justify-between text-sm">
                          <span>Ряд {seat.row}, Место {seat.seat}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{seat.price} ₽</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSeatClick(seat)}
                              className="h-6 w-6 p-0"
                            >
                              <Icon name="X" size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-oswald text-lg">ИТОГО:</span>
                        <span className="font-bold text-2xl text-accent">{totalPrice} ₽</span>
                      </div>
                      <Button
                        className="w-full font-oswald"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        <Icon name="CreditCard" className="mr-2" size={18} />
                        ОФОРМИТЬ
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-oswald text-2xl">
              {isPurchased ? "ГОТОВО!" : "ОФОРМЛЕНИЕ БИЛЕТОВ"}
            </DialogTitle>
            {!isPurchased && (
              <DialogDescription>
                Заполните данные для покупки билетов
              </DialogDescription>
            )}
          </DialogHeader>

          {isPurchased ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Check" size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-oswald text-green-600">БИЛЕТЫ КУПЛЕНЫ!</h3>
              <p className="text-muted-foreground">Билеты отправлены на вашу электронную почту</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                <h4 className="font-oswald mb-2">ВАШИ МЕСТА:</h4>
                {selectedSeats.map((seat) => (
                  <div key={`${seat.row}-${seat.seat}`} className="flex justify-between text-sm">
                    <span>Ряд {seat.row}, Место {seat.seat}</span>
                    <span>{seat.price} ₽</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>ИТОГО:</span>
                  <span>{totalPrice} ₽</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Имя</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleFormChange("firstName", e.target.value)}
                    placeholder="Иван"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Фамилия</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleFormChange("lastName", e.target.value)}
                    placeholder="Иванов"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Номер карты</label>
                  <Input
                    value={formData.cardNumber}
                    onChange={(e) => handleFormChange("cardNumber", e.target.value)}
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
                    <Icon name="ShoppingCart" className="mr-2" size={20} />
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

export default Tickets;
