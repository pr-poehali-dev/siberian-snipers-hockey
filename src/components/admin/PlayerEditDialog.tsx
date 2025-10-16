import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Player } from "./types";

interface PlayerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player | null;
  onPlayerChange: (player: Player) => void;
  onSave: () => void;
  loading: boolean;
}

const PlayerEditDialog: React.FC<PlayerEditDialogProps> = ({
  isOpen,
  onClose,
  player,
  onPlayerChange,
  onSave,
  loading
}) => {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl">Редактирование игрока</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Имя</Label>
              <Input
                value={player.name}
                onChange={(e) => onPlayerChange({...player, name: e.target.value})}
              />
            </div>
            <div>
              <Label>Номер</Label>
              <Input
                type="number"
                value={player.number}
                onChange={(e) => onPlayerChange({...player, number: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div>
            <Label>Позиция</Label>
            <Input
              value={player.position}
              onChange={(e) => onPlayerChange({...player, position: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Голы</Label>
              <Input
                type="number"
                value={player.goals}
                onChange={(e) => onPlayerChange({...player, goals: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label>Передачи</Label>
              <Input
                type="number"
                value={player.assists}
                onChange={(e) => onPlayerChange({...player, assists: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label>Матчи</Label>
              <Input
                type="number"
                value={player.games_played}
                onChange={(e) => onPlayerChange({...player, games_played: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Рост</Label>
              <Input
                value={player.height || ""}
                onChange={(e) => onPlayerChange({...player, height: e.target.value})}
                placeholder="180 см"
              />
            </div>
            <div>
              <Label>Вес</Label>
              <Input
                value={player.weight || ""}
                onChange={(e) => onPlayerChange({...player, weight: e.target.value})}
                placeholder="75 кг"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Дата рождения</Label>
              <Input
                value={player.birth_date || ""}
                onChange={(e) => onPlayerChange({...player, birth_date: e.target.value})}
                placeholder="01.01.2000"
              />
            </div>
            <div>
              <Label>Гражданство</Label>
              <Input
                value={player.nationality || ""}
                onChange={(e) => onPlayerChange({...player, nationality: e.target.value})}
                placeholder="Россия"
              />
            </div>
          </div>
          <div>
            <Label>URL изображения</Label>
            <Input
              value={player.image}
              onChange={(e) => onPlayerChange({...player, image: e.target.value})}
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={player.is_captain}
                onChange={(e) => onPlayerChange({...player, is_captain: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Капитан</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={player.is_assistant}
                onChange={(e) => onPlayerChange({...player, is_assistant: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Ассистент</span>
            </label>
          </div>
          <Button onClick={onSave} className="w-full" disabled={loading}>
            <Icon name="Save" className="mr-2" size={20} />
            Сохранить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerEditDialog;
