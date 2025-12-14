"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { Product } from "@/models/interfaces";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProdutoPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useSWR<Product>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    fetcher
  );

  if (isLoading) return <p>A carregar…</p>;
  if (error) return <p>Erro</p>;

  return (
    <div>
    <img src={data?.image} alt={data?.title} width={250}/>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
    </div>
  );
}
