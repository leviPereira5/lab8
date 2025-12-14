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
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <img
        src={`https://deisishop.pythonanywhere.com${produto.image}`}
        alt={produto.title}
        width={150}
      />

      <h3>{produto.title}</h3>
      <p>{produto.price} €</p>

      {!isCart ? (
        <>
          <button onClick={() => onAdd?.(produto)}>
            Adicionar ao carrinho
          </button>

          <Link href={`/produtos/${produto.id}`}>
            <button>+ info</button>
          </Link>
        </>
      ) : (
        <button onClick={() => onRemove?.(produto.id)}>
          Remover do carrinho
        </button>
      )}
    </div>
  );
}
