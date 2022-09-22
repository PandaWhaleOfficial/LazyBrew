// import React, { useState, useEffect } from 'react';
// import Brewery from './BreweryItem';
// import { Button } from '@mui/material';
// import axios from 'axios'
// const Hotel = ({ hotelList, setBrewDone, brewDone }) => {

//   /*
//   *** working on state management/loading api process to be more clean ***
//   1) we need a button for hide or show on HOTEL
//   2) we need a button for hide or show on BREWERY
//   3) map showing
//   4) slider
//   */
//   const [exclusionList, setExclusionList] = useState([]);

//   //hook to hide/show hotels after button is clicked
//   const [specificHotel, setSpecHotel] = useState({
//     0: true,
//     1: true,
//     2: true,
//     3: true,
//     4: true,
//     5: true,
//     6: true,
//     7: true,
//     8: true,
//     9: true,
//   })

//   // on intial render, access all hotels from DB & add to exclusionListPush array
//   useEffect(() => {
//     axios.get('http://localhost:3000/api')
//       .then((dbResponse) => {
//         let exclusionListPush = []
//         for (let i = 0; i < dbResponse.data.length; i++) {
//           exclusionListPush.push(dbResponse.data[i].nameOfHotel)
//         }
//         setExclusionList(exclusionListPush)
//       })
//       .catch((e) => {
//         console.error('error is here')
//       })
//   }, [])

//   //handler for user to hide hotels not interested in
//   function hideHotel(name, i) {
//     // setState to change / test to see if it will hide or show
//     setSpecHotel(prevHotels => ({ ...prevHotels, [i]: !specificHotel[i] })); //overwrites the specific hotel at key value of i to be false
//     try {

//       axios.post('http://localhost:3000/api', {
//         nameOfHotel: name,
//         action: 'exclude'
//       })
//     } catch (err) {
//       console.log(err, 'err')
//     }
//   }

//   // ! lines 71 - 100 have been moved to HotelFeed.js, need to insert state to hotelFeed
//   return (
//     <div>
//       {/* sort the hotels by number of breweries with vacinity */}
//       {hotelList.sort((a, b) => {
//         return (a.breweryListLength > b.breweryListLength ? -1 : 1)
//       })
//         .filter((hotel) => !exclusionList.includes(hotel.name))
//         .map((ele, i) => {
//           if (specificHotel[i]) {
//             return (
//               <div className='hotelWrapper' key={i}>
//                 <div className='hotelGridContainer'>
//                   <div className='hotel header'><h2>{ele.name}</h2></div>
//                   <div className='hotel content'><b>Nearby Breweries:</b></div>
//                   <div className='hotel content'>{ele.breweryListLength}</div>
//                   <div className='hotel content'><b>Hotel Rating:</b></div>
//                   <div className='hotel content'>{ele.starRating}/5</div>
//                   <div className='hotel content'><b>Address:</b> </div>
//                   {/* if there's an address, display it */}
//                   {ele.address.streetAddress ? (<div className='hotel content'>{ele.address.streetAddress}, {ele.address.locality}, {ele.address.region}, {ele.address.postalCode}</div>) : (<div className='hotel content'>No address provided</div>)}
//                 </div>

//                 <div>
//                   <img src={ele.optimizedThumbUrls['srpDesktop']}></img>
//                 </div>
//                 <Button onClick={(e) => { hideHotel(ele.name, i) }}>Hide hotel</Button>
//                 <Button id={i} onClick={(e) => { setBrewDone(prevBrew => ({ ...prevBrew, [i]: !brewDone[i] })) }}>
//                   {!brewDone[i] && ('Click me to show breweries')}
//                   {brewDone[i] && ('Click me to hide breweries')}
//                 </Button>
//                 {brewDone[i] && (<div>

//                   {ele.breweryList.map((brewery, j) => {
//                     return (
//                       <Brewery key={`Brewery ${j}`} brewery={brewery} />
//                     )
//                   })}
//                 </div>)}
//               </div>
//             )
//           }

//         })}

//     </div>
//   )
// };

// export default Hotel;