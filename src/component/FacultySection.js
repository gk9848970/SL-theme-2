import React from 'react';
import * as api from '../Api';
import { useState, useEffect } from 'react';
import Link from '../component/Link'
import Modal from 'react-modal';
import { Container, Row, Col } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import defaultFaculty from '../images/faculty.png';
function FacultySection({ id }) {
    const [faculty, setFaculty] = useState([]);
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [arrIndex, setArrIndex] = React.useState('0');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchFaculty(id, 100)
            .then((data) => {
                if (data.status === "success") {
                    setFaculty(data.response);
                    setStatus(true);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const customStyles = {
        content: {
            zindex: '1000',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-10%',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            border: "0"
        },

    };
    const handleOpenClick = (e) => {
        e.preventDefault();
        var index = e.target.value
        setArrIndex(index);
        setIsOpen(true);
        ReactGA.event({
            category: "Faculty Button",
            action: " Faculty Rahul Roy",
            label: "Choose your faculty wisely"
        })
        ReactGA.event({
            category: "Faculty Button",
            action: " Faculty Parul Aggarwal",
            label: "Choose your faculty wisely"
        })
        ReactGA.event({
            category: "Faculty Button",
            action: " Faculty Vishwas Kapoor",
            label: "Choose your faculty wisely"
        })
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    // console.log(faculty);

    if (status) {
        return (
            <div className="app container">


                <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
                    {status ? (
                        <>
                            <div >
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <img style={{ height: "250px", width: "250px", margin: "auto" }} className="card-img-top" src={faculty[arrIndex].url && faculty[arrIndex].url.length > 0 ? (faculty[arrIndex].url) : (defImages)} alt="faculty-img" />
                                    <div className="card-body col-lg-8">
                                        <h4 className=" text-center card-title">{faculty[arrIndex].faculty_name}</h4>
                                        <p className="card-text"></p>
                                        <p className="card-text text-muted" dangerouslySetInnerHTML={{ __html: faculty[arrIndex].faculty_detail }} />

                                    </div>

                                </div>

                            </div>
                        </>
                    ) : (null)}

                </Modal>
                        {/* Faculty Slider Code (slider fucntionality) */}
                {/* <div
                    id="carouselExampleIndicators2"
                    class="carousel slide"
                    data-ride="carousel"
                >
                    <div class="carousel-inner">
                        <div
                            class="carousel-item active"
                            style={{ backgroundColor: "white" }}  >
                            <div className="row">
                                {faculty.slice(0, 3).map(function (instructor, index) {
                                    return (
                                        <Col>
                                            <div key={index} style={{ width: "300px", margin: "auto" }} className="applyShadow card col-lg-4 mb-4">
                                                <div style={{ padding: "auto" }} className="text-center">
                                                    <img style={{ height: "250px" }} className="card-img-top faculty_image" src={instructor.url} alt="Faculty" />
                                                </div>
                                                <div className="card-body">
                                                    <h4 className=" text-center card-title">{instructor.faculty_name}</h4>
                                                    <p className="card-text"></p>

                                                </div>
                                                <div style={{ width: "50%", margin: '0 auto' }} className="text-center">
                                                    <button className="btn costumButton btn-sm mb-2" value={index} onClick={handleOpenClick}>Read More</button>
                                                </div>
                                            </div>

                                        </Col>
                                    )
                                })}
                            </div>
                        </div>
                        {
                            faculty.slice(1).map((instructor, index) => {
                                return (
                                    <>
                                        <div
                                            class="carousel-item "
                                            style={{ backgroundColor: "white" }}  >
                                            <div className="row">
                                                {faculty.slice(3
                                                , 6).map(function (instructor, index) {
                                                    return (
                                                        <Col>
                                                            <div key={index} style={{ width: "300px", margin: "auto" }} className="applyShadow card col-lg-4 mb-4">
                                                                <div style={{ padding: "auto" }} className="text-center">
                                                                    <img style={{ height: "250px" }} className="card-img-top faculty_image" src={instructor.url} alt="Faculty" />
                                                                </div>
                                                                <div className="card-body">
                                                                    <h4 className=" text-center card-title">{instructor.faculty_name}</h4>
                                                                    <p className="card-text"></p>

                                                                </div>
                                                                <div style={{ width: "50%", margin: '0 auto' }} className="text-center">
                                                                    <button className="btn costumButton btn-sm mb-2" value={index} onClick={handleOpenClick}>Read More</button>
                                                                </div>
                                                            </div>

                                                        </Col>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="container">
                    <div className="row ">

                        <div className="sliderIcons">
                            <a
                                class="btn btn-primary mb-3 mr-1"
                                href="#carouselExampleIndicators2"
                                role="button"
                                data-slide="prev"
                            >
                                <FaArrowAltCircleLeft />

                            </a>
                            <a
                                class="btn btn-primary mb-3 "
                                href="#carouselExampleIndicators2"
                                role="button"
                                data-slide="next"
                            >
                                <FaArrowAltCircleRight />
                            </a>

                        </div>
                    </div>
                </div> */}


                <div className="faculty row mt-5">
                    <div className=" text-center msy-offerHead">
                        <h1 style={{ marginBottom: 20 }}>Faculty</h1>
                    </div>
                    <Container>
                        <Row>
                            {faculty.slice(0, 3).map(function (instructor, index) {
                                return (
                                    <Col>
                                        <div key={index} style={{ width: "300px", margin: "auto" }} className="applyShadow card col-lg-4 mb-4">
                                            <div style={{ padding: "auto" }} className="text-center">
                                                <img style={{ height: "250px" }} className="card-img-top faculty_image" src={instructor.url && instructor.url.length > 0 ? (instructor.url):(defaultFaculty)} alt="Faculty-img" />
                                            </div>
                                            <div className="card-body">
                                                <h4 className=" text-center card-title">{instructor.faculty_name}</h4>
                                                <p className="card-text"></p>

                                            </div>
                                            <div style={{ width: "50%", margin: '0 auto' }} className="text-center">
                                                <button className="btn costumButton btn-sm mb-2" value={index} onClick={handleOpenClick}>Read More</button>
                                            </div>
                                        </div>

                                    </Col>
                                )
                            })}
                        </Row>

                    </Container>
                    {
                        faculty.length > 4 ? <div className="col-lg-12 text-center  mt-3">
                            <Link href="/faculty">
                                <button className="btn costumButton btn-lg ">View All</button>
                            </Link>
                        </div> : null
                    }


                </div>
                <br />
            </div>
        )

    } else {
        return (<>
        </>)
    }

}

export default FacultySection
