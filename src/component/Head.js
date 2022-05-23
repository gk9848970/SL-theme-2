import React from 'react';
import * as api from '../Api';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';

function Head({ id }) {
    // const classes = useStyles();
    const [instDetail, setInstDetail] = useState({});
    const [buttonState, setButtonState] = useState("Submit Now");
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    const [sliders, setSliders] = useState([]);
    const [formData, updateFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
    });
    useEffect(() => {
        api.fetchInstituteDetails(id)
            .then((data) => {
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        api.fetchSlider(id)
            .then((data) => {
                if (data.status === "Success") {
                    setSliders(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };
    function isValidform() {
		var flag = 1;
		for (var key in formData) {
			if (formData[key] === "") {
				flag = 0;
			}
		}
		if (formData.queryType === "Query Type") {
			flag = 0;
		}
		return flag;
	}

	const handleSubmit = (e) => {
		setButtonState("Submitting...")
		e.preventDefault();
		const data = new FormData();
		for (var key in formData) {
			data.append(key, formData[key]);
		}
		// console.log(formData);
		if (isValidform() === 1) {
			api.sendContactData(id, formData)
				.then((data) => {
					if (data.flag === 1) {
						toast.success("Your Form Submitted Successfully", {
							position: "bottom-right"
						});
						setButtonState("Submit Now");
						updateFormData({
							first_name: "",
							last_name: "null",
							email: "",
							contact_no: "",
							your_query: "null",
							queryType: "null"
						})
					} else {
						console.log(data);
						toast.error("Form Submission Failed", {
							position: "bottom-right"
						});
						setButtonState("Submit Now")
					}
				})
				.catch((err) => {
					toast.error("Form Submission Failed", {
						position: "bottom-right",
					});
					console.log(err);
					setButtonState("Submit Now")
				});
		} else {
			toast.error("Fill all the Required Fields", {
				position: "bottom-right"
			});
			setButtonState("Submit Now")
		}

	};

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(formData);
    //     alert("Submitted Successfully")
    // };
    
    return (
        <div className="container-fluid msy-container text-center">
            <div className="jumbotron msy-jumbotron d-flex align-items-center">
                <div className="container d-flex flex-wrap justify-content-around ">
                    <Container>
                        <Row>

                            <Col lg={8} className="brand_name">
                                <div className="msy-quotes-head ">
                                    <h1 id="msy-quotes-head">{instDetail['web-title']}</h1>
                                </div>
                                <div className="msy-quotes-para">
                                    <p>
                                        {instDetail['web-description']}
                                    </p>
                                </div>
                            </Col>
                            <Col className="head_form_container" lg={4}>
                                <h3 >Apply for Bright Future</h3>
                                <Form>
                                    <Form.Group controlId="formBasicEmail" className="head_form">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name"  onClick={handleChange} value={formData.first_name}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail" className="head_form">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="Email" placeholder="Enter Email" onClick={handleChange}  value={formData.email}  />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail" className="head_form">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Phone"  onClick={handleChange} value={formData.contact_no} />
                                    </Form.Group>

                                    {buttonState === "Submit Now" ? (<Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>):(
                                        <Button variant="primary" type="submit" onClick={handleSubmit} disabled>
                                        Submit
                                        </Button>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>

    )
}

export default Head;
