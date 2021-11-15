import axios from 'axios';

var options = {
  method: 'GET',
  url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
  params: {
    street: '12 West 4th Street',
    city: 'New York City',
    state: 'NY',
    postalcode: '10012',
    country: 'USA',
    'accept-language': 'en',
    polygon_threshold: '0.0'
  },
  headers: {
    'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
    'x-rapidapi-key': 'c391936260mshf237cc990d85fa9p1b1115jsn7a7ef5b6d827'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});