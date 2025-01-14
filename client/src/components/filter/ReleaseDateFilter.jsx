import { Button, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const initParams = (params) => {
  const release_date_from = params.get("release_date_from") || "";
  const release_date_to = params.get("release_date_to") || "";

  return [release_date_from, release_date_to];
}

export function ReleaseDateFilter() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [params, setParams] = useSearchParams();
  
  useEffect( () => {
      const [ release_date_from, release_date_to ] = initParams(params);
      reset({
        release_date_from,
        release_date_to
      });
  }, [params, reset]);

  const onSubmit = (data) => {
      const { release_date_from, release_date_to } = data;

      setParams(prevParams => {
          const newParams = new URLSearchParams(prevParams);
          newParams.set("release_date_from", release_date_from);
          
          newParams.set("release_date_to", release_date_to);
          return newParams;
      });
  }

  return (
      <div className="text-black">
          <Typography variant="h6" className="font-bold text-sm my-2 text-black">
            Release Date
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>    
            <div className="flex flex-col gap-4 w-100">
              <div className="flex flex-col">
                <label htmlFor="release_date_from" className="text-sm font-medium">From</label>
                <input
                  type="date"
                  id="release_date_from"
                  className="border border-gray-300 rounded-md px-2 py-1"
                  {...register("release_date_from")}
                />
                {errors.release_date_from && <span className="text-red-500 text-xs">{errors.release_date_from.message}</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="release_date_to" className="text-sm font-medium">To</label>
                <input
                  type="date"
                  id="release_date_to"
                  className="border border-gray-300 rounded-md px-2 py-1"
                  {...register("release_date_to")}
                />
                {errors.release_date_to && <span className="text-red-500 text-xs">{errors.release_date_to.message}</span>}
              </div>
            </div>
            <Button className="mt-3 mb-2" type="submit">Apply</Button>
          </form>
      </div>
  )
}