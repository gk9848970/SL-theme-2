import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as api from '../Api';
import { useState, useEffect } from 'react';
export default function BlogDescription({ id }) {
    const { blog_id } = useParams();
    const [blog, setblog] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchBlogs(id)
            .then((data) => {
                if (data.status === "success") {
                    (data.response).forEach((obj) => {
                        if (obj.blog_id && obj.blog_id == blog_id) {
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
    // if(status&&blog.)
    var baseUrl = "https://d2hp90zy5ktxok.cloudfront.net/mcllearnoadminblog/";

    if (status === true) {
        return (
            <>
                <div style={{ marginTop: "10em" }} className="container">
                    <div className="text-center"><h1>Blog</h1></div>
                    <div className="card mb-5">
                        <img style={{ height: "300px", width: "500px", margin: "auto" }} src={blog.post_image} className="card-img-top img-fluid img-thumbnail" alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">{blog.post_title}</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} dangerouslySetInnerHTML={{ __html: blog.post_description }} />
                            <p className=" card-text"><small className="text-muted">{blog.user_first_name + " " + blog.user_last_name}</small></p>
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
                        <img style={{ height: "300px" }} className="card-img-top img-fluid img-thumbnail" alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">No Blog</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} />
                            <p className=" card-text"><small className="text-muted"></small></p>
                        </div>
                    </div>

                </div>
            </>
        )


    }
}