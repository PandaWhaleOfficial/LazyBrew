import React, { useState, useEffect } from 'react';
import BreweryItem from './BreweryItem';

// build component that renders HotelList[i].BreweryList

// inside the return loop through list of breweries and create a brewery feed item for each element
// TODO update PARAMETER with brewery array
const BreweryFeed = ({PARAMETER}) => {
    return(
        <div className = "breweryContainter">
            {PARAMETER.map((el, index) => {
                return <BreweryItem post = {el} key={index} />;
            })}
        </div>
    )
}



export default BreweryFeed