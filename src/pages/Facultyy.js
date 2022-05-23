import React from 'react';
import * as api from '../Api';
import { useState, useEffect } from 'react';
import Link from '../component/Link'
import Modal from 'react-modal';
import { Container, Row, Col } from 'react-bootstrap'

function Facultyy({ id }) {
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
    };
    const closeModal = () => {
        setIsOpen(false);
    };


    if (status) {
        return (
            <div className="app container">
                <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
                    {status ? (
                        <>
                            <div >
                                <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                                    <img style={{ height: "250px", width: "250px",margin:"auto" }} className="card-img-top" src={faculty[arrIndex].url} alt="Card imagecap" />
                                    <div className="card-body">
                                        <h4 className=" text-center card-title">{faculty[arrIndex].faculty_name}</h4>
                                        <p className="card-text"></p>
                                        <p className="card-text text-muted" dangerouslySetInnerHTML={{ __html: faculty[arrIndex].faculty_detail }} />

                                    </div>

                                </div>

                            </div>
                        </>
                    ) : (null)}

                </Modal>


                <div className="heading">
                    <p>Faculty Details</p>
                </div>
                <div className="faculty row mt-5">
                    <Container>
                        <Row>
                            {faculty.map(function (instructor, index) {
                                return (
                                    <Col md={4}>
                                        <div style={{ width: "300px", margin: "auto" }} className="applyShadow card col-lg-4 mb-4">
                                            <img style={{ height: "250px" }} className="card-img-top" src={instructor.url} alt="Card imagecap" />
                                            <div className="card-body">
                                                <h4 className=" text-center card-title">{instructor.faculty_name.split(",")[0]}</h4>
                                                <p className="card-text"></p>
                                            </div>
                                            <Col lg={12} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <div style={{ width: "50%" }} className="text-center">
                                                    <button className="btn costumButton btn-sm mb-2" value={index} onClick={handleOpenClick}>Read More</button>
                                                </div>
                                            </Col>

                                        </div>

                                    </Col>
                                )
                            })}

                        </Row>

                    </Container>
                </div>
                <br />
            </div>
        )

    } else {
        return (<>
            <h1 className="text-center mt-5">No faculty</h1>
        </>)
    }

}

export default Facultyy
