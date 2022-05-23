import React from 'react'
import Link from "./Link";
import * as api from '../Api';
import ReactGA from 'react-ga';
import { useState, useEffect } from 'react';
export default function VideoSection(props){
    var id=props.id;
    const [videos, setVideos] = useState([]);
    const [status, setStatus] = useState(false);
    const setvidGallery = () => {
        ReactGA.event({
            category:"Video Button",
            action:" All video ",
            label:"Our website Video"
        })
    }
    useEffect(() => {
        api.fetchVideo(id, 8)
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
    if(status){
        return (
            <>
                <div className="container mb-4" style={{width:'100%', margin:'auto', justifyContent: 'center'}} >
                    <div className="msy-gallery-ImgVid w-100 mb-4">
                        <button className="btn " id="img-btn" > <i className="fas fa-video" id="img-btn-child"></i> Videos</button>
                    </div>
                    <div className="row">
                        {videos.slice(0, props.count).map((video, index) => {
                            return (
                                <>
                                    <div class=" text-center mb-3 ml-4 col-lg-4 col-md-6 embed-responsive embed-responsive-16by9">
                                        <iframe title=" " width="320" height="197" className="rounded embed-responsive-item" src={video.video_link.replace("watch?v=","embed/")} allowfullscreen="allowfullscreen" ></iframe>
                                        <h5 className="mb-0">{video.video_title}</h5>
                                        <p>{video.desc}</p>
                                    </div>
                                </>
                            )
                        })}
                        {videos.length > 4 ? <div className="text-center ">
                            <Link href="videopage">
                                <button className="btn costumButton msy-gallery-btn3" onClick={() => setvidGallery (false)}>View All</button>
                            </Link>
                        </div> : null}
                        
                    </div>

                </div>


            </>
        )

    }else{
        return(<></>)
    }
    
}