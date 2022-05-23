  import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as api from '../Api';
import { useState, useEffect } from 'react';
export default function CourseDescription({id}){
    const [course, setCourse] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [status, setStatus] = useState(false);
    const {slug}=useParams();
     useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchCourseDetailsById(id,slug)
            .then((data) => {
                if (data.status === "success") {
                    setCourse(data.response[0]);
                    setStatus(true);
                    // console.log(data.response);
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

// console.log(course);
    return (
        <>
    <div className=" container">
    
           
    <div style={{marginTop:"10em"}} className="row mb-5">
        <div style={{}} className="p-3 mr-5 col-lg-9 accordion" id="accordionExample">
      <div className="">
    <div style={{fontWeight: "600",fontSize: "48px"}} className="mb-5 text-center"><p>{course.course_name}</p></div>

        <div className="card">
          <div className="text-left card-heaCourse Detailsder" id="headingOne">
            <h2 className="mb-0">
            
               <button className="btn costumButton" style={{width: "100%"}}  type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                <h4>Course Details</h4>
              </button>
            </h2>
          </div>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
                <p dangerouslySetInnerHTML={{ __html: course.course_detail }} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-heaCourse Detailsder" id="headingThree">
            <h2 className="mb-0">
              <button className="btn costumButton" style={{width: "100%"}} type="button" data-toggle="collapse" data-target="#Overview" aria-expanded="false" aria-controls="collapseThree">
                <h4>Course Overview</h4>
              </button>
            </h2>
          </div>
          <div id="Overview" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div className="card-body">
            <p dangerouslySetInnerHTML={{ __html: course.course_overview}} />
              </div>
          </div>
        </div>


        <div className="card">
          <div className="card-heaCourse Detailsder" id="headingTwo">
            <h2 className="mb-0">
              <button className="btn costumButton" style={{width: "100%"}} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
               <h4>Course Eligibility</h4>
              </button>
            </h2>
          </div>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
          <p dangerouslySetInnerHTML={{ __html: course.course_eligibility }} />
          </div>
        </div>


        <div className="card">
          <div className="card-heaCourse Detailsder" id="headingThree">
            <h2 className="mb-0">
              <button className="btn costumButton"  style={{width: "100%"}} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <h4>Course Key Benefits</h4>
              </button>
            </h2>
          </div>
          <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div className="card-body">
            <p dangerouslySetInnerHTML={{ __html: course.course_key_benefits}} />
              </div>
          </div>
        </div>
      </div>

      </div>
      <div className="col-lg-3">
      <div className="">
        
          <div style={{paddingLeft: "50px",paddingTop: "10px"}} className="row ">
          <div className="col-lg-12 mb-3">
              <h3>More Courses</h3>
          </div>
        {
            allCourses.map((singleCourse,index)=>{
                return(<>
                <div hey={index} className="mb-2 col-lg-12 costumButton">
                <a style={{textDecoration:"none"}}href={"/courses/"+singleCourse.course_slug}>
                <h5>{singleCourse.course_name}</h5>
                </a>
                </div>
                </>)
            })
        }
            
        </div>
      </div>
      
      </div>


    </div>
    </div>
      </>
    )

}