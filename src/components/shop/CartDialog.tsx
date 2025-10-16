import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { CartItem } from "./types";

interface CartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  total: number;
}

const CartDialog = ({ isOpen, onClose, cart, onRemoveItem, onCheckout, total }: CartDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-oswald">КОРЗИНА</DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg text-muted-foreground">Корзина пуста</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 border rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-oswald text-lg">{item.name}</h3>
                  {item.customName && item.customNumber && (
                    <p className="text-sm text-purple-600 font-bold">
                      {item.customName} #{item.customNumber}
                    </p>
                  )}
                  {item.selectedSize && (
                    <p className="text-sm text-muted-foreground">Размер: {item.selectedSize}</p>
                  )}
                  <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                  <p className="font-bold mt-2">{item.price * item.quantity} ₽</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveItem(index)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-oswald">ИТОГО:</span>
                <span className="text-3xl font-bold text-accent">{total} ₽</span>
              </div>
              <Button
                className="w-full font-oswald text-lg py-6"
                onClick={onCheckout}
              >
                <Icon name="CreditCard" className="mr-2" size={20} />
                ОФОРМИТЬ ЗАКАЗ
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
