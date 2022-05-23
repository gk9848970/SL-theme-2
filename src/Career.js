import React from 'react'
import Header from './component/Header';
import Footer from './component/Footer';
import CareerForm from './component/CareerForm';


function Career({id}) {
    return (
        <div>
            <Header  id={id}/>
                <CareerForm id={id}/>
            <Footer  id={id}/>
        </div>
    )
}

export default Career
