"use client";

import { useState, useEffect } from "react";
import { Product } from "@/models/interfaces";
import PesquisarProdutos from "./PesquisaProduto";

export default function FiltrarProdutos({ data }: { data: Product[] }) {
    const [pesquisa, setPesquisa] = useState("");
    const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(data);

    useEffect(() => {

        if (!data) {
            return;
        }

        const resultado = data.filter((produto) =>
            produto.title.toLowerCase().includes(pesquisa.toLowerCase())
        );

        setProdutosFiltrados(resultado);

    }, [pesquisa, data]);

    return (
        <div>
            <PesquisarProdutos pesquisa={pesquisa} setPesquisa={setPesquisa} />

            {produtosFiltrados.map((produto) => (
                <div key={produto.id}>
                    <p>{produto.id} - {produto.title}</p>
                    <img
                        src={`https://deisishop.pythonanywhere.com${produto.image}`}
                        alt={produto.title}
                        width={120}
                    />
                    <p>{produto.description}</p>
                    <p>Rating: {produto.rating.rate} ({produto.rating.count})</p>
                </div>
            ))}
        </div>
    );
}
