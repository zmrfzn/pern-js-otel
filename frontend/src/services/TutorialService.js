import http from "../http-common";
import { getCategoriesFromCache, isCategoriesValid, setCategories } from "./Util";

const getAll = () => {
  return http.get("/tutorials");
};

const getCategories = async () => {

  console.log(isCategoriesValid())
  let data;
  if(!await isCategoriesValid()) {
    const response = await http.get('/tutorials/categories')
    setCategories(response.data);
    return response.data;
  }
  else {
    data = await getCategoriesFromCache();
    return data;
  }
}

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const create = data => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

const findAllPublished = () => {
  return http.get(`/tutorials/published`)
}

const TutorialService = {
  getAll,
  get,
  getCategories,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findAllPublished
};

export default TutorialService;
