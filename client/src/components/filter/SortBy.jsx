import { Typography } from "@material-tailwind/react";
import { CheckBoxList } from "./CheckBoxList";
import { useState } from "react";

const sortByList = [
  {key: "vote_average", value: "Rating"},
  {key: "popularity", value: "Popularity"},
  {key: "release_date", value: "Release Date"},
];

const initParams = (params) => {
  const sortBy = params.get("sort") || "vote_average";
  return [sortBy];
}

const setParam = (params, selectedItems, prefix="") => {
  if (selectedItems.length === 0) {
      params.delete("sort");
      return;
  }
  params.set("sort", prefix + selectedItems[0]);
}

export function SortBy() {
  const [prefix, setPrefix] = useState("");

  const handleSortChange = (e) => {
    setPrefix(e.target.value);
  }
  return (
    <>
      <div className="flex items-center gap-x-2 mt-2">
        <Typography color="blue-gray" className="text-sm font-bold w-[60px]">
          Sort by
        </Typography>

        <select
          onChange={handleSortChange}
          id="sortOrder"
          className="block w-32 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
        >
          <option value="">Ascending</option>
          <option value="-">Descending</option>
        </select>
      </div>

      <CheckBoxList
                    data={sortByList}
                    initParams={initParams}
                    setParam={setParam}
                    prefix={prefix}
      />
    </>
  );
}
