import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as api from '../Api';
import { useState, useEffect } from 'react';

export default function FacultyDescription({id}){
    const [faculty, setFaculty] = useState({});
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    const { facultyName } = useParams();
    useEffect(() => {
        api.fetchFaculty(id, 100)
            .then((data) => {
                if (data.status === "success") {
                    (data.response).forEach((fac) => {
                        if (fac.faculty_name && fac.faculty_name ==facultyName ) {
                            setFaculty(fac);
                            setStatus(true);
                        }
                    })
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    var url = "https://www.takshilalearning.com/wp-content/uploads/2020/08/IBPS-PO-2020-Exam-Notification-Out.jpg";

    if (status === true) {
        return (
            <>
                <div style={{ marginTop: "10em" }} className="container">
                    <div className="text-center"><h1>Faculty</h1></div>
                    <div className="card mb-5" >
                        <img className="faculty_image card-img-top img-fluid img-thumbnail" style={{ height: "300px", width: "400px",display:'block' ,margin: "0 auto" }} src={faculty.url}  alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">{faculty.faculty_name}</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} dangerouslySetInnerHTML={{ __html: faculty.faculty_detail }} />
                            
                        </div>
                    </div>
                </div>
            </>
        )

    } else {
        return (
            <>
                <div style={{ marginTop: "10em" }} className="container">
                    <div className="card mb-5">
                        <img style={{ height: "300px" }} src={url} className="card-img-top img-fluid img-thumbnail" alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">No Faculty</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} />
                            <p className=" card-text"><small className="text-muted"></small></p>
                        </div>
                    </div>

                </div>
            </>
        )


    }

    // return(
    //     <>

    //         <h1>{faculty.faculty_name}</h1>
    //         <p dangerouslySetInnerHTML={{ __html: faculty.faculty_detail }}/>
    //     </>
    // )
}