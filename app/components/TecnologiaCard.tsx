interface TecnologiaCardProps {
  title: string;
  image: string;
}

export default function TecnologiaCard({
  title,
  image
}: TecnologiaCardProps) {
  return (
    <div className="
      w-40 h-44
      bg-slate-800 text-white
      rounded-lg p-4 m-2
      flex flex-col items-center justify-center
      hover:bg-slate-700 transition
    ">

      <img
        src={`/icons/${image}`}
        alt={title}
        className="w-16 h-16 object-contain mb-3"
      />

      <h3 className="text-sm font-semibold text-center">
        {title}
      </h3>

    </div>
  );
}
