/* eslint-disable react/prop-types */
import Loading from "../Loading";

export function TrailerList( {trailers, loading}) {
  return (
    <div className="mx-4 my-4">
  {loading && <Loading />}
  {!loading && (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {trailers.map((trailer) => (
        trailer && (
          <div key={trailer.id} className="m-[6px] group">
            <div className="relative rounded-lg border border-gray-300">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name || "Trailer"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full group-hover:scale-105 transition-transform duration-300 rounded-lg object-cover"
                />
              </div>
            </div>
            <p className="mt-1 text-base font-bold text-center ">{trailer.title}</p>
          </div>
        )
      ))}
    </div>
  )}
</div>

);;
}
