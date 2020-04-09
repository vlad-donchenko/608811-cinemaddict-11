import {FILTERS} from "../const";

const getMenu = () => {
  return FILTERS.map((title) => (
    {
      title,
      count: Math.floor(Math.random() * 10),
    }
  ));
};

export {getMenu};
