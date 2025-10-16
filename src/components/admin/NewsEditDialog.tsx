import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { NewsItem } from "./types";

interface NewsEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem | null;
  onNewsChange: (news: NewsItem) => void;
  onSave: () => void;
  loading: boolean;
}

const NewsEditDialog: React.FC<NewsEditDialogProps> = ({
  isOpen,
  onClose,
  news,
  onNewsChange,
  onSave,
  loading
}) => {
  if (!news) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl">Редактирование новости</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Заголовок</Label>
            <Input
              value={news.title}
              onChange={(e) => onNewsChange({...news, title: e.target.value})}
            />
          </div>
          <div>
            <Label>Дата</Label>
            <Input
              value={news.date}
              onChange={(e) => onNewsChange({...news, date: e.target.value})}
            />
          </div>
          <div>
            <Label>URL изображения</Label>
            <Input
              value={news.image}
              onChange={(e) => onNewsChange({...news, image: e.target.value})}
            />
          </div>
          <div>
            <Label>Краткое описание</Label>
            <Textarea
              value={news.excerpt}
              onChange={(e) => onNewsChange({...news, excerpt: e.target.value})}
              rows={3}
            />
          </div>
          <div>
            <Label>Полный текст (опционально)</Label>
            <Textarea
              value={news.content || ""}
              onChange={(e) => onNewsChange({...news, content: e.target.value})}
              rows={6}
            />
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

export default NewsEditDialog;
