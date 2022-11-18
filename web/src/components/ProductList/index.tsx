import { ProductCard } from "../ProductCard";
import { IProduct } from "../ProductCard";

interface IProductList {
  products: IProduct[];
}

export function ProductList({ products }: IProductList) {
  return (
    <div className="flex  justify-between flex-wrap gap-y-12">
      {products.map((product) => (
        <ProductCard
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          key={product.id}
        />
      ))}
    </div>
  );
}
