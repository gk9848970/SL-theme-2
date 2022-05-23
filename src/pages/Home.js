import React from 'react';
import About from '../component/About';
import Blog from '../component/Blog';
import Courses from '../component/Courses';
import Gallery from '../component/Gallery';
import Slider from '../component/Slider';
import Head from '../component/Head';
import Offer from '../component/Offer';
import Review from '../component/Review';
import NotificationSection from '../component/NotificationSection'
import VideoSection from '../component/VideoSection';
import FacultySection from '../component/FacultySection';

import { useEffect } from 'react';

function Home({ id, config }) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            {/* <Head   id={id}/> */}
            <Slider id={id} />
            <About id={id} feature={config.cms_features} />
            {config.cms_course === 'true' ? (<Courses id={id} />) : (null)}
            {config.cms_facilities === 'true' ? (<Offer id={id} />) : (null)}
            {config.cms_images === 'true' ? (<Gallery id={id} />) : (null)}
            {config.cms_video === 'true' ? (<VideoSection id={id} count="1000" />) : (null)}
            {config.cms_faculty_details === 'true' ? (<FacultySection id={id} count="100" />) : (null)}
            {config.cms_testimonial === 'true' ? (<Review id={id} />) : (null)}
            {config.cms_notification === 'true' ? (<NotificationSection id={id} />) : (null)}
            {config.cms_blogs === 'true' ? (<Blog id={id} />) : (null)}
        </div>
    )
}

export default Home
