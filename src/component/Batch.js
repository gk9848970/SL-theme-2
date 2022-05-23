import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';
function Batch({id}) {
    const [batches, setBatches] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        api.fetchBatch(id)
            .then((data) => {
                if (data.status === "success") {
                    
                  console.log("BAtch",data.response);
                    setBatches(data.response);
                    setStatus(true);
                    
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    return (
        <div>
        <p className="heading text-center">Batch Management</p>
        <div className="container my-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Batch Name</th>
                <th scope="col">Batch Timing</th>
                <th scope="col">Subject</th>
              </tr>
            </thead>
            <tbody>
                  {
                batches.map(function (batch, index) {
                    return(<>
                    <tr key={index}>
                     <th scope="row">{index+1}</th>
                     <td>{batch.batch_name}</td>
                     <td>{batch.batch_timing}</td>
                     <td>{batch.batch_subject}</td>
                   </tr>
                    </>)
                })
                  }
            </tbody>
        </table>
        </div>
        </div>
    )
}

export default Batch
