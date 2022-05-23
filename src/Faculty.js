import React from 'react'
import Facultyy from './component/Facultyy'
import Footer from './component/Footer'
import Header from './component/Header'

function Faculty({id}) {
    return (
        <div>
            <Header id={id}/>
            <Facultyy id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Faculty
