import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stream } from "./types";

interface StreamEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stream: Stream | null;
  onStreamChange: (stream: Stream) => void;
  onSave: () => void;
  loading: boolean;
}

const StreamEditDialog: React.FC<StreamEditDialogProps> = ({
  isOpen,
  onClose,
  stream,
  onStreamChange,
  onSave,
  loading
}) => {
  if (!stream) return null;

  const handleChange = (field: keyof Stream, value: any) => {
    onStreamChange({ ...stream, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl">
            {stream.id === 0 ? "Добавить трансляцию" : "Редактировать трансляцию"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Название</Label>
            <Input
              value={stream.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Сибирские Снайперы vs Противник"
            />
          </div>

          <div>
            <Label>Ссылка на трансляцию</Label>
            <Input
              value={stream.stream_url}
              onChange={(e) => handleChange("stream_url", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div>
            <Label>Статус</Label>
            <Select
              value={stream.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">📅 Запланирована</SelectItem>
                <SelectItem value="live">🔴 В эфире</SelectItem>
                <SelectItem value="ended">✅ Завершена</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Дата и время трансляции</Label>
            <Input
              type="datetime-local"
              value={stream.scheduled_time ? new Date(stream.scheduled_time).toISOString().slice(0, 16) : ''}
              onChange={(e) => handleChange("scheduled_time", new Date(e.target.value).toISOString())}
            />
          </div>

          <div>
            <Label>Обложка (URL изображения)</Label>
            <Input
              value={stream.thumbnail || ""}
              onChange={(e) => handleChange("thumbnail", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StreamEditDialog;
