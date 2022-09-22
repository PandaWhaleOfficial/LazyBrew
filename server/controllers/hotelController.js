const Hotel = require('../models/hotelModel');
const { createErr } = require('../utils/utils');
const axios = require('axios')

const hotelController = {};

    //backend handlers 
    //if profile is available in the database, then load user preference
      //if not, create empty user profile in database

// user Mongoose find
hotelController.getAllHotels = (req, res, next) => {
  Hotel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
}
hotelController.postHotel = async (req, res, next) => {
  console.log(req.body)
  try {
    Hotel.create({
      nameOfHotel: req.body.nameOfHotel,
      action: req.body.action
    })
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getAllusers',
        type: 'db query error',
        err,
      })
    );
  }
};

// hotelController.postBreweryRecommendation = async (req, res, next) => {
//   console.log(req.body)
//   try {
//     Hotel.create({
//       nameOfUser: req.body.nameOfUser,
//       nameOfBrewery: req.body.nameOfBrewery,
//       nameOfHotel: req.body.nameOfHotel,
//       statusOfBrewery: req.body.statusOfBrewery,
//       statusOfHotel: req.body.statusOfHotel,
//       created: req.body.created
//     })
//     return next();
//   } catch (err) {
//     return next(
//       createErr({
//         method: 'getAllusers',
//         type: 'db query error',
//         err,
//       })
//     );
//   }
// };

// hotelController.changeRecommendation = async (req, res, next) => {
//   console.log(req.body)
//   try {
//     await Hotel.findOneAndUpdate({ _id: req.body.id }, { statusOfBrewery: req.body.statusOfBrewery, statusOfHotel: req.body.statusOfHotel })
//     return next();
//   } catch (err) {
//     return next(
//       createErr({
//         method: 'getAllusers',
//         type: 'db query error',
//         err,
//       })
//     );
//   }
// };

// hotelController.getAllHotels = async (req, res, next) => {
//   try {
//     const optionsHotels = {
//       method: 'GET',
//       url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
//       params: { query: 'seattle', locale: 'en_US', currency: 'USD' },
//       // params: { query: req.body.city, locale: 'en_US', currency: 'USD' },
//       headers: {
//         'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
//         'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
//       }
//     };

//     axios.request(optionsHotels)
//       .then((response) => {
//         console.log(response.data.suggestions[1]['entities'], 'hotel response')
//       }
//       )
//     return next()
//   } catch (err) {
//     return next(
//       createErr({
//         method: 'getAllHotels',
//         type: 'db query error',
//         err,
//       })
//     );
//   }
// }

module.exports = hotelController;
