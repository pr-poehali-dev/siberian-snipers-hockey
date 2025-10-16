import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  goals: number;
  assists: number;
  image: string;
  isCaptain?: boolean;
  isAssistant?: boolean;
  height: string;
  weight: string;
  birthDate: string;
  nationality: string;
  gamesPlayed: number;
  penaltyMinutes: number;
  plusMinus: number;
  shots: number;
  shotPercentage: number;
  avgTimeOnIce: string;
}

const PlayerStats = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const players: Player[] = [
    { 
      id: 1, 
      name: "KRASOTKIN", 
      number: 33, 
      position: "Универсальный", 
      goals: 12, 
      assists: 18, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/01cb72fd-059f-42fa-a829-f343c951ff95.jpg", 
      isCaptain: true,
      height: "183 см",
      weight: "85 кг",
      birthDate: "15.03.2000",
      nationality: "Россия",
      gamesPlayed: 24,
      penaltyMinutes: 12,
      plusMinus: 8,
      shots: 145,
      shotPercentage: 8.3,
      avgTimeOnIce: "18:45"
    },
    { 
      id: 2, 
      name: "Lyzenkov", 
      number: 86, 
      position: "Универсальный", 
      goals: 8, 
      assists: 15, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d0dc5e7d-fcae-4293-a50d-60cd61778d9a.jpg",
      isAssistant: true,
      height: "178 см",
      weight: "80 кг",
      birthDate: "22.07.2001",
      nationality: "Россия",
      gamesPlayed: 24,
      penaltyMinutes: 8,
      plusMinus: 5,
      shots: 98,
      shotPercentage: 8.2,
      avgTimeOnIce: "16:30"
    },
    { 
      id: 3, 
      name: "Zetka", 
      number: 8, 
      position: "Универсальный", 
      goals: 15, 
      assists: 12, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/54b0bb6d-95e0-40b1-9b51-b4510ea9889d.jpg",
      isAssistant: true,
      height: "180 см",
      weight: "82 кг",
      birthDate: "10.11.1999",
      nationality: "Россия",
      gamesPlayed: 24,
      penaltyMinutes: 16,
      plusMinus: 10,
      shots: 156,
      shotPercentage: 9.6,
      avgTimeOnIce: "19:20"
    },
    { 
      id: 4, 
      name: "Swafare", 
      number: 91, 
      position: "Универсальный", 
      goals: 10, 
      assists: 14, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/5285a795-21e8-4500-b4ea-3ca0d2e51f68.jpg",
      height: "185 см",
      weight: "88 кг",
      birthDate: "05.04.2002",
      nationality: "Россия",
      gamesPlayed: 22,
      penaltyMinutes: 10,
      plusMinus: 6,
      shots: 112,
      shotPercentage: 8.9,
      avgTimeOnIce: "17:15"
    },
    { 
      id: 5, 
      name: "Mylnikov Nonprime", 
      number: 20, 
      position: "Вратарь", 
      goals: 0, 
      assists: 2, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/59f77c68-28c5-4974-a009-6a37500196d4.jpg",
      height: "188 см",
      weight: "92 кг",
      birthDate: "18.09.2000",
      nationality: "Россия",
      gamesPlayed: 15,
      penaltyMinutes: 2,
      plusMinus: 0,
      shots: 0,
      shotPercentage: 0,
      avgTimeOnIce: "60:00"
    },
    { 
      id: 6, 
      name: "Bardakov", 
      number: 26, 
      position: "Универсальный", 
      goals: 6, 
      assists: 9, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/b44d808e-dcb2-47f8-86ca-38f9234e1d87.jpg",
      height: "176 см",
      weight: "78 кг",
      birthDate: "30.12.2001",
      nationality: "Россия",
      gamesPlayed: 20,
      penaltyMinutes: 6,
      plusMinus: 3,
      shots: 78,
      shotPercentage: 7.7,
      avgTimeOnIce: "14:45"
    },
    { 
      id: 7, 
      name: "Bobrovskiy", 
      number: 88, 
      position: "Вратарь", 
      goals: 0, 
      assists: 1, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/c6acb1cf-21bd-44d2-aae0-49739fbf1c9a.jpg",
      height: "190 см",
      weight: "95 кг",
      birthDate: "12.06.1999",
      nationality: "Россия",
      gamesPlayed: 9,
      penaltyMinutes: 0,
      plusMinus: 0,
      shots: 0,
      shotPercentage: 0,
      avgTimeOnIce: "60:00"
    },
    { 
      id: 8, 
      name: "Martyska", 
      number: 16, 
      position: "Универсальный", 
      goals: 7, 
      assists: 11, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/21adbbc8-83a8-451f-85b8-1bdbc6849ede.jpg",
      height: "181 см",
      weight: "83 кг",
      birthDate: "25.08.2000",
      nationality: "Россия",
      gamesPlayed: 23,
      penaltyMinutes: 14,
      plusMinus: 4,
      shots: 89,
      shotPercentage: 7.9,
      avgTimeOnIce: "15:30"
    },
    { 
      id: 9, 
      name: "Maksimka", 
      number: 72, 
      position: "Универсальный", 
      goals: 9, 
      assists: 10, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/9c4d93b4-56cc-4742-a055-9d0fb82ab3e9.jpg",
      height: "179 см",
      weight: "81 кг",
      birthDate: "14.02.2002",
      nationality: "Россия",
      gamesPlayed: 21,
      penaltyMinutes: 10,
      plusMinus: 5,
      shots: 95,
      shotPercentage: 9.5,
      avgTimeOnIce: "16:00"
    },
    { 
      id: 10, 
      name: "Mishurov", 
      number: 1, 
      position: "Универсальный", 
      goals: 5, 
      assists: 8, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/099efe08-5f23-401d-b466-9b148166e3b9.jpg",
      height: "177 см",
      weight: "79 кг",
      birthDate: "08.05.2001",
      nationality: "Россия",
      gamesPlayed: 18,
      penaltyMinutes: 4,
      plusMinus: 2,
      shots: 65,
      shotPercentage: 7.7,
      avgTimeOnIce: "13:20"
    },
    { 
      id: 11, 
      name: "kenzo", 
      number: 10, 
      position: "Универсальный", 
      goals: 18, 
      assists: 20, 
      image: "https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/100e1e18-a675-41af-b1c4-4ee35fefb9fc.jpg",
      isAssistant: true,
      height: "182 см",
      weight: "84 кг",
      birthDate: "20.01.2000",
      nationality: "Россия",
      gamesPlayed: 24,
      penaltyMinutes: 18,
      plusMinus: 12,
      shots: 168,
      shotPercentage: 10.7,
      avgTimeOnIce: "20:15"
    }
  ];

  const player = players.find(p => p.id === Number(id));

  if (!player) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-oswald mb-4">Игрок не найден</h2>
          <Button onClick={() => navigate("/")}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const totalPoints = player.goals + player.assists;

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
            Назад к составу
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="relative mb-6">
                <img 
                  src={player.image} 
                  alt={player.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {player.isCaptain && (
                    <Badge className="bg-yellow-500 text-black font-bold text-lg px-3 py-1">
                      C
                    </Badge>
                  )}
                  {player.isAssistant && (
                    <Badge className="bg-blue-500 text-white font-bold text-lg px-3 py-1">
                      A
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded">
                  <span className="text-6xl font-oswald font-bold">#{player.number}</span>
                </div>
              </div>
              <h1 className="text-4xl font-oswald font-bold mb-2">{player.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{player.position}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-oswald">Рост:</span>
                  <span className="font-bold">{player.height}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-oswald">Вес:</span>
                  <span className="font-bold">{player.weight}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-oswald">Дата рождения:</span>
                  <span className="font-bold">{player.birthDate}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-oswald">Гражданство:</span>
                  <span className="font-bold">{player.nationality}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-oswald text-2xl">СТАТИСТИКА СЕЗОНА 2024/2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Icon name="Target" className="mx-auto mb-2 text-primary" size={32} />
                    <div className="text-4xl font-bold text-primary">{player.goals}</div>
                    <div className="text-sm font-oswald text-muted-foreground">ГОЛЫ</div>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <Icon name="Users" className="mx-auto mb-2 text-accent" size={32} />
                    <div className="text-4xl font-bold text-accent">{player.assists}</div>
                    <div className="text-sm font-oswald text-muted-foreground">ПЕРЕДАЧИ</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                    <Icon name="TrendingUp" className="mx-auto mb-2 text-blue-500" size={32} />
                    <div className="text-4xl font-bold text-blue-500">{totalPoints}</div>
                    <div className="text-sm font-oswald text-muted-foreground">ОЧКИ</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <Icon name="Calendar" className="mx-auto mb-2 text-green-500" size={32} />
                    <div className="text-4xl font-bold text-green-500">{player.gamesPlayed}</div>
                    <div className="text-sm font-oswald text-muted-foreground">МАТЧИ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-oswald text-2xl">ДЕТАЛЬНАЯ СТАТИСТИКА</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-oswald">Среднее время на льду</span>
                    <span className="text-xl font-bold">{player.avgTimeOnIce}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-oswald">Броски по воротам</span>
                    <span className="text-xl font-bold">{player.shots}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-oswald">% реализации бросков</span>
                    <span className="text-xl font-bold">{player.shotPercentage}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-oswald">Плюс/минус</span>
                    <span className={`text-xl font-bold ${player.plusMinus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {player.plusMinus >= 0 ? '+' : ''}{player.plusMinus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-oswald">Штрафное время</span>
                    <span className="text-xl font-bold">{player.penaltyMinutes} мин</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-oswald text-2xl">ДОСТИЖЕНИЯ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {player.isCaptain && (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded">
                      <Badge className="bg-yellow-500 text-black font-bold text-lg">C</Badge>
                      <span className="font-oswald">Капитан команды</span>
                    </div>
                  )}
                  {player.isAssistant && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                      <Badge className="bg-blue-500 text-white font-bold text-lg">A</Badge>
                      <span className="font-oswald">Ассистент капитана</span>
                    </div>
                  )}
                  {player.goals >= 15 && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                      <Icon name="Award" className="text-green-600" size={24} />
                      <span className="font-oswald">Лучший снайпер команды</span>
                    </div>
                  )}
                  {player.assists >= 15 && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                      <Icon name="Trophy" className="text-purple-600" size={24} />
                      <span className="font-oswald">Лучший по передачам</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
