import React, { useEffect } from 'react';
import MainContainer from './containers/MainContainer';
import './styles.scss';
import WorldMap from './containers/WorldMap';

const App = () => {
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ', response.credential);
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
          <MainContainer />
        </div>
        {/* <div className='map'><WorldMap /></div> */}
      </div>
    </>
  );
};

export default App;
