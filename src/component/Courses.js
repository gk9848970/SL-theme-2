import React from 'react'
import Link from "./Link";
import * as api from '../Api';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import ReactGA from 'react-ga';
import courseImage from '../images/Science.png'
function Courses({ id }) {

    const [courses, setCourses] = useState([]);
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    const setCourse = () =>{
        ReactGA.event({
            category:"Button",
            action:"Courses Button Clicked",
            label:"User save there course list by clicking CLICK ME! button"
        })
    };

    const setView = () =>{
        ReactGA.event({
            category:"Button",
            action:"courses view Button Clicked",
            label:"User save there view list by clicking CLICK ME! button"
        })
    };
    useEffect(() => {
        api.fetchTopCourses(id, 10)
            .then((data) => {
                if (data.status === "success") {
                    setCourses(data.response);
                    setStatus(true);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (status) {
        return (
            <div>
                <div className="msy-course-type ">
                    <div className="msy-course-type1 ">
                        <Container style={{ margin: "auto" }}>
                            <div className="msy-offerHead">
                                <h1 className="text-center ">Courses</h1>
                            </div>
                            <Row>
                                {courses.slice(0, 3).map((course, index) => {
                                    return (
                                        <Col lg={4}>
                                            <div key={index} style={{ width: "320px", margin: "auto" }} className="applyShadow card col-lg-4 col-md-6 mb-4">

                                                <img className="card-img-top " src={course.course_image && course.course_image.length > 0 ? (course.course_image) : (courseImage)} alt="Card" />
                                                <div className="card-body">
                                                    <h5 className="card-title text-center">{course.course_name}</h5>
                                                    <p style={{ marginBottom: "0" }} className="card-text" dangerouslySetInnerHTML={{ __html: course.course_detail.slice(0, 120) + "...." }} />

                                                </div>
                                                <Col lg={12} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                                    <Link href={"courses/" + course.course_slug}>
                                                        <button className="btn costumButton btn-sm mb-2" style={{ padding: "5px 10px", textAlign: "center" }} onClick={() => setCourse(false)}>Read More</button>
                                                    </Link>
                                                </Col>
                                            </div>

                                        </Col>
                                    )
                                })}

                            </Row>
                        </Container>
                        {courses.length > 3 ? <div className="msy-viewallbtn-cont w-100  d-flex justify-content-center">
                            <Link href="/course">
                                <button className="btn costumButton msy-viewall" onClick={() =>  setView(false)}>View All</button>
                            </Link>
                        </div> : null}


                        
                    </div>
                </div>
               
            </div>
        )
    } else {
        return (<></>)
    }

}

export default Courses
