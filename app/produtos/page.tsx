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
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [buyResponse, setBuyResponse] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (produto: Product) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
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

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.produto.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.produto.price) * item.quantity,
    0
  );


  const buy = () => {
    const productIds = cart.flatMap((item) =>
      Array(item.quantity).fill(item.produto.id)
    );

    fetch("https://deisishop.pythonanywhere.com/api/deisishop/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: productIds,
        name: "Cliente",
        student: isStudent,
        coupon: coupon,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}`);
        }

        const text = await response.text();

        return text
          ? JSON.parse(text)
          : { message: "Compra realizada com sucesso!" };
      })
      .then((data) => {
        setBuyResponse(data);
        setCart([]);
      })
      .catch((err) => {
        console.error("Erro ao comprar:", err);
        setBuyResponse({ error: "Erro ao realizar a compra" });
      });
  };

  if (error) return <p className="text-black">{error.message}</p>;
  if (isLoading) return <p className="text-black">A descarregar dados…</p>;
  if (!data) return <p className="text-black">Não há produtos</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 text-black">
      <section>
        <h2 className="text-2xl font-bold mb-6">Produtos</h2>
        <FiltrarProdutos data={data} addToCart={addToCart} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Carrinho</h2>

        {cart.length === 0 && <p>Carrinho vazio</p>}

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.produto.id}
              className="flex flex-col sm:flex-row gap-4 items-center border rounded-lg p-4"
            >
              <div className="w-full sm:w-1/2">
                <ProdutoCard
                  produto={item.produto}
                  isCart
                  onRemove={removeFromCart}
                />
              </div>

              <p className="font-medium">Quantidade: {item.quantity}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Total: {total.toFixed(2)} €
        </h3>
      </section>

      <section className="border rounded-xl p-6 space-y-4 bg-gray-50">
        <h2 className="text-2xl font-bold">Finalizar Compra</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
          Estudante DEISI
        </label>

        <input
          type="text"
          placeholder="Cupão de desconto"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-64 text-black"
        />

        <button
          onClick={buy}
          disabled={cart.length === 0}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Comprar
        </button>
      </section>

      {buyResponse && (
        <section className="border rounded-xl p-6 bg-white">
          <h3 className="text-xl font-bold mb-4">Resultado da Compra</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(buyResponse, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
