"use client";

import { Product } from "@/models/interfaces";
import { useRouter } from "next/navigation";

interface ProdutoDetalheProps {
  produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  const router = useRouter();

  return (
    <>
      {/* BOTÃO VOLTAR */}
    <button
  onClick={() => router.push("/produtos")}
  className="inline-flex items-center gap-2 mb-6 
             bg-black hover:bg-gray-200 
             text-blue-600 hover:text-blue-800 
             px-4 py-2 rounded shadow transition"
>
  ⬅ Voltar à lista
</button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGEM */}
        <div className="flex justify-center items-center bg-white rounded shadow p-4">
          <img
            src={`https://deisishop.pythonanywhere.com${produto.image}`}
            alt={produto.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* INFO */}
        <div className="bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4">{produto.title}</h1>

          <p className="text-gray-700 mb-4">
            <strong>Descrição:</strong> {produto.description}
          </p>

          <p className="mb-2">
            <strong>Categoria:</strong> {produto.category}
          </p>

          <p className="mb-2 text-lg font-semibold">
            Preço: {produto.price} €
          </p>

          <p className="text-yellow-600">
            {produto.rating.rate} ({produto.rating.count} avaliações)
          </p>
        </div>
      </div>
    </>
  );
}
