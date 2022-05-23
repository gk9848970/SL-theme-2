import React from 'react'
import Footer from './component/Footer'
import Header from './component/Header'
import Online from './component/Online';

function Onlinetest({id}) {
    return (
        <div>
            <Header id={id}/>
            <Online id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Onlinetest;
