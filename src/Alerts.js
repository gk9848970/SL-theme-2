import React from 'react'
import Header from './component/Header';
import Footer from './component/Footer';
import * as api from './Api';
import { useState, useEffect } from 'react';
function Alerts({id}) {
    const [notifications, setNotifications] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchAlerts(id,100)
            .then((data) => {
                if (data.status === "success") {
                    setNotifications(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if(status){
        return (
            <div >
                <Header id={id}/>
                <div className="container">
                    <div className="row">
                        <div style={{ marginTop: "10%" }} className=" col-lg-12 text-center mb-4">
                            <h1>Important Alerts</h1>
                        </div>

                        {notifications.map(function (alert, index) {
                            return (
                                <>
                                    <div className=" col-lg-4 card text-center mb-5" style={{ wdith:'80%', display:'flex', flexWrap:'wrap', justifyContent:'space-around'}} >
                                        <div className="card-body" >
                                            <h5 className="card-title">{"Alert:-" + index}</h5>
                                            <p className="card-text">{alert.message}</p>
                                            <a href={alert.link} className="btn btn-primary btn-sm">Link</a>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>

                <Footer id={id}/>
            </div>
        )

    } else {
        return(<>
            <Header id={id}/>
            <div style={{ marginTop: "10%" }} className=" col-lg-12 text-center mb-4">
                <h1>No Alerts</h1>
            </div>
            <Footer id={id}/>
        </>)
    }
    
}

export default Alerts
