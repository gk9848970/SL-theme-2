import React from 'react'
import Link from '../component/Link'
import * as api from '../Api';
import { useState, useEffect } from 'react';
import Vision from '../component/img/vision.svg';
import Mission from '../component/img/mission.svg';
import Team from '../component/img/team.svg';
import suryavision from '../component/img/OurVision.jpg';
import suryamission from '../component/img/OurMission.jpg';
import whyus from '../component/img/Whyus.jpg';
import aboutus from '../component/img/Aboutus.jpg';
export default function Aboutus({ id }) {

    const [instDetail, setInstDetail] = useState({});
    const [status1, setStatus1] = useState(false);
    const [defImages,setDefImages] = useState("");
    const [aboutImg, setAboutImg] = useState("");
    const [foundermssge, setFoundermssge] = useState("");
    const [directormssge, setDirectormssge] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {

        api.fetchInstituteDetails(id)
            .then((data) => {
                // console.log("My vision images:",data);
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setStatus1(true);
                    setDefImages(data.response["default_img1"]);
                    setAboutImg(data.response["aboutus_image"]);
                    setFoundermssge(data.response["Co-founder Message"]);
                    setDirectormssge(data.response["Director Message"]);
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
                <div className="row about-page-grid-1">
                    <div className="">
                        {id==="313a9caaf7ff04c78e60aba984f21b79"?(<><img  style={{ width: "100%"}} src={aboutus} alt="..." className=""/></>):(<>
                            <img style={{ width: "100%"}} src={aboutImg && aboutImg.length > 0 ? aboutImg : defImages} alt="" className="img-fluid" />
                        </>)}
                    </div>
                    <div className="about-grid-1-text-div">
                        <h1 className="text-center">About Us</h1>
                        <div className="about-grid-1-para" dangerouslySetInnerHTML={{ __html: instDetail['About Us'] }} />
                    </div>
                </div>

                <div className="row mission-section">
                    <div className="">
                        <h1 className="text-center mission-heading"> Our Mission </h1>
                        {id==="313a9caaf7ff04c78e60aba984f21b79"?(<><img src={suryamission} alt="..." className="mission-img"/></>):(null)}
                        <p className="mission-para" dangerouslySetInnerHTML={{ __html: instDetail['Our mission'] }} />
                    </div>
                </div>
                
                <div className="row vision-section">
                    <div className="">
                        <h1 className="text-center vision-heading"> Our Vision </h1>
                        {id==="313a9caaf7ff04c78e60aba984f21b79"?(<><img src={suryavision} alt="..." className="vision-img"/></>):(<><p dangerouslySetInnerHTML={{ __html: instDetail['Our vision'] }} /></>)}
                    </div>
                </div>
                
                <div className="row whyus-section">
                    <div className="">
                        <h1 className="text-center whyus-heading"> Why Us </h1>
                        {id==="313a9caaf7ff04c78e60aba984f21b79"?(<><img src={whyus} alt="..." className="whyus-img"/></>):(null)}
                    
                        <p className="whyus-para" dangerouslySetInnerHTML={{ __html: instDetail['Why Us'] }} />
                    </div>
                </div>

                <div>
                    <h1 className="msg-heading text-center">From the Office Desk</h1>
                    <div className="row msg-section">
                        {directormssge && directormssge.length> 0 ? 
                        (<div className="row col-lg-12 mt-5 mb-5">
                            <div className="col-lg-4 mt-4 mb-4 text-center">
                                <img style={{ maxWidth: "600px", width: "100%"}} src={instDetail.imgURL + instDetail["Director Image"]} className="img-fluid img-thumbnail" alt="" />                </div>
                            <div className="col-lg-8 my-auto ">
                                <h2 className="text-center msg-post"> Director Message </h2>
                                <p dangerouslySetInnerHTML={{ __html: instDetail['Director Message'] }} />
                            </div>
                        </div>) :(null)}
                        {foundermssge && foundermssge.length > 0 ?(<div className="row col-lg-12  mt-5 mb-5">
                            <div className="col-lg-4 mt-4 mb-4 text-center">
                                <img style={{ width: "100%" }} src={instDetail.imgURL + instDetail["Co-founder Image"]} className="img-fluid img-thumbnail" alt="" />
                            </div>
                            <div className="col-lg-8 my-auto">
                                <h2 className="text-center msg-post"> Co-Founder Message </h2>
                                <p dangerouslySetInnerHTML={{ __html: instDetail["Co-founder Message"] }} />
                            </div>
                        </div>):(null)}
                    </div>
                </div>
            </div>
        </>
    )
}