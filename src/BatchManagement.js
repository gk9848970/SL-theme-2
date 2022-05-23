import React from 'react';
import Header from './component/Header';
import Batch from './component/Batch';
import Footer from './component/Footer';
function BatchManagement({id}) {
    return (
        <div>
            <Header id={id}/>
            <Batch id={id}/>
            <Footer id={id}/>
        </div>
    )
}

export default BatchManagement
