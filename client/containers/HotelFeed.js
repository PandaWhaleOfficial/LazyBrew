import React, { useState, useEffect } from "react";
import BreweryFeed from "./BreweryFeed.js";
import HotelItem from "./HotelItem.js";
import axios from "axios";

const HotelFeed = ({ hotelList, setBrewDone, brewDone, userData }) => {
  /*
  *** working on state management/loading api process to be more clean ***
  1) we need a button for hide or show on HOTEL
  2) we need a button for hide or show on BREWERY
  3) map showing
  4) slider
  */
  const [exclusionList, setExclusionList] = useState([]);

  //hook to hide/show hotels after button is clicked
  const [specificHotel, setSpecHotel] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  });

  // on intial render, access all hotels from DB & add to exclusionListPush array
  useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then((dbResponse) => {
        let exclusionListPush = [];
        for (let i = 0; i < dbResponse.data.length; i++) {
          exclusionListPush.push(dbResponse.data[i].nameOfHotel);
        }
        setExclusionList(exclusionListPush);
      })
      .catch((e) => {
        console.error("error is here");
      });
  }, []);

  //handler for user to hide hotels not interested in
  function hideHotel(name, i) {
    // setState to change / test to see if it will hide or show
    setSpecHotel((prevHotels) => ({ ...prevHotels, [i]: !specificHotel[i] })); //overwrites the specific hotel at key value of i to be false
    try {
      axios.post("http://localhost:3000/api", {
        nameOfHotel: name,
        action: "exclude",
      });
    } catch (err) {
      console.log(err, "err");
    }
  }

  function favHotel(ele) {
    console.log(ele);
    console.log("hotel_name:", ele.name);
    console.log("hotel_id:", ele.id);

    fetch("http://localhost:3000/api/favHotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hotel_name: ele.name, hotel_id: ele.id }),
    })
      .then((res) => console.log("made it inside handler"))
      .then((data) => {
        console.log("this is data from favHotel event handler:", data);
      })
      .catch((error) => console.log("error in hotelItem front post", error));
  }

  return (
    <div className="hotelFeed">
      {hotelList.map((el, index) => {
        return (
          <HotelItem
            //post={el}
            userData={userData}
            favHotel={favHotel}
            hideHotel={hideHotel}
            ele={el}
            key={`hotelFeed ${index}`}
            i={index}
            setBrewDone={setBrewDone}
            brewDone={brewDone}
          />
        );
      })}
    </div>
  );
};
export default HotelFeed;
