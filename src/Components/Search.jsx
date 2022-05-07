import React,{useState} from 'react'

export default function Search(props) {

const [CityName, setCityName] = useState('')
const [CityData, setCityData] = useState([])

async function SearchWeather(){
   await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {setCityData(result); addDataToTheMainHook(CityData)
});   
}

function addDataToTheMainHook(d){
  props.saveNewLocation(d);
}

  return (
    <div>
        <h3>Enter City:</h3>
        <input type='text' placeholder='City' id='city' onChange={(e) => setCityName(e.target.value)} />
        <button id='ChangePlace' onClick={SearchWeather}>Submit</button>
    </div>
  )
}
