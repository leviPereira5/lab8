import caracteristicas from "../data/caracteristicas.json";
import Caracteristica from "../components/Caracteristica";

interface Caract {
  nome: string;
  descricao: string;
}

export default function CaracteristicasPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Características</h1>

      <div className="flex flex-wrap">
        {(caracteristicas as Caract[]).map((c, index) => (
          <Caracteristica
            key={index}
            nome={c.nome}
            descricao={c.descricao}
          />
        ))}
      </div>
    </main>
  );
}
