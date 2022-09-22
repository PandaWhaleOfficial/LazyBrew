import React, { useEffect, useState } from 'react';
import MainContainer from './containers/MainContainer';
import jwt_decode from 'jwt-decode';
import './styles.scss';
import WorldMap from './containers/WorldMap';
import axios from 'axios';

const App = () => {

  const [ userData, setUserData ] = useState({});

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ', response.credential);
    let userObject = jwt_decode(response.credential);
    console.log('this is the decoded userObject', userObject);
    //POST request to the backend api.js file sending the userObject data as the body
    setUserData(userObject);
    // axios.post('/api/signin', userObject); // Sending entire google object to the back end
    //needs more work for when backend sends information
    // fetch('http://localhost:3000/api/signin',{
    //   method: 'POST',
    //   // Set the content type header, so that we get the response in JSON
    //   headers: {
    //       'Content-Type': 'application/json'
    //   }, 
    //   body: JSON.stringify(userObject)
    // }).then((response) => {
    //   console.log('success')
    // })
    try {
      axios.post('http://localhost:3000/api/signin', userObject
      );
    } catch (err) {
      console.log(err, 'err');
    }
  }


  useEffect(() => {
    // Do not delete the line below as it helps ignore errors
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '286287333964-pe8reemoflbc4ko1nlkuq40ull0r4hlg.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'), //This is DOM manipulation
      { theme: 'outline', size: 'large' }
    );
  }, []);

  return (
    <>
      <div className="App">
        <div id="signInDiv"></div>
      </div>

      <div className="appContainer">
        {/* This g-signin2 div is a google sign in button div, you may need to move it */}
        {/* <div class="g-signin2" data-onsuccess="onSignIn"></div>  */}
        <div>
          <MainContainer
          userData = {userData} />
        </div>
        <div className="map">
          <WorldMap />
        </div>
      </div>
    </>
  );
};

export default App;
