import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Player } from "./types";

interface PlayersSectionProps {
  players: Player[];
  onEditPlayer: (player: Player) => void;
  onDeletePlayer: (id: number) => void;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({ players, onEditPlayer, onDeletePlayer }) => {
  return (
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
              <div className="flex gap-2">
                <Button
                  onClick={() => onEditPlayer(player)}
                  className="flex-1"
                  size="sm"
                >
                  <Icon name="Edit" className="mr-2" size={16} />
                  Редактировать
                </Button>
                <Button
                  onClick={() => onDeletePlayer(player.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
  );
};

export default PlayersSection;