import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastDetail} from "../services/MovieServices.js";
import { Typography } from "@material-tailwind/react";
import Loading from "../components/Loading.jsx";

const base_url = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";
const defaultCastImage = import.meta.env.VITE_DEFAULT_ACTOR_IMAGE;

export function CastDetail() {
  const { id } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCast = async () => {
      try {
        const { data } = await getCastDetail(id);
        setCast(data);
      }
      catch (error) {
        console.error(error.message);
        setError(error);
      }
    };

    fetchCast();
  }, [id]);

  const poster = cast?.profile_path ? `${base_url}/${cast?.profile_path}` : defaultCastImage;
  if (!cast && !error) return <Loading />;
  return (
    error ? <Typography variant="h4" className="mt-2 px-4">Cast Not found</Typography> :
    <>
    <div
      className="w-full bg-cover bg-center justify-center flex-wrap"
    >
      <div className="flex w-full px-[40px] py-[30px] max-w-[1400px] mx-auto">
        <div className="flex items-center min-w-[300px] w-[300px] h-[450px]">
          <img
            src={poster}
            className="w-full max-w-[400px] rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center pl-[40px]">
          <div className="w-full mb-[24px] flex flex-wrap box-border gap-y-2 flex-col">
            <h2 className="w-full m-0 p-0 text-[36px] font-semibold leading-none">
              {cast.name}
            </h2>
            <p>Date of birth: {cast.birthday}</p>
            <p>Place of birth: {cast.place_of_birth}</p>
            <p>Known for: {cast.known_for_department}</p>
            <div>
              <h3 className="text-[20.8px] mb-[8px] font-semibold">
                Overview
              </h3>
              <p className="leading-6">
                {cast.biography}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}
