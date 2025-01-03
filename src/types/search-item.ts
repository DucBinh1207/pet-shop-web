export type SearchItemType = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  rating: number;
};

export type SearchItemList = {
  customProducts: SearchItemType[];
  totalRecords: number;
};
