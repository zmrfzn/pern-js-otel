import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Dropdown } from 'primereact/dropdown';
import { Link } from "react-router-dom";

const AddTutorial = () => {
  // window.newrelic.setPageViewName('Add New');

  const initialTutorialState = {
    id: null,
    title: "",
    category: -1,
    description: "",
    published: false,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);

  useEffect(() => {
    TutorialDataService.getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((e) => console.error(e.message));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const onCategoryChange = (event) => {
    setselectedCategory(event.value);
    setTutorial({...tutorial, 'category':event.value.id})
  }

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category
    };
    
    TutorialDataService.create(data)
      .then((response) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="category">Categories</label> */}
            <Dropdown value={selectedCategory} options={categories} onChange={onCategoryChange} optionLabel="category" name="category" placeholder="Categories" />

            </div>


          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success btn-block">
            Submit
          </button>

          <button className="btn btn-outline-secondary btn-block mt-2">
          <Link to={"/"} className="nav-link">
              cancel
            </Link> 
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
