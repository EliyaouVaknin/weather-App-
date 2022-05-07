import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './Components/Weather'
import Search from './Components/Search';

function App() {

  //Hooks
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  //Functions
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])

  function saveNewLocation(d){
    setData(d);
    console.log(data)
  }
      
  return (
    <div className="App">
      <Search saveNewLocation={saveNewLocation} />
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
          // data.map( p => {
          //   return <Weather weatherData={p}/>
          // })
      ): (
        <div></div>
      )}
    </div>
  );
}

export default App;
