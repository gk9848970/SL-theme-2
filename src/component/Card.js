import React from 'react'
import './css/Course.css';
import Link from './Link'
import * as api from '../Api';
import { useState, useEffect } from 'react';
function Card({id}) {


    const [courses, setCourses] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchCourseDetails(id)
            .then((data) => {
                if (data.status === "success") {
                    setCourses(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    var url = "https://i.ibb.co/GJwwR0z/course2.jpg";
    if(status){
        return (
            <div>
                <div className="msy-course-type w-90 ">
                    <div className="msy-course-type1">
                    <h1  className="text-center">All Courses</h1>

                        <div className="container">
                        
                        <div className="row">
                            {courses.map((course, index) => {
                                return (
                                    <>
                                        <div className="card col-lg-3 col-md-6 mb-4">

                                            <img className="card-img-top " src={url} alt="Card imagecap" />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{course.course_name}</h5>
                                                <p className="card-text" dangerouslySetInnerHTML={{ __html: course.course_detail.slice(0, 200) }} />

                                            </div>
                                            <Link href={"courses/" + course.course_slug}>
                                                <button className="btn btn-primary btn-sm mb-2">Read More</button>
                                            </Link>
                                        </div>
                                    </>
                                )
                            })}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    } else {
        return (<></>)
    }
  
}

export default Card



