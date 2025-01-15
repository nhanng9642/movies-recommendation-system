/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AddWatchList } from "../AddWatchList";
import { PlusIcon } from "@heroicons/react/16/solid";
import { getAllWatchList } from "../../services/WatchListService";
import { Link } from "react-router-dom";

export function WatchingList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [watchingList, setWatchingList] = useState([]);

  useEffect(() => {
    const fetchWatchList = async () => {
      const response = await getAllWatchList()
      setWatchingList(response.data);
    };

    fetchWatchList();
  }, [])

  const addWatchList = (watchList) => {
    setWatchingList([...watchingList, watchList]);
  }

  return (
    <div className="mx-6 my-4">
      <div className="flex justify-between">
        <p className="text-2xl font-bold mr-4">My Watching List</p>
        <button 
          className="flex items-center text-gray-600 hover:text-blue-600 font-medium"
          onClick={() => setOpen(true)}>
                  <PlusIcon width={32} height={32}/>
        </button>
      </div>

      {
        watchingList.map((watchList) => {
          const length = watchList?.movies?.length || 0;
          return (<Link key={watchList._id} 
              className="hover:text-blue-600"
              to={`/profile/watch-list/${watchList._id}`}>
            <div className="flex justify-between my-4">
              <p className="text-lg font-medium">{watchList.name} ({length > 1 ? `${length} movies` : `${length} movie`})</p>
            </div>
          </Link>)
          }
        )
      }

      {watchingList?.length === 0 && <div className="mt-4"> Your watching list is currently empty. </div>}

      <AddWatchList handleOpen={handleOpen} open={open} add={addWatchList}/>
    </div>
  );
}
