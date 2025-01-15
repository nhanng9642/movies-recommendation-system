import { FavoriteList } from "../components/MovieList/FavoriteList";
import { RatingList } from "../components/MovieList/RatingList";
import { WatchingList } from "../components/MovieList/WatchingList";

function ProfilePage() {
  return (
    <div className="">
      <FavoriteList />
      <RatingList />
      <WatchingList />
    </div>
    
  );
}

export default ProfilePage;
