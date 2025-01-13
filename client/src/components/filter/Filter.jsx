import { RatingFilter } from "./RatingFilter";
import { ReleaseDateFilter } from "./ReleaseDateFilter";
import { SortBy } from "./SortBy";


export function Filter() {
  return (
    <div className="text-white border rounded-md p-4 max-h-[720px] max-w-[360px]">
        <h3 className="bg-blue-400 font-bold text-xl mb-1 rounded-md p-3">
          Search Results
        </h3>

        <RatingFilter />
        <hr />
        <ReleaseDateFilter />
        <hr />
        <SortBy />  

      </div>
  );
}
