import React from 'react'
import * as api from '../Api';
import { useState, useEffect } from 'react';

export default function Acheivements({id})  {
     const [results, setResults] = useState([]);
    const [status, setStatus] = useState(false);
      useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        api.fetchAchievement(id)
            .then((data) => {
                if (data.status === "success") {
                    setResults(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // console.log(results);

    
    return (
        <div className="container mb-5">
			<div className="row">
				<div className="heading col-lg-12 text-center">
					<p >Student Acheivements</p>
				</div>
				{results.map((result,index)=>{
					return(<>
					<div key={index} className="applyShadow card" style={{width: '20rem',margin:"0 auto"}}>
                        <img style={{width:"100%",height:"350px"}} className="card-img-top w-100" src={result.image} alt="Card imagecap" />
                        <div className="card-body">
                        {result.name ? (<h4 className="card-title text-center">{result.name}</h4>):(null)}
                        {result.rank ? (<h5> Rank{"-"+result.rank}</h5>):(null)}
                        {result.marks ? (<h5>{result.marks+" Marks in "+result.class+" "+result.session+" "}</h5>):(null)}
                    
        </div>
      </div>
					</>)
				})}

				
			</div>
            
        </div>
    )
}
