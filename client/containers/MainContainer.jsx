import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import axios from 'axios';
import Hotel from './Hotel';
import WorldMap from './WorldMap';
//library for calculating distance using longitude/latitude
var geodist = require('geodist');

const mapStateToProps = (state) => ({});

const MainContainer = () => {
  const [hotelList, setHotelList] = useState([]);
  const [hotelDone, setHotelDone] = useState(false);
  const [hotelCoordinate, setHotelCoordinate] = useState([]);
  const [initialCoordinate, setInitialCoordinate] = useState({});
  const [brewDone, setBrewDone] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedCity, setCity] = useState('');
  const [coordinateBrewery, setCoordianteBrewery] = useState([]);
  const [hotelResultNumber, setHotelResultNumber] = useState(5);

  //fetch request for hotels with check in/check out dates pertaining to city selected
  const getHotelData = () => {
    let checkIn = checkInDate.split('/').reverse().join('-');
    let checkOut = checkOutDate.split('/').reverse().join('-');
    const optionsProperties = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/properties/list',
      params: {
        destinationId: selectedCity,
        pageNumber: '1',
        pageSize: hotelResultNumber,
        checkIn: checkIn,
        checkOut: checkOut,
        adults1: '1',
        sortOrder: 'starRatings',
        locale: 'en_US',
        currency: 'USD',
      },
      headers: {
        //have to reapply for the API key when fetch no longer works: https://rapidapi.com/apidojo/api/hotels4
        //example: AXIOS error code
        'X-RapidAPI-Key': 'a3d20fff95mshf7a26c3d8f9e65cp1b474bjsn3fd4a5e652e7',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      },
    };
    setIsLoading(false);

    axios
      .request(optionsProperties)
      .then((response) => {
        let propertiesResult = response.data.data.body.searchResults.results;
        let coordinateForHotels = [];
        for (let i = 0; i < propertiesResult.length; i++) {
          let coordinateObj = {
            lat: propertiesResult[i].coordinate.lat,
            lng: propertiesResult[i].coordinate.lon,
          };
          coordinateForHotels.push(coordinateObj);
        }
        setHotelCoordinate(coordinateForHotels);
        return propertiesResult;
      })
      .then((apiHotelList) => {
        setInitialCoordinate({
          lat: apiHotelList[0].coordinate.lat,
          lng: apiHotelList[0].coordinate.lon,
        });
        let finalHotelData = [];
        for (let i = 0; i < apiHotelList.length; i++) {
          const optionsBreweries = {
            method: 'GET',
            url: `https://api.openbrewerydb.org/breweries?by_dist=${apiHotelList[i].coordinate.lat},${apiHotelList[i].coordinate.lon}&per_page=10`,
          };
          let oneProperty = apiHotelList[i];
          //based on hotel longitude/latitude, fetch request for breweries within 2 miles radius
          axios.request(optionsBreweries).then((beerResponse) => {
            const breweryArray = [];
            for (let j = 0; j < beerResponse.data.length; j++) {
              let distanceFromHotel = geodist(
                {
                  lat: oneProperty.coordinate.lat,
                  lon: oneProperty.coordinate.lon,
                },
                {
                  lat: beerResponse.data[j].latitude,
                  lon: beerResponse.data[j].longitude,
                }
              );
              if (distanceFromHotel > 2) {
                break;
              }
              setCoordianteBrewery((breweryCurrent) => [
                ...breweryCurrent,
                {
                  lat: beerResponse.data[j].latitude,
                  lng: beerResponse.data[j].longitude,
                },
              ]);
            }
            oneProperty.breweryList = breweryArray;
            //use the number of number of breweries to sort hotel order by most breweries in the vacinity
            oneProperty.breweryListLength = breweryArray.length;
            // console.log(oneProperty)
            finalHotelData.push(oneProperty);
            setHotelList((current) => [...current, oneProperty]);
          });
        }
        return finalHotelData.length;
      })
      .then((finalData) => {
        //set state so that the page can rerender upon the promise fetch call completion
        setIsLoading(true);
      })
      .catch((e) => {
        console.error(e, 'hotels not compelte');
      });
  };

  return (
    <div className="holdingEverything">
      <section className="child">
        <div id="main_wrapper">
          <div>
            <h1 id="lazyBrew-header">Lazy Brew </h1>
            <span id="convenientFont">
              <b>by ConvenientFinds</b>
            </span>
          </div>
          <br />
          <label>Select Destination</label>/
          <select onChange={(e) => setCity(e.target.value)}>
            <option value="" >
              Select Your City
            </option>
            <option value={'1506246'}>New York</option>
            <option value={'1439028'}>Los Angeles</option>
            <option value={'1493604'}>San Francisco</option>
            <option value={'1633050'}>Hawaii</option>
            <option value={'780'}>Colorado</option>
          </select>
          <label>Check-in Date</label>
          <input
            type="date"
            onChange={(e) => setCheckInDate(e.target.value)}
          ></input>
          <label>Check-out Date</label>
          <input
            type="date"
            onChange={(e) => setCheckOutDate(e.target.value)}
          ></input>
          <Button
            onClick={(e) => {
              getHotelData();
          
              setHotelDone(true);
            
            }}
          >
            See Hotels
          </Button>
          <div id="allHotelsWrapper">
            {isLoading || <div>Loading...</div>}

            {hotelDone && (
              <Hotel
                setHotelList={setHotelList}
                hotelList={hotelList}
                hotelDone={hotelDone}
                brewDone={brewDone}
                setBrewDone={setBrewDone}
                setHotelDone={setHotelDone}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </section>
      {/* <section className="child">
        <WorldMap
          coordinateBrewery={coordinateBrewery}
          initialCoordinate={initialCoordinate}
          hotelCoordinate={hotelCoordinate}
          isLoading={isLoading}
        />
      </section> */}
    </div>
  );
};

export default connect(mapStateToProps, null)(MainContainer);


