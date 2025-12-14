"use client";

import { Product } from "@/models/interfaces";
import Link from "next/link";

interface ProdutoDetalheProps {
  produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  return (
    <div>
      <h1>{produto.title}</h1>

      <img src={produto.image} alt={produto.title} width={250} />

      <p><strong>Descrição:</strong> {produto.description}</p>
      <p><strong>Categoria:</strong> {produto.category}</p>
      <p><strong>Preço:</strong> {produto.price} €</p>

      <p>
        <strong>Rating:</strong> {produto.rating.rate} ⭐ (
        {produto.rating.count} avaliações)
      </p>

      <Link href="/produtos">
        <button>⬅ Voltar à lista</button>
      </Link>
    </div>
  );
}
