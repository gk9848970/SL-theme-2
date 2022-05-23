import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as api from '../Api';
import { useState, useEffect } from 'react';
export default function NotificationDescription(props){
    const { id } = useParams();
    const [obj, setNotification] = useState({});
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchNotification(props.id)
            .then((data) => {
                if (data.status === "success") {
                    (data.response).forEach((notif)=>{
                        if (notif.notify_id && notif.notify_id==id){
                            setNotification(notif);
                            setStatus(true);
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    
    var url = "http://www.biznessapps.com/blog/wp-content/uploads/2015/04/blog_from_nice_to_need.png";

    if(status===true){
        return (
            <>
                <div style={{ marginTop: "10em" }} className="container">
                    <div className="card mb-5">
                        <img style={{ height: "300px" }} src={obj.image ? (obj.image) : (url)} className="card-img-top img-fluid img-thumbnail" alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">{obj.notify_title}</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} dangerouslySetInnerHTML={{ __html: obj.notify_description }} />
                            <p className=" card-text"><small className="text-muted">{obj.date.slice(0,10)}</small></p>
                        </div>
                    </div>
                </div>
            </>
        )

    } else{
        return (
            <>
                <div style={{ marginTop: "10em" }} className="container">
                    <div className="card mb-5">
                        <img style={{ height: "300px" }} src={url} className="card-img-top img-fluid img-thumbnail" alt="..." />
                        <div className="card-body">
                            <h2 className="card-title text-center mb-5 mt-5">No Notification</h2>
                            <p className="card-text" style={{ fontSize: "1.2em" }} />
                            <p className=" card-text"><small className="text-muted"></small></p>
                        </div>
                    </div>

                </div>
            </>
        )
        

    }
   
}