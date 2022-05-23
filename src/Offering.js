import React from 'react'
import Footer from './component/Footer'
import Header from './component/Header'
import Offer from './component/Offer'

function Offering({id}) {
    return (
        <div>
            <Header id={id}/>
            <Offer id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Offering
