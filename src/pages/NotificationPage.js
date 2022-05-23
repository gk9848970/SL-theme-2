import React from 'react'
import Link from "../component/Link";
import * as api from '../Api';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NotificationDescription from './NotificationDescrption';
function NotificationPage({id}) {

    const [notifications, setNotifications] = useState([]);
    const [status, setStatus] = useState(false);
     const [modalIsOpen, setIsOpen] = React.useState(false);
    const [arrIndex, setArrIndex] = React.useState('0');
     useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
    };
    const closeModal = () => {
        setIsOpen(false);
    };



    var defImg = "http://www.biznessapps.com/blog/wp-content/uploads/2015/04/blog_from_nice_to_need.png";

    return (
        <>

            <div className="heading">
                <p>Notifications</p>
            </div>
        
        <div className="container mt-5 mb-5">

        <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
                    {status ? (
                        <>
                            <div >
                               <div className="card h-100">
                                            <img style={{height:"200px",width:"300px"}} src={notifications[arrIndex].image ? (notifications[arrIndex].image) : (defImg)} className="card-img-top" alt="..." />
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
                
                {notifications.map((notification, index)=>{
                    return (
                        <>
                            <div className="applyShadow col-lg-3 mb-5" style={{margin:"20px"}} >
                                <div className="card h-100">
                                <img src={(notification.image) ? (notification.image) : (defImg)} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title text-center">{notification.notify_title}</h4>
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
                   

            </div>
        </div>
        </>
    )
}

export default NotificationPage
