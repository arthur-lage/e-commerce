import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../../components/Header";

import Image from "next/image";
import { Loading } from "../../components/Loading";
import { Star } from "phosphor-react";
import { convertNumberToCurrency } from "../../utils/convert-number-to-currency/convert-number-to-currency.ts";

export default function Product() {
  const [productInfo, setProductInfo] = useState({
    id: 1,
    name: "Cornflakes",
    price: 7,
    image: "http://dummyimage.com/188x100.png/cc0000/ffffff",
  });

  const router = useRouter();
  const { productId } = router.query;

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  async function addToCart() {
    setIsAddingToCart(!isAddingToCart);
  }

  async function fetchProductInfo() {
    // const res = await api.get("/product/" + productId)
    // setProductInfo(res.data)
    // convertedPrice = convertNumberToCurrency(res.data.price)
  }

  return (
    <div>
      <Header />

      <main className="mt-[15rem] flex w-[80vw] justify-between mx-auto">
        <Image
          width={300}
          height={300}
          className="object-cover w-[32.5rem] h-[32.5rem] rounded-xl"
          src={productInfo.image}
          alt={productInfo.name}
        />

        <div className="flex flex-col p-5 border-2 w-[45rem] border-slate-800 rounded-xl">
          <h2 className="font-bold font-quicksand text-zinc-900 mb-4 text-4xl">
            {productInfo.name}
          </h2>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 mb-6">
              <Star weight="fill" size={32} color="orange" />
              <Star weight="fill" size={32} color="orange" />
              <Star weight="fill" size={32} color="orange" />
              <Star weight="fill" size={32} color="orange" />
              <Star weight="fill" size={32} color="orange" />
            </div>
            <span className="text-2xl font-medium font-quicksand">72 reviews</span>
          </div>

          <p className="font-bold text-6xl mb-8 text-gray-900">
            {convertNumberToCurrency(productInfo.price)}
          </p>
          <p className="font-medium text-4xl mb-8 text-gray-900">
            10x of{" "}
            <span className="font-bold">
              {convertNumberToCurrency(productInfo.price / 10)}
            </span>
          </p>

          <div className="flex flex-col items-center mt-auto">
            <button
              className="w-full h-[4.5rem] rounded-md p-4 mb-8 text-2xl text-white font-bold font-quicksand bg-rose-600 hover:bg-rose-500 transition-all duration-150"
              onClick={addToCart}
            >
              {isAddingToCart ? <Loading /> : <span>Add to cart</span>}
            </button>

            <button className="w-full h-[4.5rem] rounded-md p-4 text-2xl text-white font-bold font-quicksand bg-cyan-600 hover:bg-cyan-500 transition-all duration-150">
              Buy product
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
