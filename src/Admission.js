import React from 'react'
import AdmissionForm from './component/AdmissionForm'
import Footer from './component/Footer'
import Header from './component/Header'

function Admission({id}) {
    return (
        <div>
            <Header id={id}/>
                <AdmissionForm id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default Admission
