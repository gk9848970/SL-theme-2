import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as api from '../Api';
import { useState, useEffect } from 'react';
import './css/CourseDescription.css'
import Details from './Details';
import { Col, Nav, Row, Tab } from 'react-bootstrap'

export default function CourseDescription({id}){
   // const {id} = useParams();
    const [course, setCourse] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [status, setStatus] = useState(false);
    const {slug}=useParams();
    useEffect(() => {
        api.fetchCourseDetailsById(id,slug)
            .then((data) => {
                if (data.status === "success") {
                    setCourse(data.response[0]);
                    setStatus(true);
                    console.log(data.response);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        api.fetchCourseDetails(id)
            .then((data) => {
                if (data.status === "success") {
                    setAllCourses(data.response);
                    setStatus(true)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <>
           
            <div style={{marginTop:"10em"}} className="container mb-5">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="default">{course.course_name}</Nav.Link>
                                </Nav.Item>
                               {allCourses.map((newCourse,index)=>{
                                   return(
                                       <>
                                           <Nav.Item>
                                               <Nav.Link eventKey={index}>{newCourse.course_name}</Nav.Link>
                                           </Nav.Item>
                                       </>
                                   )
                               })}
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="default">
                                    <Details course={course} status={status} />
                                </Tab.Pane>
                                {allCourses.map((newCourse, index) => {
                                    return (
                                        <>
                                            <Tab.Pane eventKey={index}>
                                                <Details course={newCourse} status={status} />
                                            </Tab.Pane>
                                        </>
                                    )
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
           
        </>
    )

   

}