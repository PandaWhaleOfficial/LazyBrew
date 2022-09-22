import React, { useState } from 'react';


const BreweryItem = ({ brewery }) => {
  const [showSpecificBrewery, setShowSpecificBrewery] = useState({})
  //currently prop drilling brewery info into this rendering 
  //  
  return (

    <div className='breweryItem'>
      <div className='box header'><h3>{brewery.name}</h3></div>
      <div className='box content'><b>Phone:</b></div>
      {/* if brewery object has phone number, render the phone number, else display "No phone number provided" */}
      {brewery.phone ? (<div className='box content'>{brewery.phone}</div>) : (<div className='box content'>No phone number provided</div>)}
      <div className='box content'><b>Address:</b></div>
      {/* conditionals for the rest of the informaiton */}
      {brewery.street ? (<div className='box content'>{brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</div>) : (<div className='box content'>No address Provided</div>)}
      <div className='box content'><b>Website:</b></div>
      {brewery.website_url ? (<div className='box content'><a href={brewery.website_url}>{brewery.website_url}</a></div>) : (<div className='box content'>No website provided</div>)}
    </div>

  )
};

export default BreweryItem;