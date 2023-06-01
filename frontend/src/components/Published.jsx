import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TutorialDataService from "../services/TutorialService";
import {mapCategories} from '../services/Util';

function Published() {
    // window.newrelic.setPageViewName('Published');

    const [tutorials, setTutorials] = useState(null);

    useEffect(() => {
        getAllPublishedTutorials();
    }, []);

    const updatePublished = (tutorial,newStatus) => {
        var data = {
          id: tutorial.id,
          title: tutorial.title,
          description: tutorial.description,
          published: newStatus
        };
    
        TutorialDataService.update(tutorial.id, data)
          .then(response => {
            getAllPublishedTutorials()
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

    const getAllPublishedTutorials = async () => {

        TutorialDataService.findAllPublished()
            .then((response) => {
                mapCategories(response.data).then(d => setTutorials(d));
                console.log(`data : ${JSON.stringify(response.data)}`)
            })
            .catch((err) => {
                console.error(err);
            })
    }
    return (
        <>
        <div className="list row">
            <div className="table-responsive">
                <table className="table table-inverse table-responsive table-bordered">
                    <thead className="thead-inverse thead-dark ">
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <tr key={index}>
                                    <td>{tutorial.title}</td>
                                    <td>{tutorial.category}</td>
                                    <td>{tutorial.published ? 'Published' : 'Pending'}</td>
                                    <td>
                                        <Link to={`/tutorials/${tutorial.id}`}><span className="btn btn-outline-info btn-link mr-1">Edit</span></Link> 
                                        <button
                                            className="btn btn-warning mr-2 mt-auto"
                                            onClick={() => updatePublished(tutorial, false)}
                                        >
                                            UnPublish
                                        </button>
                                    </td>
                                </tr>

                            ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Published