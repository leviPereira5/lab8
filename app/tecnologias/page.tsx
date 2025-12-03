import TecnologiaCard from "../components/TecnologiaCard";
import tecnologias from "../data/tecnologias.json";

interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiasPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Tecnologias
      </h1>

      <div className="flex flex-wrap">
        {(tecnologias as Tecnologia[]).map(
          (tec: Tecnologia, index: number) => (
            <TecnologiaCard
              key={index}
              title={tec.title}
              image={tec.image}
            />
          )
        )}
      </div>
    </main>
  );
}
