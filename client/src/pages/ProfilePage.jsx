import { Input, Typography } from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";
import UserInfo from "../components/profile/UserInfo";
import { FavoriteList } from "../components/MovieList/FavoriteList";

function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="">
      <UserInfo />

      <FavoriteList />
    </div>
    
  );
}

export default ProfilePage;
