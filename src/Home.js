import React from 'react';
import About from './component/About';
import Blog from './component/Blog';
import Courses from './component/Courses';
import Footer from './component/Footer';
import Gallery from './component/Gallery';
import Head from './component/Head';
import Header from './component/Header';
import Offer from './component/Offer';
import Review from './component/Review'; 
import './component/css/ContactForm.css'
import NotificationSection from './component/NotificationSection'
import { useState, useEffect } from 'react';
import VideoSection from './component/VideoSection';
import Slider from './component/Slider';

function Home({id}) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <Header id={id}/>
            {/* <Head   id={id}/> */}
            <Slider id={id}/>
            <About id={id}/>
            <Courses id={id}/>
            <Offer id={id}/>
            <Gallery id={id}/>
            <VideoSection id={id} count="3"/>
            <Review id={id}/>
            <NotificationSection id={id}/>
            <Blog id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Home
