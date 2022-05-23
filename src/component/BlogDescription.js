import React from 'react'
import { useParams } from 'react-router-dom'
import * as api from '../Api';
import { useState, useEffect } from 'react';
export default function BlogDescription({id}){
    const { blog_id } = useParams();
    const [blog, setblog] = useState({});
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchBlogs(id)
            .then((data) => {
                if (data.status === "success") {
                    (data.response).forEach((obj) => {
                        if (obj.blog_id && obj.blog_id === blog_id) {
                            setblog(obj);
                            setStatus(true);
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
        var url = "https://i.ibb.co/KD2s8Sf/blog1.jpg";

    if (status === true) {
        return (
            <>
                <div style={{ marginTop: "10em" }} className="container">
                    <div className="text-center"><h1>Blog</h1></div>
                    <div className="card mb-5">
                        <img style={{ height: "300px",width:"auto" }} src={url} className="card-img-top img-fluid img-thumbnail" alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">{blog.post_title}</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} dangerouslySetInnerHTML={{ __html: blog.post_description }} />
                            <p className=" card-text"><small className="text-muted">{  "By "+blog.user_first_name + " "+blog.user_last_name}</small></p>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div style={{ marginTop: "10em" }} className="container">
                    <div className="card mb-5">
                        <img style={{ height: "300px",width: 'auto' }} src={url} className="card-img-top img-fluid img-thumbnail" alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">No Blogs</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} />
                            <p className=" card-text"><small className="text-muted"></small></p>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}