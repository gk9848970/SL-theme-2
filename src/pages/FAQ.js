import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';

export default function FAQ({id})  {
     const [faq, setFaq] = useState([]);
    const [status, setStatus] = useState(false);
   
    useEffect(() => {
        window.scrollTo(0, 0);
        api.fetchFaq(id)
            .then((data) => {
                if (data.status === "success") {
                    setFaq(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
//     console.log(faq);

    
    return (
        <div className="container">
			<div className="row">
				<div className="heading col-lg-12 text-center">
					<p >Frequently Asked Questions</p>
				</div>
				{faq.map((question,index)=>{
					return(<>
						<div className="col-lg-6 mt-3 mb-3">
					<p>
        			    <span style={{fontWeight:"500",fontSize:"1.5em"}}>{question.Question+" "}</span>
        			  <a className="" data-toggle="collapse" href={"#collapse"+index} role="button" aria-expanded="false" aria-controls="collapseExample">
					  <i style={{color:"black"}} className="fas fa-chevron-down" />
        			  </a>
        			
        			</p>
        			<div className="collapse" id={"collapse"+index}>
        			  <div className="card card-body">
						  {question.Answer}
					  </div>
        			</div>
					
				</div>
					</>)
				})}

				
			</div>
            
        </div>
    )
}
