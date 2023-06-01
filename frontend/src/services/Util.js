/* eslint-disable array-callback-return */

import TutorialService from "./TutorialService";

const mapCategories = async (tutorials) => {
  let categories = await getCategoriesFromCache()

  const updatedTutorials = tutorials.map((f) => {
    if (!!f.category) {
      let id = f.category;
      f.category = categories.find((c) => c.id == id)?.category;
    }
    return f;
  });

  return updatedTutorials;
};

const setCategories = async (data) => {
  console.log(`setting cache`);

  const expiry = Date.now() + 9600;
  const cache = {
    "expiry": expiry,
    "data": JSON.stringify(data)
  }
  localStorage.setItem('categories', JSON.stringify(cache));

}
const getCategoriesFromCache = async () => {
  console.log(`getting cache`);

  const item = JSON.parse(localStorage.getItem('categories'));
  return JSON.parse(item.data);
}

const isCategoriesValid = async () => {
  const item = JSON.parse(localStorage.getItem('categories'));

  if(!!item && Date.now() > item.expiry ) {
    console.log(`invalid ${item}`);
    return true;
  }
  else { 
    console.log(`valid ${item}`);
    return false;
  }
} 


export {
  mapCategories,
  setCategories,
  getCategoriesFromCache,
  isCategoriesValid
} ;