import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Standing } from "./types";

interface StandingEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  standing: Standing | null;
  onStandingChange: (standing: Standing) => void;
  onSave: () => void;
  loading: boolean;
}

const StandingEditDialog: React.FC<StandingEditDialogProps> = ({
  isOpen,
  onClose,
  standing,
  onStandingChange,
  onSave,
  loading
}) => {
  if (!standing) return null;

  const handleChange = (field: keyof Standing, value: any) => {
    onStandingChange({ ...standing, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl">
            {standing.id === 0 ? "Добавить команду" : "Редактировать команду"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Место</Label>
            <Input
              type="number"
              value={standing.place}
              onChange={(e) => handleChange("place", parseInt(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label>Название команды</Label>
            <Input
              value={standing.team}
              onChange={(e) => handleChange("team", e.target.value)}
              placeholder="Сибирские Снайперы"
            />
          </div>

          <div>
            <Label>Игр сыграно</Label>
            <Input
              type="number"
              value={standing.games}
              onChange={(e) => handleChange("games", parseInt(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label>Побед</Label>
            <Input
              type="number"
              value={standing.wins}
              onChange={(e) => handleChange("wins", parseInt(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label>Поражений</Label>
            <Input
              type="number"
              value={standing.losses}
              onChange={(e) => handleChange("losses", parseInt(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label>Очков</Label>
            <Input
              type="number"
              value={standing.points}
              onChange={(e) => handleChange("points", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onSave}
            disabled={loading}
            className="flex-1 font-oswald"
          >
            {loading ? "Сохранение..." : "Сохранить"}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            disabled={loading}
            className="flex-1 font-oswald"
          >
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StandingEditDialog;
