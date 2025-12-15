"use client";

import { Product } from "@/models/interfaces";
import { useRouter } from "next/navigation";

interface ProdutoDetalheProps {
  produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  const router = useRouter();

  return (
    <div className="text-black max-w-3xl mx-auto p-6 space-y-6">


      <button
        onClick={() => router.push("/produtos")}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition shadow-sm font-medium"
      >
        ⬅ Voltar à lista
      </button>


      <div className="flex justify-center">
        <img
          src={`https://deisishop.pythonanywhere.com${produto.image}`}
          alt={produto.title}
          className="max-h-96 object-contain rounded shadow"
        />
      </div>


      <h1 className="text-2xl font-bold text-center">{produto.title}</h1>


      <p className="text-center text-gray-800">{produto.description}</p>


      <div className="flex justify-center gap-4 text-center">
        <span className="font-medium">Categoria: {produto.category}</span>
        <span className="font-semibold text-green-600">Preço: {produto.price} €</span>
      </div>


      <p className="text-yellow-600 text-center">
        {produto.rating.rate} ({produto.rating.count} avaliações)
      </p>
    </div>
  );
}
