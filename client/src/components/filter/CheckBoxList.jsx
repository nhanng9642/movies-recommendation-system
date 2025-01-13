/* eslint-disable react/prop-types */
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function CheckBoxList({ data, multichoice = false, label = "",
                              initParams, setParam, prefix }) {
  const [params, setParams] = useSearchParams();
  const initialSelectedItems = initParams(params);
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  const handleChange = (event) => {
      window.scrollTo(0, 0);
      const { value, checked } = event.target;
      setSelectedItems(prev => {
          let selectedItems;
          if (multichoice) {
              selectedItems = checked ? [...prev, value] : prev.filter(item => item !== value);
          } else {
              selectedItems = [value];
          }
          setParams(prevParams => {
              const newParams = new URLSearchParams(prevParams);
              setParam(newParams, selectedItems, prefix);
              return newParams;
          });
          return selectedItems;
      });
  };

  useEffect(() => {
    if (prefix != undefined) {
        setParams(prevParams => {
          const newParams = new URLSearchParams(prevParams);
          setParam(newParams, selectedItems, prefix);
          return newParams;
      });
    }
  }, [prefix, selectedItems, setParam, setParams])

  return (
      <>
          {label && <Typography color="blue-gray" className="text-sm font-bold mt-2">
              {label}
          </Typography>}
          <List>
              {data.map(({ key, value }, index) => (
                  <ListItem key={index} className="p-0">
                      <label
                          htmlFor={`vertical-list-${key}`}
                          className="flex w-full cursor-pointer items-center px-3 py-1"
                      >
                          <ListItemPrefix className="mr-3">
                              <Checkbox
                                  id={`vertical-list-${key}`}
                                  name="vertical-list-checkbox"
                                  ripple={false}
                                  value={key}
                                  className="hover:before:opacity-0"
                                  containerProps={{
                                      className: "p-0",
                                  }}
                                  onChange={handleChange}
                                  checked={selectedItems.includes(String(key))}
                              />
                          </ListItemPrefix>

                          <Typography color="blue-gray" className="text-sm">
                              {value || "Unknown"}
                          </Typography>
                      </label>
                  </ListItem>
              ))}
          </List>
      </>
      
  );
}