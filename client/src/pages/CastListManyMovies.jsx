import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { getCreditFromMovieList} from "../services/MovieServices.js";
import Loading from "../components/Loading.jsx";
import { Typography } from "@material-tailwind/react";
import { CastCardLanscape } from "../components/CastCardLanscape.jsx";
import { set } from "react-hook-form";

export default function CastListManyMovies() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [castList, setCastList] = useState(null);
  const [crewList, setCrewList] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const messages = JSON.parse(localStorage.getItem("messages"));
        const message = messages.find((message) => message.id === id);
        setText(message.text);
        const response = await getCreditFromMovieList({movieIds: message.data});
        setCastList(response.data.casts);
        setCrewList(response.data.crew);
        

      } catch (error) {
        console.log(error.message);
        setError(error);
      }
    }
    fetchMovie();
  }, [id]);

  return (
    error ? <Typography variant="h4" className="mt-2 px-4">Cast List Not found</Typography> :
    <>
    <div className="mt-2 ml-4">
      <Typography variant="h4" className="text-gray-800 font-bold">
            {text}
      </Typography>

      <div className="flex flex-row flex-wrap gap-x-4 justify-around">
        <div className="flex flex-col flex-wrap gap-4 w-1/3 mt-2">
          <Typography variant="h6" className="text-gray-800 font-bold">
            {castList?.length} Cast
          </Typography>
          {castList?.map((cast) => (
            <div className="p-2" key={cast.id}>
              <CastCardLanscape cast={cast} flexCol />
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-wrap gap-4 w-1/3 mt-2">
          <Typography variant="h6" className="text-gray-800 font-bold">
            {crewList?.length} Crew
          </Typography>
          {crewList?.map((crew) => (
            <div className="p-2" key={crew.id}>
              <CastCardLanscape cast={crew} flexCol />
            </div>
          ))}
        </div>
      </div>

    </div>
      
    </>
  );
}
