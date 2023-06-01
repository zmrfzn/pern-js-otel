import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TutorialDataService from "../services/TutorialService";
import { Chip } from 'primereact/chip';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';

import { Toast } from 'primereact/toast';
 
const Tutorial = props => {
  const toast = useRef(null);
  //window.newrelic.setPageViewName('Tutorial->View');

  const { id }= useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    category: -1,
    description: "",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);


  const showSuccess = (msg) => {
    toast.current.show({severity:'success', summary: 'Success Message', detail:msg, life: 3000});
}
  const getTutorial = (id,categories) => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        setselectedCategory(categories.find(c => c.id == response.data.category))
        console.log(response.data);
        console.log(`selected category: ${categories}`);
      })
      .catch(e => {
        navigate(`/404/${id}`)
        console.log(e);
      });
  };
  const getCategories = async() => {
    const categories = await TutorialDataService.getCategories();
    setCategories(categories);
    console.log("categories set", categories);

    getTutorial(id,categories);
  }

  useEffect(() => {
    if (id) {
    //window.newrelic.setPageViewName("Tutorial->Edit");
    getCategories();
    }
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const onCategoryChange = (event) => {
    setselectedCategory(event.value);
    setCurrentTutorial({...currentTutorial, 'category':event.value.id})
  }

  const updatePublished = (tutorial,newStatus) => {
    var data = {
      id: tutorial.id,
      title: tutorial.title,
      description: tutorial.description,
      published: newStatus
    };

    TutorialDataService.update(tutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...tutorial, published: newStatus });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
        showSuccess("The tutorial was updated successfully!")
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    <Toast ref={toast} position="bottom-center"/>

      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
            <Dropdown value={selectedCategory} options={categories} onChange={onCategoryChange} optionLabel="category" name="category" placeholder="Category" />

            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ?
                <Chip label="Published" className="mr-2 mb-2 custom-chip published" />
                :
                <Chip label="Pending" className="mr-2 mb-2 custom-chip pending" />
                 }
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="btn btn-warning mr-2"
              onClick={() => updatePublished(currentTutorial,false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="btn btn-success mr-2"
              onClick={() => updatePublished(currentTutorial,true)}
            >
              Publish
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary mr-2"
            onClick={updateTutorial}
          >
            Update
          </button>
          <button className="btn btn-danger" onClick={deleteTutorial}>
            Delete
          </button>
          <button className="btn btn-outline-secondary btn-block mt-2">
          <Link to={"/"} className="nav-link">
              cancel
            </Link> 
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
