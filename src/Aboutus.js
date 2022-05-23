import React from 'react'
import About from './component/About'
import AboutExtended from './component/AboutExtended'
import Footer from './component/Footer'
import Header from './component/Header'
import ReactGA from 'react-ga';
function Aboutus({id}) {
    return (
        <div>
            <Header id={id}/>
            <AboutExtended id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Aboutus
