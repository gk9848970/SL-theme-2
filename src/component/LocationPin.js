import React from 'react'
export default function LocationPin({text}){
    return(
        <>
            <div className="pin">
                <i class="fas fa-map-marker-alt" style={{fontSize:'36px',color:'black'}}></i>
                <p className="pin-text text-center">{text}</p>
            </div>
        </>
    )
   

}