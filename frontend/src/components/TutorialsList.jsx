import React, { useState, useEffect, useRef } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";
import { Paginator } from 'primereact/paginator';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';

import { Toast } from 'primereact/toast';
import {mapCategories} from "../services/Util";



const TutorialsList = () => {
  // window.newrelic.setPageViewName('Tutorials');

  const [tutorials, setTutorials] = useState([]);
  const [pagedTutorials, setPagedTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  // pagination
  const [pageStart, setPageStart] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const toast = useRef(null)
  const onBasicPageChange = (event) => {
      console.log('here',new Date());
      // console.log(pagedTutorials.length)
      // console.log(tutorials.length)
      console.log('change:',`first:${event.first},rows:${event.rows}`);
      
      setPageStart(event.first);
      setPageSize(event.rows);
      console.log(pageSize)
      resetSelectedItem();
      setPagedTutorials(tutorials.slice(event.first,event.first+event.rows))
  };

  useEffect(() => {
    
    retrieveTutorials();
    console.log('useEffect()');
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = async () => {
    await TutorialDataService.getCategories();
    TutorialDataService.getAll()
      .then(response => {
        mapCategories(response.data).then(data => {
          setPagedTutorials(data.slice(pageStart,pageSize))
          setTutorials(data);
          console.log('length',tutorials.length);
        })
      })
      .catch(e => {
        console.log(e);
      })
  };

  const resetSelectedItem = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  }

  const refreshList = () => {
    retrieveTutorials();
    resetSelectedItem();
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
        showError(e.message)
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const showError = (msg) => {
    toast.current.show({severity:'error', summary: 'Error', detail:msg, life: 3000});
}

  return (
    <div className="mx-auto">
    <Toast ref={toast} position="bottom-center"/>
      <div className="row">
        <div className="col-md-5">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <h4>Tutorials List</h4>
          <ul className="list-group">
            {pagedTutorials &&
              pagedTutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
          <Paginator
            first={pageStart}
            rows={pageSize}
            totalRecords={tutorials.length}
            rowsPerPageOptions={tutorials.length > 15 ? [5, 10,15,20] :[5,10]}
            onPageChange={onBasicPageChange}
          ></Paginator>
          <button
            className="m-3 btn btn-sm btn-danger" title="Will fail"
            onClick={removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <Divider layout="vertical" />
        <div className="col-md-5">
          {currentTutorial ? (
            <>  <h4>Tutorial</h4>
            <Card title={currentTutorial.title}>
            <div>
              <p>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </p>
              <div>
              <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentTutorial.category}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ?
                <Chip label="Published" className="mr-2 mb-2 custom-chip published" />
                :
                <Chip label="Pending" className="mr-2 mb-2 custom-chip pending" />
                 }
              </div>
              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="btn btn-info"
              >
                Edit
              </Link>
            </div>
            </Card></>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialsList;
