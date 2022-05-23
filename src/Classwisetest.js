import React from 'react'
import './component/css/Classwisetest.css'
import Footer from './component/Footer'
import Header from './component/Header'
import Test from './component/Test'
function Classwisetest({id}) {
    return (
        <div>
            <Header id={id}/>
            <Test id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Classwisetest
