import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const players: Array<{id: number; name: string; number: number; position: string; goals: number; assists: number; image: string}> = [];

  const matches: Array<{id: number; date: string; opponent: string; home: boolean; score: string; status: string}> = [];

  const standings: Array<{place: number; team: string; games: number; wins: number; losses: number; points: number}> = [];

  const management: Array<{name: string; position: string; experience: string}> = [];

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 38, 71, 0.7), rgba(10, 38, 71, 0.85)), url('https://cdn.poehali.dev/projects/0c3ad395-4537-4b63-bf7d-d0e32adf7baf/files/d96e463a-f0e4-40e5-8913-6f07d929e5ba.jpg')`
        }}
      >
        <div className="text-center space-y-6 animate-fade-in">
          <img 
            src="https://cdn.poehali.dev/files/097edba3-4667-492c-8fdc-1be95663ce9e.png" 
            alt="Логотип Сибирские Снайперы" 
            className="w-64 h-64 mx-auto mb-6 object-contain"
          />
          <h1 className="text-7xl font-oswald font-bold tracking-wider">СИБИРСКИЕ СНАЙПЕРЫ</h1>
          <p className="text-2xl font-roboto tracking-wide">ХОККЕЙНЫЙ КЛУБ</p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-oswald text-lg px-8">
              КУПИТЬ БИЛЕТЫ
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-oswald text-lg px-8">
              КАЛЕНДАРЬ МАТЧЕЙ
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">


        <Tabs defaultValue="players" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="players" className="font-oswald text-lg py-4 px-6">ИГРОКИ</TabsTrigger>
            <TabsTrigger value="matches" className="font-oswald text-lg py-4 px-6">МАТЧИ</TabsTrigger>
            <TabsTrigger value="standings" className="font-oswald text-lg py-4 px-6 whitespace-normal">ТУРНИРНАЯ ТАБЛИЦА</TabsTrigger>
            <TabsTrigger value="management" className="font-oswald text-lg py-4 px-6">РУКОВОДСТВО</TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">СОСТАВ КОМАНДЫ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {players.map((player) => (
                <Card key={player.id} className="overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-oswald text-xl font-bold">
                      {player.number}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-oswald text-xl mb-2">{player.name}</h3>
                    <Badge variant="secondary" className="mb-3">{player.position}</Badge>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Голы</p>
                        <p className="font-bold text-lg">{player.goals}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Передачи</p>
                        <p className="font-bold text-lg">{player.assists}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {players.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Users" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВЯТСЯ ИГРОКИ</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">РАСПИСАНИЕ МАТЧЕЙ</h2>
            <div className="space-y-4">
              {matches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-center min-w-[100px]">
                          <p className="font-oswald text-sm text-muted-foreground">{match.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-oswald text-xl">Сибирские Снайперы</span>
                          <Icon name="Swords" size={20} className="text-accent" />
                          <span className="font-oswald text-xl">{match.opponent}</span>
                        </div>
                        <Badge variant={match.home ? "default" : "outline"}>
                          {match.home ? "Дома" : "В гостях"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-oswald text-3xl font-bold">{match.score}</span>
                        <Badge 
                          variant={match.status === "Победа" ? "default" : match.status === "Ничья" ? "secondary" : "outline"}
                          className={match.status === "Победа" ? "bg-green-600" : ""}
                        >
                          {match.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {matches.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Calendar" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВЯТСЯ МАТЧИ</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="standings" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">ВОСТОЧНАЯ ЛИГА</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="p-4 text-left font-oswald">МЕСТО</th>
                        <th className="p-4 text-left font-oswald">КОМАНДА</th>
                        <th className="p-4 text-center font-oswald">И</th>
                        <th className="p-4 text-center font-oswald">В</th>
                        <th className="p-4 text-center font-oswald">П</th>
                        <th className="p-4 text-center font-oswald">ОЧКИ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team) => (
                        <tr 
                          key={team.place} 
                          className={`border-b hover:bg-muted/50 transition-colors ${team.place === 1 ? 'bg-accent/10' : ''}`}
                        >
                          <td className="p-4 font-bold">{team.place}</td>
                          <td className="p-4 font-oswald text-lg">{team.team}</td>
                          <td className="p-4 text-center">{team.games}</td>
                          <td className="p-4 text-center font-bold">{team.wins}</td>
                          <td className="p-4 text-center">{team.losses}</td>
                          <td className="p-4 text-center font-bold text-lg">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            {standings.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Trophy" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВИТСЯ ТУРНИРНАЯ ТАБЛИЦА</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="management" className="space-y-6 min-h-[400px]">
            <h2 className="text-4xl font-oswald mb-8">РУКОВОДСТВО КЛУБА</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {management.map((person, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-oswald text-2xl">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-oswald">{person.name}</CardTitle>
                        <p className="text-muted-foreground">{person.position}</p>
                        <p className="text-sm text-accent font-medium mt-1">Опыт: {person.experience}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            {management.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="UserCog" size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-oswald">СКОРО ЗДЕСЬ ПОЯВИТСЯ РУКОВОДСТВО</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-primary text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-oswald text-2xl mb-4">СИБИРСКИЕ СНАЙПЕРЫ</h3>
              <p className="text-white/80">Профессиональный хоккейный клуб</p>
            </div>
            <div>
              <h4 className="font-oswald text-lg mb-4">КОНТАКТЫ</h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  г. Новосибирск, ул. Спортивная, 1
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (383) 000-00-00
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@snipers-hockey.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-oswald text-lg mb-4">СОЦИАЛЬНЫЕ СЕТИ</h4>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2025 Сибирские Снайперы. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;