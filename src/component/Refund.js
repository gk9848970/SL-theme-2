import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';

function Refund({ id, config}) {
    const [webDetail, setWebDetail] = useState({});
    api.fetchWebData(id)
            .then((data) => {
                setWebDetail(data.detail);
            })
            .catch((err) => {
                console.log(err);
            });
    
    return (
        <div style={{marginTop:'60px'}}>
                <div style={{padding:'100px'}}>
                    <b><u>Refund Policy</u></b>
                    
                    <p> 
                    {webDetail.institute_name} holds absolute and sole discretion and reserves the right to scholarships, incentives and schemes offered by it from time to time for specific categories of participants or based on specific dates or any other manner it may deem fit.
                    </p> 
                    <p>
                        If a participant wishes to withdraw from the Program either before the commencement of the session or subsequent to the commencement of the sessions, the participant will not be eligible for any refund of fees
                    </p> 
                    <p>
                    {webDetail.institute_name} reserves the absolute and sole discretion and right to accept or reject any request for
                    </p>
                    <p>
                        Change in batch and/or adjustment
                    </p>
                    <p>
                        Refund of amounts paid already for current/future batch
                    </p>
                    <p>
                        On any code of conduct violation or other exceptional circumstances, {webDetail.institute_name} has the absolute discretion and the right to refuse service or terminate any participant from attending further sessions. In such cases, {webDetail.institute_name} will withhold from the fees paid by the participant an amount proportionate to the service already rendered (time elapsed or sessions conducted) and refund the balance fees.  
                    </p>
                </div>
        </div>
    )
}

export default Refund;
