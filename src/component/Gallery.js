import React from 'react'
import Link from "./Link";
import * as api from '../Api';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
function Gallery({ id }) {

    const [images, setImages] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchImages(id, 8)
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


    const fullGallery = () => {
        var addrow = document.querySelector(".msy-gallery-hidden-images");
        addrow.style = "display:flex";
        ReactGA.event({
            category:"Gallery Button",
            action:"Gallery Image Button Clicked",
            label:"All images in gallery"
        })
    }

    const imgGallery = () => {

        var img = document.querySelector("#img-btn");
        var img_i = document.querySelector("#img-btn-child");
        var vid = document.querySelector("#vid-btn");
        var vid_i = document.querySelector("#vid-btn-child");
        img.style = "border-bottom: 4px solid #01338D;color: black;";
        img_i.style = "color: #01338D;";
        vid.style = "color: rgba(0,0,0,0.36);border:0;";
        vid_i.style = "color: rgba(0,0,0,0.36)";
        // console.log("IMG");
    }
    const vidGallery = () => {
        var img = document.querySelector("#img-btn");
        var img_i = document.querySelector("#img-btn-child");

        var vid = document.querySelector("#vid-btn");
        var vid_i = document.querySelector("#vid-btn-child");

        vid.style = "border-bottom: 4px solid #01338D;color: black;";
        vid_i.style = "color: #01338D;";

        img.style = "color: rgba(0,0,0,0.36);border:0;";
        img_i.style = "color: rgba(0,0,0,0.36)";
        // console.log("VID");

    }
    if (status) {
        return (
            <div>
                <div className="msy-gallery d-flex flex-column ">
                    <div className="msy-gallery1">
                        <div className=" text-center msy-offerHead">
                            <h1 style={{ marginBottom: 20 }}>Our Gallery</h1>
                        </div>
                        
                        <div className="msy-gallery-ImgVid w-100" style={{ padding: "0 100px" }}>
                            <button className="btn " id="img-btn" onclick={imgGallery}> <i class="fas fa-image" id="img-btn-child"></i> Images</button>
                        </div>
                        <div className="msy-gallery-cont container">
                            {/* <!-- Gallery --> */}
                            <div className="row msy-gallery-row ">

                                {images.slice(0, 8).map((image, index) => {
                                    return (
                                        <>
                                            <div className="col-lg-3 col-md-4 mb-4 gallery-img">
                                                <img
                                                    src={image.url}
                                                    className="shadow-1-strong rounded"
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
                    {/* <div class="msy-gallery-ImgVid w-100" style={{ padding: "0 100px" }}>
                        <Link href="gallery">
                            <button class="btn costumButton msy-gallery-btn3" onclick={fullGallery}>View All</button>
                        </Link>
                    </div> */}
                    {images.length > 4 ? <div className="col-lg-12 text-center  mt-3">
                        <Link href="gallery">
                            <button className="btn costumButton btn-lg " onclick={fullGallery}>View All</button>
                        </Link>
                    </div> : null}
                    
                </div>
               
            </div>
        )

    } else {
        return (<></>)
    }


}

export default Gallery
