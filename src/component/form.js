import React from 'react'
import * as api from './../Api';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';
const Form = ({id}) => {
    const [buttonState, setButtonState] = useState("Submit Now");
    const [formData, updateFormData] = useState({
        first_name: "",
		last_name: " ",
		email: "",
		contact_no: "",
    });
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
        return flag;
    }
    const handleSubmit = (e) => {
        setButtonState("Submitting...")
        e.preventDefault();
        ReactGA.event({
            category:"Enquiry Submit button",
            action:"Enquiry form for student",
            label:"Enquiry deatails form for student"
        })
        // console.log(formData);
        if (isValidform() === 1) {
            api.sendContactData(id,formData)
                .then((data) => {
                    if (data.flag === 1) {
                        toast.success("Your Form Submitted Successfully", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit Now");
                        updateFormData({
                            first_name: "",
							last_name: " ",
							email: "",
							contact_no: "",
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

        <section id="" className="FormHeader">
            <div className="container">
                <div>
                    <h3>Enquiry</h3>
                    <form className="" action="#" method="post">
                        <div className="formHeader-area">
                            <input className="mb-3" type="text" name="first_name" onChange={handleChange} placeholder="Your Name*" value={formData.first_name} />
                            <input className="mb-3" type="email" name="email" onChange={handleChange} placeholder="Your email*" value={formData.email} />
                            <input className="mb-3" type="text" name="contact_no" onChange={handleChange} placeholder="Phone*" value={formData.contact_no} />
                        </div>
                        {buttonState === "Submit Now" ?
                            (
                                <button className="btn-header costumButton" type="submit" onClick={handleSubmit}>{buttonState} <i className="fas fa-arrow-right" /></button>
                            ) : (
                                <button className="btn-header costumButton" type="submit" onClick={handleSubmit} className="btn disabled" disabled>{buttonState} <i className="fas fa-arrow-right" /></button>
                            )}
                    </form>
                    <ToastContainer />
                </div>

            </div>
        </section>


    )
}
export default Form;