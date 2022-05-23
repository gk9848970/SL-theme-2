import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';
export default function VideoPage({ id }) {

    const [videos, setVideos] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchVideo(id, 100)
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
            <div style={{ marginTop: "10em" }} className="text-center">
                <h1>Gallery</h1>
            </div>
            <div className="container mb-4" style={{ marginLeft: "-15px"}}>
                <div className="msy-gallery-ImgVid w-100 mb-4" style={{ marginLeft: "-15px"}}>
                    <button className="btn " id="img-btn" > <i class="fas fa-video" id="img-btn-child"></i> Videos</button>
                </div>
                <div className="row">
                    {videos.map((video, index) => {
                        return (
                            <>
                                <div class=" text-center mb-3 ml-4 col-lg-4 col-md-6 embed-responsive embed-responsive-16by9">
                                    <iframe width="350" height="197" className="rounded embed-responsive-item" src={video.video_link.replace("watch?v=", "embed/")} allowfullscreen="allowfullscreen" title=" " ></iframe>
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