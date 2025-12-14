"use client";

import { Product } from "@/models/interfaces";
import useSWR from "swr";
import { useEffect, useState } from "react";
import FiltrarProdutos from "@/app/components/FiltrarProdutos";
import ProdutoCard from "@/app/components/ProdutoCard";

interface CartItem {
  produto: Product;
  quantity: number;
}

export default function ProdutosPage() {
  const fetcher = async (url: string) => {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
    }
    return resposta.json();
  };

  const url = "https://deisishop.pythonanywhere.com/products/";
  const { data, error, isLoading } = useSWR<Product[]>(url, fetcher);

  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔁 carregar do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // 💾 guardar no localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ adicionar produto
  const addToCart = (produto: Product) => {
    setCart((prev) => {
      const existente = prev.find(
        (item) => item.produto.id === produto.id
      );

      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { produto, quantity: 1 }];
    });
  };

  // ➖ remover produto
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev.filter((item) => item.produto.id !== id)
    );
  };

  // 💰 total
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.produto.price) * item.quantity,
    0
  );

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>A descarregar dados…</p>;
  if (!data) return <p>Não há produtos</p>;

  return (
    <>
      <h2>Produtos</h2>

      <FiltrarProdutos data={data} addToCart={addToCart} />

      <hr />

      <h2>Carrinho</h2>

      {cart.length === 0 && <p>Carrinho vazio</p>}

      {cart.map((item) => (
        <div key={item.produto.id}>
          <ProdutoCard
            produto={item.produto}
            isCart
            onRemove={removeFromCart}
          />

          <p>Quantidade: {item.quantity}</p>
        </div>
      ))}

      <h3>Total: {total.toFixed(2)} €</h3>
    </>
  );
}
