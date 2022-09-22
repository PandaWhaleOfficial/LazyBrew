import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'; 
import BreweryFeed from './BreweryFeed';

const HotelItem = ({brewDone, setBrewDone, i, ele }) => {
   

    return (
      <div>
        <div className = 'hotelItem' key={i}> 
          <div className='hotelInfo'> 
            <div className='hotel header'><h2>{ele.name}</h2></div>
            <div className='hotel content'><b>Nearby Breweries:</b></div>
            <div className='hotel content'>{ele.breweryListLength}</div>
            <div className='hotel content'><b>Hotel Rating:</b></div>
            <div className='hotel content'>{ele.starRating}/5</div>
            <div className='hotel content'><b>Address:</b> </div>
            {/* if there's an address, display it */}
            {ele.address.streetAddress ? (<div className='hotel content'>{ele.address.streetAddress}, {ele.address.locality}, {ele.address.region}, {ele.address.postalCode}</div>) : (<div className='hotel content'>No address provided</div>)}
          </div>  
          <div className='hotelImage'>
            <img src={ele.optimizedThumbUrls['srpDesktop']}></img>
          </div>
          <div className='infoButtons'>
            <Button onClick={(e) => { hideHotel(ele.name, i) }}>Hide hotel</Button>
            <Button id={i} onClick={(e) => { setBrewDone(prevBrew => ({ ...prevBrew, [i]: !brewDone[i] })) }}>
            {!brewDone[i] && ('Click me to show breweries')}
            {brewDone[i] && ('Click me to hide breweries')}
            </Button>
            {brewDone[i] && (<div>
               <BreweryFeed
                ele = {ele}
                />
            </div>)}
            </div>  
        </div>
        <div className="hotel content">
          <b>Nearby Breweries:</b>
        </div>
        <div className="hotel content">{ele.breweryListLength}</div>
        <div className="hotel content">
          <b>Hotel Rating:</b>
        </div>
        <div className="hotel content">{ele.starRating}/5</div>
        <div className="hotel content">
          <b>Address:</b>{' '}
        </div>
        {/* if there's an address, display it */}
        {ele.address.streetAddress ? (
          <div className="hotel content">
            {ele.address.streetAddress}, {ele.address.locality},{' '}
            {ele.address.region}, {ele.address.postalCode}
          </div>
        ) : (
          <div className="hotel content">No address provided</div>
        )}
      
      <div className="hotelImage">
        <img src={ele.optimizedThumbUrls['srpDesktop']}></img>
      </div>
      <div className="infoButtons">
        <Button
          onClick={(e) => {
            hideHotel(ele.name, i);
          }}
        >
          Hide hotel
        </Button>
        <Button
          id={i}
          onClick={(e) => {
            setBrewDone((prevBrew) => ({ ...prevBrew, [i]: !brewDone[i] }));
          }}
        >
          {!brewDone[i] && 'Click me to show breweries'}
          {brewDone[i] && 'Click me to hide breweries'}
        </Button>
        <Button
          onClick={() => {
            // favHotel(userData);
            favHotel(ele);
          }}
        >
          Favorite Hotel
        </Button>
      </div>
    </div>
  );
};

export default HotelItem;

// {
//   ele: ele,
//   userData: userData
// }
