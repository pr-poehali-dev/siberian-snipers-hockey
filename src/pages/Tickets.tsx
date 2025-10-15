import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-white py-8">
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

      <div className="container mx-auto px-4 py-8">
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
                                      ${status === "available" ? "bg-muted hover:bg-muted/70 cursor-pointer" : ""}
                                      ${status === "occupied" ? "bg-destructive cursor-not-allowed opacity-60" : ""}
                                      ${status === "selected" ? "bg-accent text-white scale-110" : ""}
                                    `}
                                    title={`Ряд ${row}, Место ${seat}`}
                                  >
                                    {seat}
                                  </button>
                                );
                              })}
                            </div>
                            <span className="text-sm font-roboto w-8 text-muted-foreground">{row}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="text-center mt-6 text-muted-foreground font-oswald tracking-wider">
                      СЕКТОР Д3
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
                    {seats.filter(s => s.status === "available").map((seat) => {
                      const isSelected = selectedSeats.some(
                        s => s.row === seat.row && s.seat === seat.seat
                      );
                      
                      return (
                        <div
                          key={`${seat.row}-${seat.seat}`}
                          className={`
                            flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all
                            ${isSelected ? "bg-accent text-white border-accent" : "hover:bg-muted/50"}
                          `}
                          onClick={() => handleSeatClick(seat)}
                        >
                          <div className="font-roboto">
                            <span className="font-semibold">Ряд {seat.row}</span>
                            <span className="mx-2">•</span>
                            <span>Место {seat.seat}</span>
                            <span className="mx-2">•</span>
                            <span className="text-sm text-muted-foreground">Сектор {seat.sector}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-oswald text-lg">{seat.price} ₽</span>
                            {isSelected && <Icon name="Check" size={20} />}
                          </div>
                        </div>
                      );
                    })}
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
              <CardContent>
                {selectedSeats.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Ticket" size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-roboto">Выберите места на схеме</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {selectedSeats.map((seat) => (
                        <div
                          key={`${seat.row}-${seat.seat}`}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div className="font-roboto text-sm">
                            <div className="font-semibold">Ряд {seat.row}, Место {seat.seat}</div>
                            <div className="text-muted-foreground">Сектор {seat.sector}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-oswald">{seat.price} ₽</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSeatClick(seat)}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between font-roboto">
                        <span>Количество билетов:</span>
                        <span className="font-semibold">{selectedSeats.length}</span>
                      </div>
                      <div className="flex justify-between font-oswald text-xl">
                        <span>ИТОГО:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                    </div>

                    <Button className="w-full font-oswald text-lg" size="lg">
                      ОФОРМИТЬ ЗАКАЗ
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
