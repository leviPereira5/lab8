"use client";

import Link from "next/link";
import { Product } from "@/models/interfaces";

interface ProdutoCardProps {
  produto: Product;
  onAdd?: (produto: Product) => void;
  onRemove?: (id: number) => void;
  isCart?: boolean;
}

export default function ProdutoCard({
  produto,
  onAdd,
  onRemove,
  isCart = false,
}: ProdutoCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col text-black">
      <img
        src={`https://deisishop.pythonanywhere.com${produto.image}`}
        alt={produto.title}
        className="h-40 object-contain mb-4"
      />

      <h3 className="font-semibold text-lg mb-2">{produto.title}</h3>

      <p className="mb-4">{produto.price} €</p>

      {!isCart ? (
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onAdd?.(produto)}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>

          <Link
            href={`/produtos/${produto.id}`}
            className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition"
          >
            + info
          </Link>
        </div>
      ) : (
        <button
          onClick={() => onRemove?.(produto.id)}
          className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Remover do carrinho
        </button>
      )}
    </div>
  );
}
