import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as api from './../Api';
import ReactGA from 'react-ga';
function FranchiseForm({email, clientName}) {
    const [user, setuser] = useState({
        name_franchise: "",
        dlastname_franchise: "",
        dob_franchise: "",
        email_franchise: "",
        phone1_franchise: "",
        phone2_franchise: "",
        qualification_contact: "",
        status_contact: "",
        location_contact: "",
        investment_contact: "",
        enquiry_contact: "",
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [buttonState, setButtonState] = useState("Submit Now");
    let namee, valuee;
    const handleSubmit = (e) => {

        namee = e.target.name;
        valuee = e.target.value;
        setuser({ ...user, [namee]: valuee });
        ReactGA.event({
            category:"Franchise form submit",
            action:"Franchise form for student",
            label:"Franchise form for student"
        })
    }
    function isValidform() {
        var flag = 1;
        for (var key in user) {
            if (user[key] === "") {
                flag = 0;
            }
        }
        return flag;
    }
    const clearForm = () => {
        let obj = {
            name_franchise: "",
            dlastname_franchise: "",
            dob_franchise: "",
            email_franchise: "",
            phone1_franchise: "",
            phone2_franchise: "",
            qualification_contact: "",
            status_contact: "",
            location_contact: "",
            investment_contact: "",
            enquiry_contact: "",
        }
        setuser(obj)
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        setButtonState("Submitting...")
        // console.log(user);
        user.clientName = "Franchise Form"
        user.clientMail = email
        if (isValidform()) {
            api.sendFranchiseData(user)
                .then((data) => {
                    if (data.message === "Successfully Sent!") {
                        toast.success("Your Form Submitted Successfully", {
                            position: "bottom-right"
                        });
                        clearForm();
                        setButtonState("Submit Now");
                    } else {
                        // console.log(data);
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
            toast.error("Fill all the * marked fields", {
                position: "bottom-right"
            });
            setButtonState("Submit Now")
        }

    };

    return (
        <div className="container mt-5 mb-5 ">
            <div className="text-center" style={{fontFamily:'Georgia, Times New Roman, Times, serif',marginTop:'100px'}}>
                
                <h2>Franchise Form</h2>
                <h4 style={{color:'grey',fontWeight:'450'}}>Fill This Franchise Form</h4>
            </div>
            <br />
            <div className="container formm boox" style={{backgroundColor:'white',borderRadius:'15px'}}>
                <div style={{ backgroundColor: "" }} className="p-2">
                    <form encType="multipart/form-data" noValidate className=" m-4 ng-untouched ng-pristine ng-invalid">
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><label className="control-label">First Name<i className="fa fa-star starred" /></label>
                                    <input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="name_franchise" name="name_franchise" value={user.name_franchise} required type="text" onChange={handleSubmit} /></div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><label className="control-label">Last Name <i className="fa fa-star starred" /></label>
                                    <input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="dlastname_franchise" name="dlastname_franchise" value={user.dlastname_franchise} required type="text" onChange={handleSubmit} /></div>
                            </div>
                            <div className="clearfix" />
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><br /><label className="control-label">DOB <i className="fa fa-star starred" /></label>
                                    <div className="dateDropdown"><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="dob_franchise" name="dob_franchise" value={user.dob_franchise} type="date" onChange={handleSubmit} /></div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><br /><label className="control-label">Email<i className="fa fa-star starred" /></label>
                                    <input className="form-control form-item ng-untouched ng-pristine ng-invalid" name="email_franchise" required type="email" onChange={handleSubmit} value={user.email_franchise} /></div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><br />
                                    <label className="control-label">Phone No 1<i className="fa fa-star starred" /></label>
                                    <input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="phone1_franchise" onChange={handleSubmit} value={user.phone1_franchise} name="phone1_franchise" required type="text" />
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><br /><label className="control-label">Phone No 2<i className="fa fa-star starred" /></label>
                                    <input className="form-control form-item ng-untouched ng-pristine ng-invalid" name="phone2_franchise" value={user.phone2_franchise} onChange={handleSubmit} required type="text" /></div>
                            </div>



                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><br />
                                    <label htmlFor="inputState">Educational Qualification</label>
                                    <input type="text" className="form-control shadow-none" list="qualification" name="qualification_contact" value={user.qualification_contact} required="required" onChange={handleSubmit} />
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
                                    <label htmlFor="inputState">Current Status</label>
                                    <input type="text" className="form-control shadow-none" list="career_status" name="status_contact" value={user.status_contact} onChange={handleSubmit} required />
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
                                    <input className="form-control form-item ng-untouched ng-pristine ng-invalid" name="location_contact" value={user.location_contact} onChange={handleSubmit} />
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group"><br />
                                    <label className="control-label">Investment Capacity<i className="fa fa-star starred" /></label>
                                    <input className="form-control form-item ng-untouched ng-pristine ng-invalid" name="investment_contact" value={user.investment_contact} onChange={handleSubmit} />
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12 text">
                                <div className="form-group" style={{width:"100% !important"}}><br />
                                    <label className="control-label">Enquiry Details<i className="fa fa-star starred" /></label>
                                    <textarea className="form-control form-item ng-untouched ng-pristine ng-invalid" style={{ width:'100% !important' }} name="enquiry_contact" value={user.enquiry_contact} onChange={handleSubmit} />
                                </div>
                            </div>

                            <div className="text-center col-lg-12">
                                <br />
                                <div className="text-center costumButton" style={{border:'1px solid grey',borderRadius:'10px',height:'30px',width:"43%"}}>
                                    <a type="submit" style={{fontWeight:'500',fontSize:'20px',color:'white'}} onClick={handleSubmission} >{buttonState}<i className="fa fa-arrow-circle-up" /></a>
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

export default FranchiseForm
