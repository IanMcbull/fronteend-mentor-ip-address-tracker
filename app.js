let map = L.map('map');
const initMap = (lat, lng) => {
  map.setView([lat,lng], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([lat,lng]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
}

const uiUpdates = (ipAddress, location, timezone, isp) => {
  document.querySelector('.ip-address').innerHTML = ipAddress;
  document.querySelector('.location').innerHTML = location;
  document.querySelector('.timezone').innerHTML = timezone;
  document.querySelector('.isp').innerHTML = isp;
}

const geoIpifyApiCall = async (ipAddress=undefined) => {
  const apiKey = "at_dGnuwdwEI6yAquH9G7GzUTc9MuDaT";
  if(ipAddress){
    console.log(ipAddress)
    try {
      const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`)
      const data = await request.json();
      console.log(data)
      let locationDetails = `${data.location.region},${data.location.country}  ${data.location.geonameId}`;
  
      uiUpdates(data.ip, locationDetails, data.location.timezone, data.isp)
      initMap(data.location.lat, data.location.lng);
    } catch (err) {
      console.log(err)
    }
  }else{
    console.log("No ip address")
    try {
      const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`)
      const data = await request.json();
      let locationDetails = `${data.location.region},${data.location.country}  ${data.location.geonameId}`;
      uiUpdates(data.ip, locationDetails, data.location.timezone, data.isp)
      initMap(data.location.lat, data.location.lng);
    } catch (err) {
      console.log(err)
    }
  }
}
const getUserIPInfo = (e) =>{
  e.preventDefault();
  const ipAddress = document.querySelector('.form-control').value;
  geoIpifyApiCall(ipAddress)
  console.log('User information is being submitted')
}


// Listen for a submit event on the form
document.querySelector('form').addEventListener('submit',getUserIPInfo)

// https://geo.ipify.org/api/v2/country,city?apiKey=at_dGnuwdwEI6yAquH9G7GzUTc9MuDaT&ipAddress=8.8.8.8
//Load wi
window.onload = (e) => {
  geoIpifyApiCall()
}