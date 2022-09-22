import React, { useEffect } from 'react';
import MainContainer from './containers/MainContainer';
import jwt_decode from 'jwt-decode';
import './styles.scss';
import WorldMap from './containers/WorldMap';
import axios from 'axios';
// import pandalogo from '/images/panda.png'
// console.log(panda)
// <img src="/images/panda.png"/>

const App = () => {
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ', response.credential);
    let userObject = jwt_decode(response.credential);
    console.log('this is the decoded userObject', userObject);
    //POST request to the backend api.js file sending the userObject data as the body
    axios.post('/api/signin', userObject) // Sending entire google object to the back end
    //needs more work for when backend sends information

  }
  // axios({
  //   method: 'post',
  //   url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
  //   // Set the content type header, so that we get the response in JSON
  //   headers: {
  //        accept: 'application/json'
  //   }
  // }).then((response) => {
  //   access_token = response.data.access_token
  //   res.redirect('/success');
  // })

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
        <img id="pandaImage" src="/images/newpanda.png"/>
        <div id="signInDiv"></div>
      </div>

      <div className="appContainer">
        {/* This g-signin2 div is a google sign in button div, you may need to move it */}
        {/* <div class="g-signin2" data-onsuccess="onSignIn"></div>  */}
        <div>
          <MainContainer />
        </div>
        {/* <div className='map'><WorldMap /></div> */}
      </div>
      <div className="footer">
        
      </div>
    </>
  );
};

export default App;
