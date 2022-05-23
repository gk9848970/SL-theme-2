import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';
import Link from '../component/Link'

function Blogs({id}) {
    const [blogs, setblogs] = useState([]);
    const [status, setStatus] = useState(false);
     useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchBlogs(id)
            .then((data) => {
                if (data.status === "success") {
                    setblogs(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    var baseUrl = "https://d2hp90zy5ktxok.cloudfront.net/mcllearnoadminblog/";
    // console.log(blogs);
    if (status) {
        return (
            <div>
                
                <div className="msy-blog-main text-center">
                    <div className="msy-blog-cont ">
                        <div className="msy-blog-head ">
                            <h1>Blogs</h1>
                        </div>
                        <div className="container">
                            <div className="row">

                                {blogs.map((blog, index) => {
                                    return (
                                        <>
                                                <div key={index} className="col-lg-4 col-md-6 mb-4">
                                                    <Link href={"blogs/" + blog.blog_id}>
                                                        <div className="msy-blog-box-img ">
                                                            <img style={{ width: "371px", height: "217px" }} src={blog.post_image} className="img-fluid" alt="" />
                                                </div>
                                                        <div className="msy-blog-box-details ">
                                                            <p id="blogdiv" className="desc" dangerouslySetInnerHTML={{ __html: blog.post_title }} />
                                                        </div>

                                                    </Link>
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

    } else {
        return (<></>)
    }
}

export default Blogs
