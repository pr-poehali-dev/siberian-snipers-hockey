import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/90140830-0c8d-4493-bfe2-be85f46b2961";

interface Match {
  id: number;
  opponent: string;
  date: string;
  time: string;
  location: string;
}

interface Seat {
  row: number;
  seat: number;
  status: "available" | "occupied" | "selected";
  price: number;
}

const Tickets = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = React.useState<Match | null>(null);
  const [selectedSeats, setSelectedSeats] = React.useState<Seat[]>([]);
  const [bookedSeats, setBookedSeats] = React.useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isPurchased, setIsPurchased] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    phone: ""
  });

  React.useEffect(() => {
    loadMatches();
  }, []);

  React.useEffect(() => {
    if (selectedMatch) {
      loadBookedSeats(selectedMatch.id);
    }
  }, [selectedMatch]);

  const loadMatches = async () => {
    try {
      const response = await fetch(`${API_URL}?path=matches`);
      const data = await response.json();
      const upcomingMatches = data.matches.filter((m: any) => m.status === 'upcoming');
      setMatches(upcomingMatches || []);
      if (upcomingMatches.length > 0) {
        setSelectedMatch(upcomingMatches[0]);
      }
    } catch (error) {
      console.error("Failed to load matches:", error);
    }
  };

  const loadBookedSeats = async (matchId: number) => {
    try {
      const response = await fetch(`${API_URL}?path=tickets&match_id=${matchId}`);
      const data = await response.json();
      setBookedSeats(data.booked_seats || []);
      setSelectedSeats([]);
    } catch (error) {
      console.error("Failed to load booked seats:", error);
    }
  };

  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    for (let row = 1; row <= 10; row++) {
      for (let seat = 1; seat <= 20; seat++) {
        const seatNumber = `${row}-${seat}`;
        const isBooked = bookedSeats.includes(seatNumber);
        
        seats.push({
          row,
          seat,
          status: isBooked ? "occupied" : "available",
          price: row <= 3 ? 1000 : row <= 6 ? 750 : 500
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied") return;

    const seatNumber = `${seat.row}-${seat.seat}`;
    const isSelected = selectedSeats.some(s => `${s.row}-${s.seat}` === seatNumber);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => `${s.row}-${s.seat}` !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getSeatStatus = (row: number, seat: number): "available" | "occupied" | "selected" => {
    const seatNumber = `${row}-${seat}`;
    const isSelected = selectedSeats.some(s => `${s.row}-${s.seat}` === seatNumber);
    if (isSelected) return "selected";
    
    const seatData = seats.find(s => s.row === row && s.seat === seat);
    return seatData?.status || "available";
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handlePurchase = async () => {
    if (!formData.name || !formData.phone || selectedSeats.length === 0 || !selectedMatch) return;

    setIsProcessing(true);
    try {
      for (const seat of selectedSeats) {
        const seatNumber = `${seat.row}-${seat.seat}`;
        await fetch(`${API_URL}?path=tickets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            match_id: selectedMatch.id,
            seat_number: seatNumber,
            buyer_name: formData.name,
            buyer_phone: formData.phone,
            price: seat.price
          })
        });
      }

      setIsPurchased(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsPurchased(false);
        setSelectedSeats([]);
        setFormData({ name: "", phone: "" });
        loadBookedSeats(selectedMatch.id);
      }, 2000);
    } catch (error) {
      alert('Ошибка при покупке билета. Возможно место уже занято.');
      console.error("Purchase failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

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
          <div className="flex items-center gap-4">
            <Icon name="Ticket" size={48} />
            <div>
              <h1 className="text-5xl font-oswald font-bold">КУПИТЬ БИЛЕТЫ</h1>
              <p className="text-xl font-roboto mt-2">Выберите матч и места</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Матчей пока нет</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-oswald mb-4">Выберите матч:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map(match => (
                  <Card 
                    key={match.id}
                    className={`cursor-pointer transition-all ${selectedMatch?.id === match.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Calendar" size={16} />
                        <span className="font-roboto">{match.date} в {match.time}</span>
                      </div>
                      <h3 className="text-xl font-oswald mb-2">{match.opponent}</h3>
                      <p className="text-sm text-muted-foreground">{match.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedMatch && (
              <>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="font-oswald flex items-center gap-2">
                      <Icon name="Armchair" size={24} />
                      СХЕМА ЗАЛА
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="bg-primary/10 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-center gap-2 text-primary font-oswald text-xl">
                          <Icon name="Minus" size={32} />
                          ЛЕД
                          <Icon name="Minus" size={32} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 max-w-4xl mx-auto">
                      {Array.from({ length: 10 }, (_, rowIndex) => {
                        const row = rowIndex + 1;
                        return (
                          <div key={row} className="flex items-center gap-2">
                            <Badge variant="outline" className="w-12 justify-center font-oswald">
                              {row}
                            </Badge>
                            <div className="flex gap-1 flex-1 justify-center">
                              {Array.from({ length: 20 }, (_, seatIndex) => {
                                const seat = seatIndex + 1;
                                const status = getSeatStatus(row, seat);
                                return (
                                  <button
                                    key={seat}
                                    onClick={() => handleSeatClick(seats.find(s => s.row === row && s.seat === seat)!)}
                                    disabled={status === "occupied"}
                                    className={`w-8 h-8 rounded transition-all ${
                                      status === "available"
                                        ? "bg-green-500 hover:bg-green-600"
                                        : status === "selected"
                                        ? "bg-blue-600 ring-2 ring-blue-400"
                                        : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                    title={`Ряд ${row}, Место ${seat}`}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-center gap-6 mt-8">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 rounded" />
                        <span className="font-roboto text-sm">Свободно</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded" />
                        <span className="font-roboto text-sm">Выбрано</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-400 rounded" />
                        <span className="font-roboto text-sm">Занято</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {selectedSeats.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-oswald">ВАШИ МЕСТА</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedSeats.map((seat, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <span className="font-roboto">Ряд {seat.row}, Место {seat.seat}</span>
                            <span className="font-bold">{seat.price} ₽</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-4 border-t-2">
                          <span className="font-oswald text-xl">ИТОГО:</span>
                          <span className="font-oswald text-2xl text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button 
                          className="w-full font-oswald text-lg" 
                          size="lg"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          КУПИТЬ БИЛЕТЫ
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-oswald text-2xl">Оформление билетов</DialogTitle>
            <DialogDescription>
              Введите ваши контактные данные
            </DialogDescription>
          </DialogHeader>
          
          {isPurchased ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Check" size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-oswald mb-2">Билеты куплены!</h3>
              <p className="text-muted-foreground">Спасибо за покупку</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-roboto mb-2 block">Имя и Фамилия</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="text-sm font-roboto mb-2 block">Телефон</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <Button 
                className="w-full font-oswald text-lg" 
                size="lg"
                onClick={handlePurchase}
                disabled={isProcessing || !formData.name || !formData.phone}
              >
                {isProcessing ? "Обработка..." : `Оплатить ${totalPrice} ₽`}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tickets;
