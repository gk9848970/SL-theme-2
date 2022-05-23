import React from 'react'
import Card from './component/Card'
import Footer from './component/Footer'
import Header from './component/Header'

function Course({id}) {
    return (
        <div>
            <Header id={id}/>
            <Card id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Course
