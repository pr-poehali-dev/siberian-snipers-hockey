import { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Джерси (Белое)",
    price: 5500,
    image: "https://cdn.poehali.dev/files/6e931c08-0d32-4672-87d9-591ac87907ab.jpg",
    category: "jerseys",
    sizes: ["S", "M", "L", "XL", "XXL"],
    customizable: true,
    description: "Белое игровое джерси. Кастомизация: ваша фамилия и номер."
  },
  {
    id: 2,
    name: "Джерси (Синее)",
    price: 5500,
    image: "https://cdn.poehali.dev/files/6e931c08-0d32-4672-87d9-591ac87907ab.jpg",
    category: "jerseys",
    sizes: ["S", "M", "L", "XL", "XXL"],
    customizable: true,
    description: "Синее игровое джерси. Кастомизация: ваша фамилия и номер."
  },
  {
    id: 3,
    name: "Кепка с логотипом",
    price: 1200,
    image: "https://cdn.poehali.dev/files/1460be37-29a0-4457-aeb9-9288e452230b.jpg",
    category: "accessories",
    description: "Стильная бейсболка 'Сибирский Стиль' с вышивкой. Регулируемый размер."
  },
  {
    id: 4,
    name: "Шапка команды",
    price: 1000,
    image: "https://cdn.poehali.dev/files/4cecdb91-a1de-4f80-9a00-da98ea2beb73.jpg",
    category: "accessories",
    description: "Тёплая вязаная шапка с логотипом Сибирских Снайперов."
  },
  {
    id: 5,
    name: "Шайба с логотипом",
    price: 800,
    image: "https://cdn.poehali.dev/files/6c4134be-19ee-45f7-9269-d7c027a5d271.jpg",
    category: "accessories",
    description: "Официальная игровая шайба с логотипом. Коллекционная молодёжная команда. Идеальный сувенир."
  },
  {
    id: 6,
    name: "Шарф болельщика (синий)",
    price: 1500,
    image: "https://cdn.poehali.dev/files/8dfe67f9-436f-4f07-97ef-eeaed8547e5f.jpg",
    category: "accessories",
    description: "Фанатский шарф в цветах команды Сибирские Снайперы."
  },
  {
    id: 7,
    name: "Вымпел команды (синий)",
    price: 1200,
    image: "https://cdn.poehali.dev/files/29db9d33-8826-4926-8137-b51a4332b977.jpg",
    category: "accessories",
    description: "Официальный вымпел с логотипом. Синий цвет с белой бахромой."
  },
  {
    id: 8,
    name: "Вымпел команды (голубой)",
    price: 1200,
    image: "https://cdn.poehali.dev/files/66332941-ba92-4144-8086-aff1bc66bb4b.jpg",
    category: "accessories",
    description: "Официальный вымпел с логотипом. Голубой цвет с белой бахромой."
  },
  {
    id: 9,
    name: "Значок команды",
    price: 400,
    image: "https://cdn.poehali.dev/files/d57890bf-5a57-4480-9c91-61a71afce555.jpg",
    category: "accessories",
    description: "Коллекционный значок с логотипом. Металл с эмалью."
  }
];
