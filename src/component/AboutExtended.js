import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';
import './css/AboutExtended.css'
export default function AboutExtended({ id }) {

    const [instDetail, setInstDetail] = useState({});
    const [status1, setStatus1] = useState(false);
    const [defImages,setDefImages] = useState();
    const [aboutImg, setAboutImg] = useState("");
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

    }, []);
    // console.log(instDetail);
    return (
        <>
            <div className="container mt-5 mb-5">
                <div style={{ backgroundColor: "#f5f5f5" }} className=" msy-aboutUs d-flex flex-column ">
                    <div className="row">
                        <div className="col-md-6 mb-5 mt-5 msy-aboutUs_para  d-flex flex-column  justify-content-center align-content-start">
                            <h1 className="text-center">About Us</h1>
                            <div dangerouslySetInnerHTML={{ __html: instDetail['About Us'] }} />
                        </div>
                        <div className="msy-aboutUs_img col-md-6 mb-5 mt-5">
                            <img src={aboutImg && aboutImg.length > 0 ? aboutImg : defImages} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{ backgroundColor: "#f5f5f5" }} className="col-lg-6 mt-5 mb-5 mx-auto">
                        <h2 className="text-center"> Our Mission </h2>
                        <p dangerouslySetInnerHTML={{ __html: instDetail['Our mission'] }} />
                    </div>
                    <div style={{ backgroundColor: "#f5f5f5" }} className="col-lg-6 mt-5 mb-5">
                        <h2 className="text-center"> Our Vision </h2>
                        <p dangerouslySetInnerHTML={{ __html: instDetail['Our vision'] }} />
                    </div>

                    

                    <div style={{ backgroundColor: "#f5f5f5" }} className="col-lg-12 mt-5 mb-5">
                        <h2 className="text-center"> Why Us </h2>
                        <p dangerouslySetInnerHTML={{ __html: instDetail['Why Us'] }} />
                    </div>


                


                    <div style={{ backgroundColor: "#f5f5f5" }} className="row col-lg-12 mt-5 mb-5">
                        <div className="col-lg-4 mt-4 mb-4 text-center">
                            <img style={{ height: "225px", width: "225px" }} src={instDetail.imgURL + instDetail["Director Image"]} className="img-fluid img-thumbnail" alt=" " />                </div>
                        <div className="col-lg-8 my-auto ">
                            <h2 className="text-center"> Director Message </h2>
                            <p dangerouslySetInnerHTML={{ __html: instDetail['Director Message'] }} />
                        </div>
                    </div>


                  



                    { instDetail["Co-founder Message"].length > 0 ? (<div style={{ backgroundColor: "#f5f5f5" }} className="row col-lg-12  mt-5 mb-5">
                        <div className="col-lg-4 mt-4 mb-4 text-center">
                            <img style={{ height: "225px", width: "225px" }} src={instDetail.imgURL + instDetail["Co-founder Image"]} className="img-fluid img-thumbnail"  alt=""/>
                        </div>
                        <div className="col-lg-8 my-auto">
                            <h2 className="text-center"> Co-Founder Message </h2>
                            <p dangerouslySetInnerHTML={{ __html: instDetail["Co-founder Message"] }} />
                        </div>
                    </div>) : (null)}

                  

                </div>
            </div>
        </>
    )
}
