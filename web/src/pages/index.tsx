import { useState } from "react";

import { Header } from "../components/Header";
import { ProductList } from "../components/ProductList";
import { IProduct } from "../components/ProductCard";
import Head from "next/head";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([
    {
      id: 1,
      name: "Cornflakes",
      price: 7,
      image: "http://dummyimage.com/188x100.png/cc0000/ffffff",
    },
    {
      id: 2,
      name: "Chocolate - Semi Sweet",
      price: 2,
      image: "http://dummyimage.com/134x100.png/ff4444/ffffff",
    },
    {
      id: 3,
      name: "Bread - Multigrain Oval",
      price: 12,
      image: "http://dummyimage.com/145x100.png/ff4444/ffffff",
    },
    {
      id: 4,
      name: "Beets - Pickled",
      price: 12,
      image: "http://dummyimage.com/131x100.png/dddddd/000000",
    },
    {
      id: 5,
      name: "Garlic - Peeled",
      price: 4,
      image: "http://dummyimage.com/174x100.png/ff4444/ffffff",
    },
    {
      id: 6,
      name: "Lamb - Leg, Diced",
      price: 4,
      image: "http://dummyimage.com/116x100.png/cc0000/ffffff",
    },
    {
      id: 7,
      name: "Zucchini - Yellow",
      price: 18,
      image: "http://dummyimage.com/244x100.png/5fa2dd/ffffff",
    },
    {
      id: 8,
      name: "Wine - Chardonnay South",
      price: 8,
      image: "http://dummyimage.com/190x100.png/ff4444/ffffff",
    },
    {
      id: 9,
      name: "Cheese - Ricotta",
      price: 12,
      image: "http://dummyimage.com/219x100.png/5fa2dd/ffffff",
    },
    {
      id: 10,
      name: "Carbonated Water - Wildberry",
      price: 9,
      image: "http://dummyimage.com/131x100.png/dddddd/000000",
    },
    {
      id: 11,
      name: "Egg Patty Fried",
      price: 4,
      image: "http://dummyimage.com/198x100.png/ff4444/ffffff",
    },
    {
      id: 12,
      name: "Fish - Bones",
      price: 4,
      image: "http://dummyimage.com/181x100.png/ff4444/ffffff",
    },
    {
      id: 13,
      name: "Vegetable - Base",
      price: 17,
      image: "http://dummyimage.com/232x100.png/dddddd/000000",
    },
    {
      id: 14,
      name: "Wine - Shiraz Wolf Blass Premium",
      price: 9,
      image: "http://dummyimage.com/143x100.png/5fa2dd/ffffff",
    },
    {
      id: 15,
      name: "Pastry - Apple Large",
      price: 11,
      image: "http://dummyimage.com/249x100.png/dddddd/000000",
    },
    {
      id: 16,
      name: "Sansho Powder",
      price: 17,
      image: "http://dummyimage.com/169x100.png/dddddd/000000",
    },
  ]);

  return (
    <>
      <Head>
        <title>e-commerce - Home</title>
      </Head>
      
      <div>
        <Header />

        <main className="mt-[15rem] px-32">
          <h2 className="mb-12 text-slate-900 text-5xl font-bold font-quicksand">
            Products
          </h2>

          <ProductList products={products} />
        </main>
      </div>
    </>
  );
}
