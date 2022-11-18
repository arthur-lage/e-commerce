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
    <a className="rounded-2xl pb-4 hover:bg-gray-200 bg-gray-50 transition-all duration-150 flex flex-col w-[22rem]" href={`/product/${product.id}`}>
      <Image width={300} height={300} className="object-cover rounded-t-2xl w-full h-[20rem] mb-4" src={product.image} alt={product.name} />
      <p className="px-3 text-3xl font-medium font-quicksand text-zinc-900">{product.name}</p>
      <p className="px-3 font-bold text-4xl font-quicksand my-4">${product.price}</p>
      <p className="px-3 font-quicksand text-3xl">10x of <span className="font-bold">${product.price / 10}</span></p>
    </a>
  );
}
