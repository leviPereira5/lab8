"use client";
// Indica que este componente é executado no cliente (browser)
// Necessário para hooks, SWR e interações do usuário

import { Product } from "@/models/interfaces";
// Interface que define a estrutura de um produto

import useSWR from "swr";
// Hook para fetch de dados com cache, revalidação automática e estados de carregamento/erro

import { useEffect, useState } from "react";
// Hooks do React para estado e efeitos colaterais

import FiltrarProdutos from "@/app/components/FiltrarProdutos";
// Componente para filtrar e ordenar produtos

import ProdutoCard from "@/app/components/ProdutoCard";
// Componente que mostra visualmente um produto (card)


// Interface para os itens do carrinho
interface CartItem {
  produto: Product; // Produto adicionado
  quantity: number; // Quantidade do produto
}

// Página principal de produtos
export default function ProdutosPage() {

  // Função fetcher para o SWR: busca dados da API e trata erros
  const fetcher = async (url: string) => {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
    }
    return resposta.json();
  };

  // URL da API de produtos
  const url = "https://deisishop.pythonanywhere.com/products/";

  // SWR faz a requisição, retorna:
  // data -> lista de produtos
  // error -> erro caso exista
  // isLoading -> true enquanto carrega
  const { data, error, isLoading } = useSWR<Product[]>(url, fetcher);

  // Estado do carrinho
  const [cart, setCart] = useState<CartItem[]>([]);

  // Estado para indicar se o usuário é estudante
  const [isStudent, setIsStudent] = useState(false);

  // Estado para cupão de desconto
  const [coupon, setCoupon] = useState("");

  // Estado para armazenar a resposta da compra
  const [buyResponse, setBuyResponse] = useState<any>(null);

  // useEffect para carregar o carrinho do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // useEffect para atualizar o localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (produto: Product) => {
    setCart((prev) => {
      // Verifica se o produto já existe no carrinho
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        // Se existir, incrementa a quantidade
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Se não existir, adiciona como novo item
      return [...prev, { produto, quantity: 1 }];
    });
  };

  // Função para remover um produto do carrinho pelo id
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.produto.id !== id));
  };

  // Calcula o total do carrinho
  const total = cart.reduce(
    (sum, item) => sum + Number(item.produto.price) * item.quantity,
    0
  );

  // Função para finalizar a compra
  const buy = () => {
    // Cria uma lista de IDs repetidos conforme a quantidade
    const productIds = cart.flatMap((item) =>
      Array(item.quantity).fill(item.produto.id)
    );

    // Envia requisição POST para a API de compra
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
        // Se a resposta tiver texto, converte para JSON
        return text
          ? JSON.parse(text)
          : { message: "Compra realizada com sucesso!" };
      })
      .then((data) => {
        // Atualiza o estado da resposta e limpa o carrinho
        setBuyResponse(data);
        setCart([]);
      })
      .catch((err) => {
        console.error("Erro ao comprar:", err);
        setBuyResponse({ error: "Erro ao realizar a compra" });
      });
  };

  // Tratamento de erros e carregamento
  if (error) return <p className="text-black">{error.message}</p>;
  if (isLoading) return <p className="text-black">A descarregar dados…</p>;
  if (!data) return <p className="text-black">Não há produtos</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 text-black">
      {/* Container principal */}

      {/* Seção de produtos */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Produtos</h2>
        {/* Componente de filtro e exibição de produtos */}
        <FiltrarProdutos data={data} addToCart={addToCart} />
      </section>

      {/* Seção do carrinho */}
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
                {/* Card do produto dentro do carrinho */}
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

      {/* Seção de finalizar compra */}
      <section className="border rounded-xl p-6 space-y-4 bg-gray-50">
        <h2 className="text-2xl font-bold">Finalizar Compra</h2>

        {/* Checkbox de estudante */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
          Estudante DEISI
        </label>

        {/* Input para cupão de desconto */}
        <input
          type="text"
          placeholder="Cupão de desconto"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-64 text-black"
        />

        {/* Botão de compra */}
        <button
          onClick={buy}
          disabled={cart.length === 0}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Comprar
        </button>
      </section>

      {/* Seção que mostra a resposta da compra */}
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
