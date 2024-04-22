type DishInfo = {
  dishid: number;
  name: string;
  description: string;
  price: string;
  available: number;
  categoryid: number;
  countryid: number;
}[];

type Dish = {
  dishid: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

interface imageUpload {
  path: string;
}

export { DishInfo, Dish, imageUpload };
