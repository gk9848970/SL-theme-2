import React from 'react'
import * as api from './../Api';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ContactMap from './ContactMap';
import ReactGA from 'react-ga';
import 'react-toastify/dist/ReactToastify.css';
const ContactForm = ({ id }) => {

	const [instDetail, setInstDetail] = useState({});
	const [buttonState, setButtonState] = useState("Submit Now");
	const [config, setConfig] = useState({});
	const [configStatus, setConfigStatus] = useState(false);
	const [status, setStatus] = useState(false);
	const [defImages, setDefImages] = useState({});
	const [formData, updateFormData] = useState({
		first_name: "",
		last_name: " ",
		email: "",
		contact_no: "",
		// your_query: "null",
		// queryType: "Query Type"
	});


	useEffect(() => {
		//console.log(id);
		api.fetchInstituteDetails(id)
			.then((data) => {
				if (data.status === "Success") {
					setInstDetail(data.response);
					setStatus(true);
					setDefImages(data.default_img);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		api.fetchStatus(id)
			.then((data) => {
				if (data) {
					setConfig(data.config);
					setConfigStatus(true);
				}
			})
	}, []);
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	const handleChange = (e) => {
		updateFormData({
			...formData,

			// Trimming any whitespace
			[e.target.name]: e.target.value
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
		ReactGA.event({
            category:"Contact form submit",
            action:"Contact us form for student",
            label:"Contact deatails form for student"
        })
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
							// your_query: "null",
							// queryType: "null"
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


	return (
		<>
			<section id="contact-content" className="contact-content-section">
				<div className="container">
					<div className="text-center ">
						<h2>Contact Us for Anything</h2>
						<p style={{ color: 'grey', fontWeight: '450' }}>Our goal is to be as helpful as possible</p>
					</div>
					<div className="yl-contact-content-wrap">
						<div className="row justify-content-center">
						{(instDetail.Address1 && instDetail.Address1.length > 0) || (instDetail.Address1 && instDetail.Address1.length > 0) ? (
                                <div className="col-lg-4 col-md-6">
                                    <div className="yl-contact-content-inner text-center">
                                        <div className="yl-contact-content-icon">
                                            <i class="fa fa-location-arrow fa-5x" aria-hidden="true"></i>
                                        </div>
                                        <div className="yl-contact-content-text yl-headline">
                                            <h3>Address</h3>
                                           {instDetail.Address1 && instDetail.Address1.length > 0 ? ( <span><b>Head Office : </b>{instDetail.Address1}</span>):(null)}
                                            {instDetail.Address2 && instDetail.Address2.length > 0 ? (<span ><b>Branch Office : </b>{instDetail.Address2}</span>) : (null)}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {(instDetail.Email1 && instDetail.Email1.length > 0) || (instDetail.Email2 && instDetail.Email2.length > 0) ? (
                                <div className="col-lg-4 col-md-6">
                                    <div className="yl-contact-content-inner text-center">
                                        <div className="yl-contact-content-icon">
                                            <i class="fa fa-envelope fa-5x" aria-hidden="true"></i>
                                        </div>
                                        <div className="yl-contact-content-text yl-headline">
                                            <h3>Email Us</h3>
                                            {instDetail.Email1 && instDetail.Email1.length > 0 ? (<span><b>First : </b>{instDetail.Email1}</span>):(null)}
                                            {instDetail.Email2 && instDetail.Email2.length > 0 ? (<span><b>Second : </b>{instDetail.Email2}</span>):(null)}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {(instDetail.Contact1 && instDetail.Contact1.length) || (instDetail.Contact2 && instDetail.Contact2.length) > 0 ? (
                                <div className="col-lg-4 col-md-6">
                                    <div className="yl-contact-content-inner text-center">
                                        <div className="yl-contact-content-icon">
                                            <i class="header-icon fa fa-phone-square fa-5x" aria-hidden="true"></i>
                                        </div>
                                        <div className="yl-contact-content-text yl-headline">
                                            <h3>Phone No</h3>
                                            {instDetail.Contact1 && instDetail.Contact1.length > 0 ? (<span><b>Contact 1 : </b>+91{instDetail.Contact1}</span>):(null)}
                                            {instDetail.Contact2 && instDetail.Contact2.length > 0 ? (<span><b>Contact 2 : </b>+91{instDetail.Contact2}</span>):(null)}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
						</div>
					</div>
					<div className="yl-contact-form-wrap yl-headline">
						<h3>Write us a message</h3>
						<form className="yl-contact-form-area" action="#" method="post">
							<div className="yl-contact-form-input d-flex">
								<input className="mb-3" type="text" name="first_name" onChange={handleChange} placeholder="Your Name*" value={formData.first_name} />
								<input className="mb-3" type="email" name="email" onChange={handleChange} placeholder="Your email*" value={formData.email} />
								<input className="mb-3" type="text" name="contact_no" onChange={handleChange} placeholder="Phone" value={formData.contact_no} />
								{/* <select name="queryType" onChange={handleChange} class="contactQueryType " value={formData.queryType}>
									<option>Query Type</option>
									<option>Complaint</option>
									<option>Suggestion</option>
									<option>Feedback</option>
								</select> */}
							</div>

							{/* <textarea name="your_query" onChange={handleChange} placeholder="Write your message here*" value={formData.your_query} /> */}
							{buttonState === "Submit Now" ?
								(
									<button type="submit" onClick={handleSubmit}>{buttonState} <i className="fas fa-arrow-right" /></button>
								) : (
									<button type="submit" onClick={handleSubmit} className="btn disabled" disabled>{buttonState} <i className="fas fa-arrow-right" /></button>
								)}

						</form>
						<ToastContainer />
					</div>

				</div>
			</section>

		</>
	)
}
export default ContactForm;