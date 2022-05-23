import React from 'react'
import Link from "./Link";
import * as api from '../Api';
import ReactGA from 'react-ga';
import { useState, useEffect } from 'react';
export default function VideoPage(props) {

    const [videos, setVideos] = useState([]);
    const [status, setStatus] = useState(false);
    const setvidGallery = () => {
        ReactGA.event({
            category:"Button",
            action:"Gall video com Button Clicked",
            label:"User save there Image by clicking CLICK ME! button"
        })
    }
    useEffect(() => {
        api.fetchVideo(props.id, 100)
            .then((data) => {
                if (data.status === "success") {
                    setVideos(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            
            <div className="container mb-4">
                <div className="msy-gallery-ImgVid w-100 mb-4">
                    <button className="btn " id="img-btn" > <i className="fas fa-video" id="img-btn-child" onClick={() =>  setvidGallery(false)}></i> Videos</button>
                </div>
                <div className="row">
                    {videos.map((video, index) => {
                        return (
                            <>
                                <div className=" text-center mb-3 ml-4 col-lg-4 col-md-6 embed-responsive embed-responsive-16by9">
                                    <iframe width="350" height="197" className="rounded embed-responsive-item" src={video.video_link.replace("watch?v=", "embed/")} allowfullscreen="allowfullscreen" ></iframe>
                                    <h5 className="mb-0">{video.video_title}</h5>
                                    <p>{video.desc}</p>
                                </div>
                            </>
                        )
                    })}
                </div>

            </div>


        </>
    )
}