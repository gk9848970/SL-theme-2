import React from 'react'
import Blog from './component/Blog'
import Footer from './component/Footer'
import Header from './component/Header'
import Review from './component/Review'
import './component/css/Main.css'
import * as api from './Api';
import { useState, useEffect } from 'react';
import Link from './component/Link'

function Blogs({id}) {
    const [blogs, setblogs] = useState([]);
    const [status, setStatus] = useState(false);
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

    // console.log(blogs);
    if (status) {
        return (
            <div>
                <Header id={id}/>
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
                                                        <img src="./img/blog.png" className="img-fluid" alt="" />
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
                <Footer id={id}/>
            </div>
        )

    } else {
        return (<></>)
    }
}

export default Blogs
