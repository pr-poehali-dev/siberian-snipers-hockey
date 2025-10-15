import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Sector {
  id: string;
  name: string;
  available: boolean;
  price: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const Tickets = () => {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = React.useState<Sector | null>(null);

  const sectors: Sector[] = [
    { id: "E7", name: "E7", available: false, price: 100, x: 15, y: 3, width: 18, height: 12, color: "#ff9999" },
    { id: "E8", name: "E8", available: true, price: 100, x: 35, y: 3, width: 18, height: 12, color: "#90EE90" },
    { id: "E9", name: "E9", available: false, price: 100, x: 55, y: 3, width: 18, height: 12, color: "#ff9999" },
    
    { id: "E1", name: "E1", available: false, price: 100, x: 3, y: 25, width: 12, height: 15, color: "#DDA0DD" },
    { id: "E2", name: "E2", available: true, price: 100, x: 17, y: 25, width: 12, height: 15, color: "#90EE90" },
    { id: "E3", name: "E3", available: true, price: 100, x: 31, y: 25, width: 14, height: 15, color: "#87CEEB" },
    { id: "E4", name: "E4", available: true, price: 100, x: 47, y: 25, width: 12, height: 15, color: "#90EE90" },
    { id: "E5", name: "E5", available: false, price: 100, x: 61, y: 25, width: 12, height: 15, color: "#DDA0DD" },
    
    { id: "P3", name: "P3", available: false, price: 100, x: 2, y: 42, width: 8, height: 10, color: "#FFB366" },
    { id: "P1", name: "P1", available: false, price: 100, x: 2, y: 54, width: 8, height: 10, color: "#FFB366" },
    
    { id: "A5", name: "A5", available: false, price: 100, x: 3, y: 70, width: 12, height: 15, color: "#DDA0DD" },
    { id: "A4", name: "A4", available: true, price: 100, x: 17, y: 70, width: 12, height: 15, color: "#90EE90" },
    { id: "A3", name: "A3", available: true, price: 100, x: 31, y: 70, width: 14, height: 15, color: "#4169E1" },
    { id: "A2", name: "A2", available: true, price: 100, x: 47, y: 70, width: 12, height: 15, color: "#90EE90" },
    { id: "A1", name: "A1", available: false, price: 100, x: 61, y: 70, width: 12, height: 15, color: "#DDA0DD" },
    
    { id: "A9", name: "A9", available: false, price: 100, x: 15, y: 87, width: 18, height: 12, color: "#ff9999" },
    { id: "A8", name: "A8", available: true, price: 100, x: 35, y: 87, width: 18, height: 12, color: "#90EE90" },
    { id: "A7", name: "A7", available: false, price: 100, x: 55, y: 87, width: 18, height: 12, color: "#ff9999" },
  ];

  const handleSectorClick = (sector: Sector) => {
    if (sector.available) {
      setSelectedSector(sector);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/10"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <h1 className="text-3xl font-oswald font-bold">КУПИТЬ БИЛЕТЫ</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-oswald mb-4">СХЕМА АРЕНЫ</h2>
            <div className="relative w-full bg-white rounded-lg p-4 shadow-lg">
              <img 
                src="https://cdn.poehali.dev/files/c352b63f-9fb0-4a9b-b94b-27ad9af4dcff.jpg" 
                alt="Схема арены" 
                className="w-full h-auto"
              />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 76 102">
                {sectors.map((sector) => (
                  <rect
                    key={sector.id}
                    x={sector.x}
                    y={sector.y}
                    width={sector.width}
                    height={sector.height}
                    fill={sector.available ? "rgba(144, 238, 144, 0.3)" : "rgba(255, 153, 153, 0.3)"}
                    stroke={selectedSector?.id === sector.id ? "#0a2647" : "transparent"}
                    strokeWidth="0.5"
                    className={sector.available ? "cursor-pointer hover:opacity-70 transition-opacity" : "cursor-not-allowed"}
                    onClick={() => handleSectorClick(sector)}
                  />
                ))}
              </svg>
            </div>

            <div className="mt-6 flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-300 rounded"></div>
                <span className="text-sm">Доступно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-300 rounded"></div>
                <span className="text-sm">Занято</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-oswald mb-4">ИНФОРМАЦИЯ О БИЛЕТЕ</h2>
            
            {selectedSector ? (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-oswald mb-2">Сектор {selectedSector.name}</h3>
                    <Badge variant="default" className="bg-green-600">Доступно</Badge>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg">Цена:</span>
                      <span className="text-2xl font-oswald line-through text-muted-foreground">{selectedSector.price} ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Со скидкой:</span>
                      <span className="text-3xl font-oswald font-bold text-green-600">0 ₽</span>
                    </div>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Icon name="Gift" size={24} className="text-accent mt-1" />
                      <div>
                        <h4 className="font-oswald text-lg mb-1">СКИДКА НА 1 СЕЗОН</h4>
                        <p className="text-sm text-muted-foreground">
                          На все билеты действует скидка 100% в первом сезоне!
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent/90 text-white font-oswald text-lg py-6">
                    ЗАБРОНИРОВАТЬ МЕСТО
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Icon name="MousePointerClick" size={64} className="mx-auto mb-4 text-muted-foreground opacity-30" />
                  <p className="text-lg text-muted-foreground font-oswald">
                    Выберите сектор на схеме арены
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="mt-6 p-6 bg-primary/5 rounded-lg">
              <h3 className="font-oswald text-lg mb-3 flex items-center gap-2">
                <Icon name="Info" size={20} />
                ИНФОРМАЦИЯ
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Билет действителен на все домашние матчи сезона</li>
                <li>• Место закрепляется за вами на весь сезон</li>
                <li>• Бесплатная отмена за 24 часа до матча</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
