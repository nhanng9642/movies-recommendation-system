import { CheckBoxList } from "./CheckBoxList";

const ratingList = [
  {key: "0", value: "All"},
  {key: "1", value: "Above 9"},
  {key: "2", value: "From 7 to 9"},
  {key: "3", value: "From 5 to 7"},
  {key: "4", value: "Below 5"},
];

const initParams = (params) => {
  const sortBy = params.get("rating_option") || "0";
  return [sortBy];
}

const setParam = (params, selectedItems) => {
  if (selectedItems.length === 0) {
      params.delete("rating_option");
      return;
  }
  params.set("rating_option", selectedItems[0]);
}

export function RatingFilter() {
  return (
    <CheckBoxList label="Rating"
                  data={ratingList}
                  initParams={initParams}
                  setParam={setParam}
    />
  );
}
