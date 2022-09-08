import React from 'react';
import AppleLogin from 'react-apple-login'
import './App.css';

function App() {
  return (
    <div className="App">
        <AppleLogin  
        clientId={"com.react.apple.login"} 
        redirectURI={"https://redirectUrl.com"}   
        responseType={"code"} 
        responseMode={"query"}  
        usePopup={false} 
        designProp={
          {
             height: 30,
             width: 140,
             color: "black",
             border: false,
             type: "sign-in",
             border_radius: 15,
             scale: 1,
             locale: "en_US", 
           }
         }
      />
    </div>
  );
}

export default App;
