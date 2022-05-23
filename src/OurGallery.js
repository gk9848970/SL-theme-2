import React from 'react'
import Footer from './component/Footer'
import Header from './component/Header'
import './Gallery.css';
import AllImageGallery from './component/allImageGallery';
import { useState, useEffect } from 'react';
function OurGallery({id}) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <Header id={id}/>
            <div className="gallery">
                <AllImageGallery id={id}/>
            </div>
            <Footer id={id}/>
        </div>
    )
}

export default OurGallery
