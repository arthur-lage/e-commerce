import Link from "next/link";
import { FormEvent, useState } from "react";

import { MagnifyingGlass } from "phosphor-react";

export function Header() {
  const [search, setSearch] = useState("");

  async function handleSearch(e: FormEvent) {
    if (!search.trim().length) return;

    // const res = await fetch("")
  }

  return (
    <header className="fixed w-full top-0 left-0 bg-slate-800 flex items-center justify-between px-20 py-8">
      <Link
        className="text-3xl font-medium text-white outline-none font-quicksand"
        href="/"
      >
        e-commerce
      </Link>

      <form className="flex" onSubmit={handleSearch}>
        <input
          placeholder="Search for products..."
          className="w-[35rem] h-[4rem] pl-4 rounded-tl-md rounded-bl-md bg-zinc-100 focus:bg-zinc-200 transition-all duration-150 outline-none  text-zinc-900 font-medium font-quicksand text-2xl"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="rounded-tr-md hover:bg-orange-700 transition-all duration-150 focus:bg-orange-500 cursor-pointer rounded-br-md bg-orange-600 flex items-center justify-center w-[4rem] h-[4rem]"
          type="submit"
        >
          <MagnifyingGlass weight="bold" className="text-3xl text-white" />
        </button>
      </form>

      <nav>
        <ul className="flex items-center gap-24">
          <li>
            <Link className="header-link" href="#">Shopping Cart</Link>
          </li>
          <li>
            <Link className="header-link" href="#">Purchases</Link>
          </li>
          <li>
            <Link className="header-link" href="#">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
