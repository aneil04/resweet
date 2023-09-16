import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

let people = {

}


let recipients = "Farooq-Khan-17"
let amount = 5 

let s1 = "https://venmo.com/?txn=charge&audience=public&recipients=" + recipients + "&amount=" + amount + "&note=ThisisyourbillsplitbyResweet!"
console.log(s1)

