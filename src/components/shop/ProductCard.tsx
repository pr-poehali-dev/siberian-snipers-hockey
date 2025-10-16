import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card 
      className="hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
      onClick={() => onClick(product)}
    >
      <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-w-full max-h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
        {product.customizable && (
          <Badge className="absolute top-4 right-4 bg-purple-600">
            <Icon name="Pencil" size={14} className="mr-1" />
            Кастомизация
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-oswald">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-accent">{product.price} ₽</span>
          <Button size="sm" className="font-oswald">
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            В КОРЗИНУ
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
