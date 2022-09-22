import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
const WorldMap = ({ hotelCoordinate, isLoading, initialCoordinate, coordinateBrewery }) => {
    const [coordinate, setCoordinate] = useState({ lat: 40.724852, lng: -74.035839 })
    return (
        <div className='map'>
            <Map
                google={google}
                style={{ width: '30%', height: '40%' }}
                zoom={10}
                center={initialCoordinate || coordinate}
                // initialCenter={
                //     {
                //         lat: 40.724852,
                //         lng: -74.035839
                //     }
                // }
                initialCenter={coordinate}
            >

                {isLoading && hotelCoordinate.map((ele, i) => {
                    // console.log(hotelCoordinate)
                    return (
                        <Marker
                            icon='https://www.pradipdebnath.com/wp-content/uploads/2019/12/map-marker-icon.png'
                            position={ele}
                        />
                    )
                })}
                {isLoading && coordinateBrewery.map((ele, i) => {
                    return (
                        <Marker
                            icon='https://www.pradipdebnath.com/wp-content/uploads/2019/12/restaurant.png'
                            position={ele}
                        />
                    )
                })}

            </Map>
        </div >
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDO3KoHcxFb9mRwNHIatsjtobVYqBKzm_s'
})(WorldMap)