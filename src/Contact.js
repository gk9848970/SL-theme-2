import React from 'react'
// import ContactDetail from './component/ContactDetail'
import ContactForm from './component/ContactForm'
// import Footer from './component/Footer'
// import Header from './component/Header'
// import Map from './component/Map';
import './component/css/ContactForm.css'
import * as api from './Api';
import { useState, useEffect } from 'react';
function Contact({id}) {
    const [instDetail, setInstDetail] = useState({});
    const [status1, setStatus1] = useState(false);
    const [setDefImages] = useState({});
    alert(id);
    useEffect(() => {

        api.fetchInstituteDetails(id)
            .then((data) => {
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setStatus1(true);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div >
                <div style={{marginTop:"10em"}}className="container">
                    <div className="row">
                    <div style={{ marginTop: "4em" }} className="col-lg-3">
                        <h5> <i className="fa fa-phone-square" aria-hidden="true" />{"  " +  instDetail.Contact1 }</h5>
                        <h5><i className="fa fa-envelope" aria-hidden="true"/>{" "+instDetail.Email1}</h5>
                        <h5><i className="fa fa-location-arrow" aria-hidden="true"/>{instDetail.Address1}</h5>
                    </div>
                    <div className="col-lg-9">
                        <ContactForm id={id} />
                    </div>
                    </div>
                </div>            
        </div>
    )
}
export default Contact
