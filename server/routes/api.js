const Router = require('express');
const hotelController = require('../controllers/hotelController')
const router = Router();

router.use((req, res, next) => {
  console.log(`server/routes/api.js: received request ${req.method} ${req.url}`);
  next();
});

router.get('/', hotelController.getAllHotels, (req, res) => {
  console.log(`server/routes/api.js.router.get('/'): received request ${req.method} ${req.url}`);
  res.status(200).json({ message: 'api router online' });
});

//route for hiding certain hotels
router.post('/', hotelController.postHotel, (req, res) => {
  console.log(`server/routes/api.js.router.post('/'): received request ${req.method} ${req.url}`);
  res.status(200).json({ message: 'api router online POST' });
});

//route for user sign in and load preferences
router.post('/signin', (req, res) => {
  res.status(200).json(console.log('hi'))
})



// router.put('/', hotelController.changeRecommendation, (req, res) => {
//   console.log(`server/routes/api.js.router.put('/'): received request ${req.method} ${req.url}`);
//   res.status(200).json({ message: 'api router online PUT' });
// });

router.put('*', (req, res, next) => {
  //create and change "recommendation" field
  console.log(`server/routes/example.js.router.put('/'): received request ${req.method} ${req.url}`);
  next();
}
);

// router.use((req, res) => {
//   console.log(`server/routes/api.js: handler not found for request ${req.method} ${req.url}`);
//   res
//     .status(404)
//     .json({
//       message: `API handler for ${req.method} ${req.url} not found`,
//     });
// });

module.exports = router;
