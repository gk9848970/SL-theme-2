import React from 'react'
import Link from '../component/Link'
import * as api from '../Api';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import courseImage from '../images/Science.png'
function Course({ id }) {
    const [courses, setCourses] = useState([]);
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchCourseDetails(id)
            .then((data) => {
                if (data.status === "success") {
                    setCourses(data.response);
                    setDefImages(data.default_img);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if (status) {
        return (
            <div>
                <div className="msy-course-type w-90 ">
                    <div className="msy-course-type1">
                        <p className="heading text-center">All Courses</p>
                        <Row style={{ padding: "50px", width: "90%", margin: 'auto' }}>
                            {courses.map((course, index) => {
                                return (
                                    <Col lg={4} md={4} sm={6} style={{ marginBottom: "50px" }}>
                                        <div key={index} className="applyShadow card"  style={{height:'100%'}}>
                                            <img className="card-img-top " src={course.course_image.length > 0 ? (course.course_image) : (courseImage)} alt="Card" style={{width:'100%',height:'auto'}}/>
                                           <div className="card-body">
                                                <h5 className="card-title text-center">{course.course_name}</h5>
                                                <p style={{ marginBottom: "0" }} className="card-text" dangerouslySetInnerHTML={{ __html: course.course_detail.slice(0, 120) + "...." }} />

                                            </div>
                                            <Col lg={12} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                                <Link href={"courses/" + course.course_slug}>
                                                    <button className="btn costumButton btn-sm mb-2" style={{ padding: "5px 10px", textAlign: "center" }}>Read More</button>
                                                </Link>
                                            </Col>
                                        </div>

                                    </Col>
                                )
                            })}

                        </Row>
                    </div>

                </div>
            </div>
        )
    } else {
        return (<></>)
    }

}

export default Course
