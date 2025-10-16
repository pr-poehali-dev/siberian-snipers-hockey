import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { NewsItem } from "./types";

interface NewsSectionProps {
  news: NewsItem[];
  onEditNews: (newsItem: NewsItem) => void;
  onDeleteNews: (id: number) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, onEditNews, onDeleteNews }) => {
  return (
    <div className="space-y-3">
        {news.map(item => (
          <Card key={item.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 rounded object-cover" />
              <div className="flex-1">
                <h3 className="font-oswald text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                <p className="text-sm">{item.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onEditNews(item)}
                  size="sm"
                >
                  <Icon name="Edit" className="mr-2" size={16} />
                  Редактировать
                </Button>
                <Button
                  onClick={() => onDeleteNews(item.id)}
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

export default NewsSection;