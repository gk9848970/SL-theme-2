import React from 'react'
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
export default function Map(){
    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 25.7582,
        lng: 75.3818,
    }
    const zoomLevel=11;
    return(<>
        <div style={{ height:'70vh', width: '80%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCaKEpbkxHXNUbAYSLb6srTGo-j_XBzjx8' }}
                defaultCenter={location}
                defaultZoom={15}
            >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                    text={location.address}
                />
            </GoogleMapReact>
        </div>
    </>)
}