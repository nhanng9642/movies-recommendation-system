/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  Typography,
  DialogFooter,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { createNewWatchList } from "../services/WatchListService";

export function AddWatchList({handleOpen, open, add}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const watchList = await createNewWatchList(data);
    if (add && watchList) 
      add(watchList.data);
    handleOpen();
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex flex-col items-start">
          <Typography className="mb-1" variant="h4">
            Create new watch list
          </Typography>
        </DialogHeader>
        <form
            className=""
            onSubmit={handleSubmit(onSubmit)}>
            <DialogBody>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Watch list name"
                  required
                />
              </div>

              <div className="mt-4 md:mt-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={7}
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
          </DialogBody>

          <DialogFooter className="space-x-2">
            <Button variant="gradient" type="submit" color="gray" disabled={isSubmitting}>
              Create watch list
            </Button>
          </DialogFooter>
          </form>
      </Dialog>
    </>
  );
}