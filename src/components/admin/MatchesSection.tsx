import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Match } from "./types";

interface MatchesSectionProps {
  matches: Match[];
  onEditMatch: (match: Match) => void;
  onDeleteMatch: (id: number) => void;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({ matches, onEditMatch, onDeleteMatch }) => {
  return (
    <div className="space-y-3">
        {matches.map(match => (
          <Card key={match.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-oswald text-lg">{match.date} - {match.opponent}</h3>
                <p className="text-sm text-muted-foreground">
                  {match.is_home ? "Домашний матч" : "Выездной матч"} | Счет: {match.score} | {match.status}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onEditMatch(match)}
                  size="sm"
                >
                  <Icon name="Edit" className="mr-2" size={16} />
                  Редактировать
                </Button>
                <Button
                  onClick={() => onDeleteMatch(match.id)}
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

export default MatchesSection;