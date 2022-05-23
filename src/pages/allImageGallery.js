import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";

import pdf_img from "../images/pdf.png";

function AllImageGallery({ id }) {

    const [images, setImages] = useState([]);
    const [status, setStatus] = useState(false);
    const [pdf, setPdf] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchImages(id,100)
            .then((data) => {
                if (data.status === "success") {
                    setImages(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // console.log(images);

    const [videos, setVideos] = useState([]);
    const [vstatus, setVStatus] = useState(false);
    useEffect(() => {
        api.fetchVideo(id, 100)
            .then((data) => {
                if (data.status === "success") {
                    setVideos(data.response);
                    setVStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });


            api.fetchPdf(id, 100)
        .then((data) => 
        {
            if (data.status === "success") {
                setPdf(data.response);
               
            }
            console.log("Final result  :",data.response.url);
        })
            .catch((err) => {
                console.log(err);
            });
            
    
    }, []);


    const imgGallery = () => {

        var img = document.querySelector("#img-btn");
        var img_i = document.querySelector("#img-btn-child");
        var vid = document.querySelector("#vid-btn");
        var vid_i = document.querySelector("#vid-btn-child");
        img.style('border-bottom', ' 4px solid #01338D');
        img.style('color', 'black');
        img_i.style('color', ' #01338D');
        vid.style('color', 'rgba(0,0,0,0.36)');
        vid.style("border", '0');
        vid_i.style('color', 'rgba(0,0,0,0.36)');
        // console.log("IMG");
    }
    const vidGallery = () => {
        var img = document.querySelector("#img-btn");
        var img_i = document.querySelector("#img-btn-child");

        var vid = document.querySelector("#vid-btn");
        var vid_i = document.querySelector("#vid-btn-child");

        vid.style('border-bottom', '4px solid #01338D');
        vid.style('color', 'black');
        vid_i.style('color', '#01338D');

        img.style('color', 'rgba(0,0,0,0.36)');
        img.style('border', '0');
        img_i.style('color', 'rgba(0,0,0,0.36)');
        // console.log("VID");

    }
    if (status) {
        return (
            <div style={{ padding: "100px" }}>
                <div className="msy-gallery d-flex flex-column  ">
                    <div className="msy-gallery1">
                        <div className="msy-gallery-head w-100" style={{ textAlign: "center" }}>
                            <h1>Our Gallery</h1>
                        </div>
                        <div>
                            <div className="msy-gallery-ImgVid w-100">
                                <button className="btn " id="img-btn" onclick={imgGallery}> <i class="fas fa-image" id="img-btn-child"></i> Images</button>

                            </div>

                            <div className="msy-gallery-cont w-100">
                                {/* <!-- Gallery --> */}
                                <div className="row msy-gallery-row ">

                                    {images.map((image, index) => {
                                        return (
                                            <>
                                                <div className="col-lg-3 col-md-4 mb-4">
                                                    <img
                                                        src={image.url}
                                                        className="w-100 shadow-1-strong rounded zoom"
                                                        alt=""
                                                    />
                                                </div>
                                            </>
                                        )
                                    })}



                                </div>

                                {/* <!-- Gallery --> */}
                            </div>
                        </div>
                        <div>
                            <div className="container mb-4" style={{marginLeft:"-15px"}}>
                                <div className="msy-gallery-ImgVid w-100 mb-4">
                                    <button className="btn " id="img-btn" > <i className="fas fa-video" id="img-btn-child"></i> Videos</button>
                                </div>
                                <div className="row">
                                    {videos.map((video, index) => {
                                        return (
                                            <>
                                                <div className=" text-center mb-3 ml-4 col-lg-4 col-md-6 embed-responsive embed-responsive-16by9">
                                                    <iframe width="350" height="197" classname="rounded embed-responsive-item" src={video.video_link.replace("watch?v=","embed/")} allowfullscreen="allowfullscreen" title=" "></iframe>
                                                    <h5 className="mb-0">{video.video_title}</h5>
                                                    <p>{video.desc}</p>
                                                </div>
                                            </>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    
                        <div>
                            <div className="container mb-4" style={{marginLeft:"-15px"}}>
                                <div className="msy-gallery-ImgVid w-100 mb-4">
                                    <button className="btn " id="img-btn" > <i className="fas fa-file-pdf" id="img-btn-child"></i> Pdf</button>
                                </div>
                                <div className="row">
                                <Container>
                                <Row>
                                    {pdf.map((pdf, index) => {
                                        return (
                                              <Col sm={4} key={index}>
                                                <div class=" text-center embed-responsive embed-responsive-16by9 videoDiv">
                                                    <div>
                                                       
                                                        <a href={pdf.url}>
                                                        <img
                                                                style={{width: '200px',height: '200px'}}
                                                                src={pdf_img} alt="............." 
                                                                // onClick={toggleShowPdf}
                                                              
                                                        />
                                                        </a>
                                                        <br/>
                                                        <h3>{pdf.title}</h3>
                                        
                                                    </div>

                                                    
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Container>

                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        )

    } else {
        return (<>
            <div className="mt-5 msy-gallery-head text-center">
                <h1>No Images</h1>
            </div>
        </>)
    }


}

export default AllImageGallery
