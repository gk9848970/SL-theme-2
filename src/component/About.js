import React from 'react'
import * as api from '../Api';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
function About({id,feature}) {

    const [instDetail, setInstDetail] = useState({});
    const [status1,setStatus1] = useState(false);
    const [status2,setStatus2] = useState(false);
    const [defImages,setDefImages] = useState("");
    const [aboutImg, setAboutImg] = useState("");
    const [features, setFeatures] = useState({});
    const setAboutus = () =>{
        ReactGA.event({
            category:"About Button",
            action:"Aboutus Clicked",
            label:"About our mission,our vision,Direct message,founder message"
        })
    };
    useEffect(() => {
        api.fetchInstituteDetails(id)
            .then((data) => {
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setStatus1(true);
                    setDefImages(data.response["default_img1"]);
                    setAboutImg(data.response["aboutus_image"]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        api.fetchCoreFeatures(id)
            .then((data) => {
                if (data.status === "success") {
                    setFeatures(data.response[0]);
                    setStatus2(true);
                    
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // console.log(features);


        return (
            <div>
                <div className="aboutus-section msy-aboutUs d-flex flex-column ">
                {
                    status1 ?<>
                            <div className=" msy-aboutUs d-flex flex-column container">
                                <div className="row aboutus-grid-1">
                                  <div className="msy-aboutUs_img">
                                        <img style={{width:"100%"}} src={aboutImg && aboutImg.length > 0 ? aboutImg : defImages} alt="about-us" className="img-fluid" />
                                    </div>
                                    <div className="msy-aboutUs_para  d-flex flex-column  justify-content-center align-content-start">
                                        <div className=" text-center msy-offerHead">
                                             <h1 style={{ marginBottom: 20 }}>About Us</h1>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: instDetail['About Us'].slice(0,500)+"...." }} />
                                        <Link to="about">
                                            <button className="costumButton btn mt-5" onClick={() => setAboutus(false)}>Show More</button>
                                        </Link>
                                    </div>
                                  
                                    
                                </div>
                            </div>


                    </> :
                    <></>
                }


                    {
                        status2&&feature ? 
                        <>
                            <div className="msy-aboutUs2">
                                <h2 className="msy-aboutUs2-head ">How it works</h2>
                                <div className="msy-aboutus_info d-flex flex-wrap">
                                    <div className="msy-aboutus_details">
                                        <h1 style={{ color: 'white' }}>{features.feature1_title}</h1>
                                        <p>{features.feature1_detail}</p>
                                    </div>
                                    <div className="msy-aboutus_details">
                                        <h1 style={{ color: 'white' }}>{features.feature2_title}</h1>
                                        <p>{features.feature2_detail}</p>
                                    </div>
                                    <div className="msy-aboutus_details">
                                        <h1 style={{ color: 'white' }}>{features.feature3_title}</h1>
                                        <p>{features.feature3_detail}</p>
                                    </div>
                                        <div className="msy-aboutus_details">
                                            <h1 style={{ color: 'white' }}>{features.feature4_title}</h1>
                                            <p>{features.feature4_detail}</p>
                                        </div>
                                </div>
                            </div>
                        </> : null }
                </div>
            </div>
        )  
}

export default About
