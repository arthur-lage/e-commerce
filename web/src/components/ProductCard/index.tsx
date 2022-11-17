import Image from "next/image";
import { Link } from "phosphor-react";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export function ProductCard(product: IProduct) {
  return (
    <div>
      <Image width={240} height={240} src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <b>${product.price}</b>
      <Link to={`/products/${product.id}`}>Buy</Link>
    </div>
  );
}
