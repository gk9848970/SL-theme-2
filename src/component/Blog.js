import React from 'react'
import * as api from '../Api';
import ReactGA from 'react-ga';
import { useState, useEffect } from 'react';
import blogImage from '../images/blog.png';
import Link from './Link'
function Blog({id}) {
    const [blogs, setblogs] = useState([]);
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({})
    const blogImg = () => {
    ReactGA.event({
        category:"Blog Button",
        action:"Client blogs",
        label:"how to prepare for exam"
    })
    }
    useEffect(() => {
        api.fetchBlogs(id)
            .then((data) => {
                if (data.status === "success") {
                    setblogs(data.response);
                    setStatus(true);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
   
// var baseUrl = "https://d2hp90zy5ktxok.cloudfront.net/mcllearnoadminblog/";
    // console.log(blogs);
    if(status){
        return (
            <div>
                <div className="msy-blog-main text-center">
                    <div className="msy-blog-cont ">
                        <div className=" text-center msy-offerHead">
         <h1 style={{ marginBottom: 20 }}>Blogs</h1>
        </div>
                        <div className="container">
                        <div className="row">
                                {blogs.slice(0, 3).map((blog, index) => {
                                return (
                                    <>
                                        <div key={index} className="col-lg-4 col-md-6 mb-4" style={{margin:'auto', justifyContent: 'center'}}>
                                            <Link href={"blogs/" + blog.blog_id}>
                                            <div className="msy-blog-box-img ">
                                                <img style={{ width: "371px", height: "217px" }} src={blog.post_image && blog.post_image.length > 0 ? (blog.post_image) : (defImages) } className="img-fluid" alt="blog-img??" onClick={blogImg}/>
                                            </div>
                                            <div className="msy-blog-box-details ">
                                                <p style={{fontWeight:"550"}} id="blogdiv" className="mt-3 desc" dangerouslySetInnerHTML={{ __html: blog.post_title }} />
                                            </div>
                                        </Link>
                                        </div>
                                    </>
                                )
                            })}
                            {blogs.length > 3 ? <div className="col-lg-12 text-center mt-3">
                                    <Link href="blogs">
                                        <button className="btn costumButton btn-lg " >View All</button>
                                    </Link>
                                </div> : null }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }else{
        return(<></>)
    }
    
}

export default Blog
