import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Product } from "./types";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  customName: string;
  setCustomName: (name: string) => void;
  customNumber: string;
  setCustomNumber: (number: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductDialog = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  setSelectedSize,
  customName,
  setCustomName,
  customNumber,
  setCustomNumber,
  quantity,
  setQuantity,
  onAddToCart
}: ProductDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-oswald">ДОБАВИТЬ В КОРЗИНУ</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-24 h-24 object-contain rounded"
            />
            <div className="flex-1">
              <h3 className="font-oswald text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-accent">{product.price} ₽</p>
            </div>
          </div>

          {product.sizes && (
            <div>
              <Label>Размер</Label>
              <div className="flex gap-2 mt-2">
                {product.sizes.map(size => (
                  <Button
                    key={size}
                    size="sm"
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="w-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {product.customizable && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-oswald text-lg flex items-center">
                <Icon name="Pencil" className="mr-2" size={20} />
                КАСТОМИЗАЦИЯ
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Фамилия *</Label>
                  <Input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    placeholder="IVANOV"
                    maxLength={15}
                  />
                </div>
                <div>
                  <Label>Номер *</Label>
                  <Input
                    type="number"
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value)}
                    placeholder="99"
                    min="0"
                    max="99"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <Label>Количество</Label>
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Icon name="Minus" size={16} />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center w-20"
                min="1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>

          <Button
            className="w-full font-oswald text-lg py-6"
            onClick={onAddToCart}
          >
            <Icon name="ShoppingCart" className="mr-2" size={20} />
            ДОБАВИТЬ В КОРЗИНУ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
