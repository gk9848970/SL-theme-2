import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';
const ContactMap = ({id}) => {
    const [map, setMap] = useState("");
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchInstituteDetails(id)
            .then((data) => {
                if (data.status === "Success") {
                    setMap(data.response.mapEmbed);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if(status){
         return (
        <>
            <div className="mb-5" dangerouslySetInnerHTML={{ __html: map.replace("width=\"600\"","width=\"100%\"") }}/>
        </>
    )
    } else{
        return(<></>)
    }
}
export default ContactMap;