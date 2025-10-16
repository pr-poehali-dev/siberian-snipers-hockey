import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Match } from "./types";

interface MatchEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  onMatchChange: (match: Match) => void;
  onSave: () => void;
  loading: boolean;
}

const MatchEditDialog: React.FC<MatchEditDialogProps> = ({
  isOpen,
  onClose,
  match,
  onMatchChange,
  onSave,
  loading
}) => {
  if (!match) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl">Редактирование матча</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Дата</Label>
            <Input
              value={match.date}
              onChange={(e) => onMatchChange({...match, date: e.target.value})}
              placeholder="16.10"
            />
          </div>
          <div>
            <Label>Соперник</Label>
            <Input
              value={match.opponent}
              onChange={(e) => onMatchChange({...match, opponent: e.target.value})}
            />
          </div>
          <div>
            <Label>Счет</Label>
            <Input
              value={match.score}
              onChange={(e) => onMatchChange({...match, score: e.target.value})}
              placeholder="5:3"
            />
          </div>
          <div>
            <Label>Статус</Label>
            <Input
              value={match.status}
              onChange={(e) => onMatchChange({...match, status: e.target.value})}
              placeholder="Скоро / Завершен"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={match.is_home}
              onChange={(e) => onMatchChange({...match, is_home: e.target.checked})}
              className="w-4 h-4"
            />
            <span>Домашний матч</span>
          </label>
          <Button onClick={onSave} className="w-full" disabled={loading}>
            <Icon name="Save" className="mr-2" size={20} />
            Сохранить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchEditDialog;
