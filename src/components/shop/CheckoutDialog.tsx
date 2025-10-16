import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { CartItem, FormData } from "./types";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  formData: FormData;
  onFormChange: (field: string, value: string) => void;
  onPurchase: () => void;
  isProcessing: boolean;
  isPurchased: boolean;
  isFormValid: boolean;
}

const CheckoutDialog = ({
  isOpen,
  onClose,
  cart,
  total,
  formData,
  onFormChange,
  onPurchase,
  isProcessing,
  isPurchased,
  isFormValid
}: CheckoutDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-oswald">
            {isPurchased ? "ПОКУПКА ОФОРМЛЕНА!" : "ОФОРМЛЕНИЕ ЗАКАЗА"}
          </DialogTitle>
        </DialogHeader>

        {isPurchased ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Check" size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-oswald text-green-600">СПАСИБО ЗА ПОКУПКУ!</h3>
            <p className="text-muted-foreground">Ваш заказ успешно оформлен. Мы отправим детали на указанный email.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-oswald mb-2">ВАШ ЗАКАЗ:</h4>
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-1">
                  <span>
                    {item.name} {item.customName ? `(${item.customName} #${item.customNumber})` : ""} x{item.quantity}
                  </span>
                  <span>{item.price * item.quantity} ₽</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>ИТОГО:</span>
                <span className="text-accent text-xl">{total} ₽</span>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h4 className="font-oswald text-lg">ДАННЫЕ ПОКУПАТЕЛЯ</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Имя *</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => onFormChange("firstName", e.target.value)}
                    placeholder="Иван"
                  />
                </div>
                <div>
                  <Label>Фамилия *</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => onFormChange("lastName", e.target.value)}
                    placeholder="Иванов"
                  />
                </div>
              </div>

              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onFormChange("email", e.target.value)}
                  placeholder="example@mail.com"
                />
              </div>

              <div>
                <Label>Телефон *</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => onFormChange("phone", e.target.value)}
                  placeholder="89001234567"
                />
              </div>

              <div>
                <Label>Адрес доставки *</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => onFormChange("address", e.target.value)}
                  placeholder="г. Москва, ул. Ленина, д. 1, кв. 1"
                />
              </div>

              <div>
                <Label>Номер карты *</Label>
                <Input
                  value={formData.cardNumber}
                  onChange={(e) => onFormChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                />
              </div>
            </div>

            <Button
              className="w-full font-oswald text-lg py-6"
              onClick={onPurchase}
              disabled={!isFormValid || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                  ОБРАБОТКА...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" className="mr-2" size={20} />
                  ОПЛАТИТЬ {total} ₽
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
