/* eslint-disable react/prop-types */
import { ListBulletIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { useState } from "react";
import { addMovieToWatchList, getAllWatchList } from "../../services/WatchListService";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { AddWatchList } from "../AddWatchList";
import toast from "react-hot-toast";

export function ListButton({movieId}) {
  const [watchList, setWatchList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        const { data } = await getAllWatchList();
        setWatchList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchWatchList();
  }
  ,[]);

  const addToWatchList = async (listId) => { 
    toast.promise(
      addMovieToWatchList(listId, movieId), {
      loading: "Adding to watch list...",
      success: data => {
        setWatchList(list => {
          const watchList = list.map(watchList => {
            if (watchList._id === listId) {
              return {
                ...watchList,
                movies: [...watchList.movies, movieId]
              }
            }
            return watchList
          });
          return watchList
        });
        return data.message
      },
      error: err => err.message
    });
  }

  const addNewWatchList = (watchList) => {
    setWatchList(list => [...list, watchList]);
  }

  return (
    <>
      <Menu>  
        <MenuHandler>
          <button className="flex items-center justify-center bg-[#1E2A47] rounded-full p-[15px] hover:bg-[#253d60] transition-all duration-300">
            <ListBulletIcon className="h-[20px] text-white" />
          </button>
        </MenuHandler>

        <MenuList>
          {
            watchList.map((watchList) => (
              <MenuItem key={watchList._id}
                  className="font-medium" onClick={() => addToWatchList(watchList._id)}>
                  Add to {watchList.name} ({watchList.movies.length > 1 ? `${watchList.movies.length} movies` : `${watchList.movies.length} movie`})
              </MenuItem>
            ))
          }
          
          <MenuItem
              className="flex items-center text-gray-600 hover:text-blue-600 font-medium"
              onClick={() => setOpen(true)}>
                      <PlusIcon width={16} height={16}/>
                      <p className="ml-1">Create new watch List</p>
          </MenuItem>

        </MenuList>
      </Menu>

      <AddWatchList handleOpen={handleOpen} open={open} add={addNewWatchList}/>
    </>

  );
}

