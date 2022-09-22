import React, { useState, useEffect } from 'react';
import BreweryItem from './BreweryItem';

// build component that renders HotelList[i].BreweryList

// inside the return loop through list of breweries and create a brewery feed item for each element

const BreweryFeed = ({ele}) => {
    return(
        <div className = "breweryContainter">
            {ele.breweryList.map((el, index) => {
                return <BreweryItem 
                    brewery={el} 
                    key={`breweryFeed ${index}`} 
                />;
            })}
        </div>
    )
}



export default BreweryFeed