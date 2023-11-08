export enum Currency {
  USD = "USD",
  RUB = "RUB",
}

export enum TypesData {
  NAME = "name",
  QUANTITY = "quantity",
  DELIVERYDATE = "deliveryDate",
  PRICE = "price",
  CURRENCY = "currency",
}

export interface IData {
  id: string;
  name: string;
  quantity: number;
  deliveryDate: string;
  price: number;
  currency: Currency;
}
