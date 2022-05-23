import React from 'react'

import * as api from '../Api';
import { useState, useEffect } from 'react';
function ContactDetail() {
    const [instDetail, setInstDetail] = useState({});
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    useEffect(() => {
        api.fetchInstituteDetails('1543843a4723ed2ab08e18053ae6dc5b')
            .then((data) => {
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setStatus(true);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="row">
            <div className="col-lg-12">
                <h3>AKSHAT</h3>
            </div>
           
        </div>
    )
}

export default ContactDetail
