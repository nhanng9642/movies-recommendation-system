/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const base_url = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";
const defaut_url = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

export const CastCardLanscape = ({ cast }) => {
  const { character, name, profile_path, known_for_department } = cast;
  const poster = profile_path ? `${base_url}/${profile_path}` : defaut_url;
  
  return (
    <Card className="max-w-lg bg-white shadow-lg rounded-lg overflow-hidden flex h-full">
    <Link to={`/cast/${cast.id}`} className="flex flex-col md:flex-row w-full">
      <img
        className="w-16 object-cover"
        src={poster}
        alt={name}
      />
      
      <CardBody className="p-4 flex-1 flex flex-col justify-center">
        {character && <Typography variant="h6" className="text-gray-800 font-bold">
          {character}
        </Typography>}
        {name && <Typography variant="h6" className="text-gray-700">
          {name}
        </Typography>}
        {known_for_department && <Typography variant="h6" className="text-gray-500">
          {known_for_department}
        </Typography>}
      </CardBody>
    </Link>
  </Card>
  
  );
};
