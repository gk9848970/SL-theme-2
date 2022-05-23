import React from 'react'
import Link from "./component/Link";
import * as api from './Api';
import { useState, useEffect } from 'react';
function NotificationPage({id}) {

    const [notifications, setNotifications] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchNotification(id)
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
    console.log(notifications);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    
    var Img = "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/10/02/Pictures/male-student-doing-homework-at-library_d14ad10e-0495-11eb-be8a-af0c9ba615fa.jpg"

    return (
        <>

            <div style={{marginTop:"10em"}} className="text-center">
                <h1>Notifications</h1>
            </div>
        
        <div className="container mt-5 mb-5">
            <div className="row">
                
                {notifications.map(function (notification, index) {
                    return (
                        <>
                            <div key={index} className="col-lg-3 mb-5" >
                                <div className="card h-100">
                                    <img src={notification.image ? (notification.image) : (Img)} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title text-center">{notification.notify_title}</h4>
                                        <p className="card-text" dangerouslySetInnerHTML={{ __html: (notification.notify_description).slice(0, 200) }} />

                                    </div>
                                    <Link href={"/" + "notification/" + notification.notify_id}>
                                        <button class="btn btn-primary btn-sm mb-2">Read More</button>
                                    </Link>
                                    <div className="card-footer">
                                        <small className="text-muted">{notification.date.slice(0, 10)}</small>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
                   

            </div>
        </div>
        </>
    )
}

export default NotificationPage
