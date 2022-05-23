import React, { useState, useEffect } from 'react'
import './css/Career.css'
import * as api from './../Api';
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';
function CareerForm({ email }) {

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	const [buttonState, setButtonState] = useState("Submit Now");
	const [user, setuser] = useState({
		career_fname: "",
		career_lname: "",
		career_email: "",
		career_dob: "",
		career_phone1: "",
		career_phone2: "",
		career_location: "",
		career_qualification: "",
		career_status: "",
		clientMail: email,
		clientName: "Career Form"
	})
	function isValidform() {
		var flag = 1;
		for (var key in user) {
			if (user[key] === "") {
				flag = 0;
			}
		}
		if (selectedFile1 === "") {
			flag = 0;
		}
		return flag;
	}
	//console.log(gender);
	let namee, valuee;
	const handleSubmit = (e) => {

		namee = e.target.name;
		valuee = e.target.value;
		setuser({ ...user, [namee]: valuee });
	}


	const [selectedFile1, setSelectedFile1] = useState("");
	const [isFilePicked, setIsFilePicked] = useState(false);


	const changeHandler2 = (event) => {

		setSelectedFile1(event.target.files[0]);
		setIsFilePicked(true);
		// console.log(selectedFile1, 'akshat');
	};
	function isValidform() {
		var flag = 1;
		for (var key in user) {
			if (user[key] === "") {
				flag = 0;
			}
		}
		if (selectedFile1 === "") {
			flag = 0;
		}
		return flag;
	}
	const handleSubmission = (e) => {
		ReactGA.event({
            category:"Career form submit",
            action:"Career form for student",
            label:"Career form for student"
        })
		e.preventDefault();
		setButtonState("Submitting...");

		const formData = new FormData();
		formData.append('file', selectedFile1);
		// console.log(user);
		for (var key in user) {
			formData.append(key, user[key]);
		}
		if (isValidform() === 1) {
			api.sendCareerData(formData)
				.then((data) => {
					if (data.message === "Successfully Sent!") {
						toast.success("Your Form Submitted Successfully", {
							position: "bottom-right"
						});
						setButtonState("Submit Now");
					} else {
						console.log(data.message);
						toast.error("Form Submission Failed", {
							position: "bottom-right"
						});
						setButtonState("Submit Now");
					}
					reset();
				})
				.catch((err) => {
					toast.error("Form Submission Failed", {
						position: "bottom-right"
					});
					console.log(err);
					setButtonState("Submit Now");
				});
		}
		else {
			toast.error("Fill all the * marked fields and upload the required documents", {
				position: "bottom-right"
			});
			setButtonState("Submit Now");
		}

	};
	const reset = () => {
		const obj = {
		career_fname: "",
		career_lname: "",
		career_email: "",
		career_dob: "",
		career_phone1: "",
		career_phone2: "",
		career_location: "",
		career_qualification: "",
		career_status: "",
		clientMail: email,
		clientName: "Career Form"
		}
		setuser(obj)
		document.getElementById("file_0").value = "";
		setSelectedFile1("");
		setIsFilePicked(false);
	}
	return (
		<div className="container mt-5 mb-5">
			<div className="text-center" style={{fontFamily:'Georgia, Times New Roman, Times, serif',marginTop:'100px'}}>
				<h2>Career Form</h2>
				<h4 style={{color:'grey', fontWeight:'450'}}>Fill This Career Form</h4>
			</div>			
			<div className="container formm boox" style={{backgroundColor:'white',borderRadius:'15px'}}>
				<div style={{ backgroundColor: "" }} className="p-2">
					<form encType="multipart/form-data" noValidate className="ng-untouched ng-pristine ng-invalid">
						<div className="row">
							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><label className="control-label">First Name<i className="fa fa-star starred" /></label>
									<input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="fname" name="career_fname" value={user.career_fname} required type="text" onChange={handleSubmit} /></div>
							</div>
							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><label className="control-label">Last Name <i className="fa fa-star starred" /></label><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="fname" name="career_lname" value={user.career_lname} required type="text" onChange={handleSubmit} /></div>
							</div>
							<div className="clearfix" />
							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><br /><label className="control-label">DOB</label>
									<div className="dateDropdown"><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="date" name="career_dob" value={user.career_dob} type="date" onChange={handleSubmit} /></div>
								</div>
							</div>
							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><br /><label className="control-label">Email<i className="fa fa-star starred" /></label>
									<input className="form-control form-item ng-untouched ng-pristine ng-invalid" name="career_email" value={user.career_email} required type="email" onChange={handleSubmit} /></div>
							</div>
							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><br />
									<label className="control-label">Phone No 1<i className="fa fa-star starred" /></label>
									<input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="career_phone1" value={user.career_phone1} onChange={handleSubmit} name="career_phone1" required type="text" />
								</div>
							</div>
							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><br /><label className="control-label">Phone No 2<i className="fa fa-star starred" /></label>
									<input className="form-control form-item ng-untouched ng-pristine ng-invalid" name="career_phone2" value={user.career_phone2} onChange={handleSubmit} required type="text" /></div>
							</div>



							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><br />
									<label htmlFor="inputState">Educational Qualification<i className="fa fa-star starred" /></label>
									<input type="text" className="form-control shadow-none" list="qualification" name="career_qualification" value={user.career_qualification} required="required" onChange={handleSubmit} />
									<datalist id="qualification">
										<option value="Under Graduation"></option>
										<option value="Graduation"></option>
										<option value="Post Graduation"></option>
										<option value="Others"></option>
									</datalist>

								</div>
							</div>


							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><br />
									<label htmlFor="inputState">Current Status<i className="fa fa-star starred" /></label>
									<input type="text" className="form-control shadow-none" list="career_status" name="career_status" value={user.career_status} onChange={handleSubmit} required />
									<datalist id="career_status">
										<option value="Working"></option>
										<option value="Self-Employed"></option>
										<option value="UnEmployed"></option>
									</datalist>

								</div>
							</div>


							<div className="col-sm-6 col-xs-12">
								<div className="form-group"><br />
									<label className="control-label">Location<i className="fa fa-star starred" /></label>
									<input className="form-control form-item ng-untouched ng-pristine ng-invalid" name="career_location" value={user.career_location} onChange={handleSubmit} />
								</div>
							</div>
							<div className="col-sm-6 col-xs-12">
								<div className="form-group "><br />
									<label className="control-label">Upload Resume<i className="fa fa-star starred" /></label><br />
									<input id='file_0' type="file" name="file" onChange={changeHandler2} className="uploadButton costumButton" />
				
								</div>

							</div>
							<div className="text-center col-lg-12">
								<br />
								<div className="text-center costumButton" style={{border:'1px solid grey',borderRadius:'10px',height:'30px',width:"43%"}}>
									<a type="reset" style={{fontWeight:'500',fontSize:'20px',color:'white'}} onClick={handleSubmission}>{buttonState}<i className="fa fa-arrow-circle-up" /></a>
								</div>
							</div>

						</div>
					</form>
					<ToastContainer />
				</div>
			</div>
		</div>
	)
}

export default CareerForm
