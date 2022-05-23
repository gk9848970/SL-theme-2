import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';
function Alerts({id}) {
    const [alerts, setAlerts] = useState([]);
    const [status, setStatus] = useState(false);
      useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchAlerts(id,100)
            .then((data) => {
                if (data.status === "success") {
                    setAlerts(data.response);
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
            
                <div className="container">
                    <div className="row">
                        <div style={{ marginTop: "10%" }} className=" col-lg-12 text-center mb-4">
                            <h1>Important Alerts</h1>
                        </div>

                        {alerts.map(function (alert, index) {
                            return (
                                <>
                                    <div className=" col-lg-3 card text-center mb-5" style={{ wdith:'80% !important', display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
                                        <div className="card-body" style={{width:'10% !important'}}>
                                            <h5 className="card-title">{"Alert:-" + index}</h5>
                                            <p className="card-text">{alert.message}</p>
                                            <a href={alert.link} className="btn costumButton btn-sm">Link</a>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>

               
            </div>
        )

    } else {
        return(<>
           
            <div style={{ marginTop: "10%" }} className=" col-lg-12 text-center mb-4">
                <h1>No Alerts</h1>
            </div>
          
        </>)
    }
    
}

export default Alerts
