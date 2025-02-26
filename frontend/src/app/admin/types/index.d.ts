export type TCreateCategoryParams = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

export type TCreateProductParams = {
  name: string;
  description: string;
  variants: {
    option: string;
    image: string;
    price: number;
    sale_price: number;
  }[];
  slug: string;
  idcate: string;
  hot:number;
};
