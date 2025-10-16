import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Player } from "./types";

interface PlayersSectionProps {
  players: Player[];
  onEditPlayer: (player: Player) => void;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({ players, onEditPlayer }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-oswald font-bold">Управление игроками</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map(player => (
          <Card key={player.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <img src={player.image} alt={player.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-oswald text-xl">{player.name}</h3>
                  <Badge variant="secondary">#{player.number}</Badge>
                </div>
              </div>
              <div className="space-y-1 text-sm mb-3">
                <p><strong>Позиция:</strong> {player.position}</p>
                <p><strong>Голы:</strong> {player.goals} | <strong>Передачи:</strong> {player.assists}</p>
                <p><strong>Матчи:</strong> {player.games_played}</p>
              </div>
              <Button
                onClick={() => onEditPlayer(player)}
                className="w-full"
                size="sm"
              >
                <Icon name="Edit" className="mr-2" size={16} />
                Редактировать
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlayersSection;
