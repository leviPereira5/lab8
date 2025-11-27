import tecnologias from '@/app/data/tecnologias.json';

export default function Page() {
  const lista = JSON.parse(JSON.stringify(tecnologias));

  return (
    <>
      <h2>Tecnologias Exploradas</h2>

      {lista.map((tec: any, i: number) => (
        <div key={i}>
          <h3>{tec.title}</h3>
          <img 
            src={`/tecnologias/${tec.image}`} 
            alt={tec.title} 
            width={80} 
            height={80} 
          />
          <p>{tec.description}</p>
          <p>Rating: {tec.rating}</p>
        </div>
      ))}
    </>
  );
}
