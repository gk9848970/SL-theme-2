import React from 'react'
import Link from "./Link";
import * as api from '../Api';
import { useState, useEffect } from 'react';
function AllImageGallery({id}) {

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

    const imgGallery = () => {

        var img = document.querySelector("#img-btn");
        var img_i = document.querySelector("#img-btn-child");
        var vid = document.querySelector("#vid-btn");
        var vid_i = document.querySelector("#vid-btn-child");
        img.style('border-bottom',' 4px solid #01338D');
        img.style('color','black');
        img_i.style('color',' #01338D');
        vid.style('color','rgba(0,0,0,0.36)');
        vid.style("border",'0');
        vid_i.style('color','rgba(0,0,0,0.36)');
        // console.log("IMG");
    }
    const vidGallery = () => {
        var img = document.querySelector("#img-btn");
        var img_i = document.querySelector("#img-btn-child");

        var vid = document.querySelector("#vid-btn");
        var vid_i = document.querySelector("#vid-btn-child");

        vid.style('border-bottom','4px solid #01338D');
        vid.style('color', 'black');
        vid_i.style('color', '#01338D');

        img.style('color','rgba(0,0,0,0.36)');
        img.style('border','0');
        img_i.style('color','rgba(0,0,0,0.36)');
        // console.log("VID");

    }
    if(status){
        return (
            <div>
                <div className="msy-gallery d-flex flex-column ">
                    <div className="msy-gallery1">
                        <div className="msy-gallery-head w-100">
                            <h1>Our Gallery</h1>
                        </div>
                        <div className="msy-gallery-ImgVid w-100">
                            <button className="btn " id="img-btn" onclick={imgGallery}> <i class="fas fa-image" id="img-btn-child"></i> Images</button>

                        </div>
                        <div className="msy-gallery-cont w-100">
                            {/* <!-- Gallery --> */}
                            <div className="row msy-gallery-row ">

                                {images.map((image, index) => {
                                    return (
                                        <>
                                            <div className="col-lg-3 col-md-4 mb-4 zoom">
                                                <img
                                                    src={image.url}
                                                    className="w-100 shadow-1-strong rounded"
                                                    alt=""
                                                />
                                            </div>
                                        </>
                                    )
                                })}



                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        )

    }else{
        return(<>
            <div className="mt-5 msy-gallery-head text-center">
                <h1>No Images</h1>
            </div>
        </>)
    }

    
}

export default AllImageGallery
