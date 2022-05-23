import React from 'react'
//import Link from "./Link";
import ReactGA from 'react-ga';
import * as api from '../Api';
import { useState, useEffect } from 'react';
import NotificationDescription from '../pages/NotificationDescrption';
import ReactDOM from 'react-dom';
import Route from './Route'
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import { NotificationImportant } from '@material-ui/icons';

export default function NotificationSection({id})
{
    const [notifications, setNotifications] = useState([]);
    const [status, setStatus] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [arrIndex, setArrIndex] = React.useState('0');
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

    Modal.setAppElement('#root')
    const customStyles = {
        content: {
            zindex: '1000',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-10%',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            border: "0"
        },

    };
    const handleOpenClick = (e) => {
        e.preventDefault();
        var index = e.target.value
        setArrIndex(index);
        setIsOpen(true);
        ReactGA.event({
            category:"Notification Button",
            action:"CA Foundation 2019",
            label:"CA 2019 Institute chartered accounted of india"
        })
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    var notificationImg = "http://www.biznessapps.com/blog/wp-content/uploads/2015/04/blog_from_nice_to_need.png";

    if (status) {
        return (
            <>

                <div className="container mt-5">

                <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
                    {status ? (
                        <>
                            <div >
                               <div className="card h-100" style={{margin:"0 auto"}}>
                                            <img style={{height:"200px",width:"300px"}} src={notifications[arrIndex].image && notifications[arrIndex].image.length >0 ? (notifications[arrIndex].image) : (notificationImg)} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{notifications[arrIndex].notify_title}</h5>
                                                <p className="card-text" dangerouslySetInnerHTML={{ __html: (notifications[arrIndex].notify_description)}} />

                                            </div>
                                                
                                            <div className="card-footer">
                                                <small className="text-muted">{notifications[arrIndex].date.slice(0, 10)}</small>
                                            </div>
                                        </div>

                            </div>
                        </>
                    ) : (null)}

                </Modal>


                    <div className="row">
                        <div className=" text-center msy-offerHead">
                             <h1 style={{ marginBottom: 20 }}>Notifications</h1>
                        </div>
                        {notifications.slice(0, 4).map(function (notification, index) {
                            return (
                                <>
                                    <div className="applyShadow col-lg-3" style={{margin:'auto', justifyContent: 'center'}} >
                                        <div className="card h-100">
                                            <img src={notification.image && notification.image.length >0 ? (notification.image) : (notificationImg)} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{notification.notify_title}</h5>
                                                <p className="card-text" dangerouslySetInnerHTML={{ __html: (notification.notify_description).slice(0, 100)+"...." }} />
                                            </div>
                                           <div style={{width:"50%"}} className="text-center">
                                                <button  className="btn costumButton btn-sm mb-2" value={index} onClick={handleOpenClick}>Read More</button>
                                           </div>
                                            <div className="card-footer">
                                                <small className="text-muted">{notification.date.slice(0, 10)}</small>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                        {notifications.length > 4 ? <div className="col-lg-12 text-center  mt-3">
                            <Link to="notificationpage">
                                <button className="btn costumButton btn-lg ">View All</button>
                            </Link>
                        </div> : null
}
                        



                    </div>
                </div>
                
            </>
        )

    } else {
        return(<></>)

    }

   
}