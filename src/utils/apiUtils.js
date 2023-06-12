import axios from 'axios';
import moment from 'moment';
const username = `${USER_NAME}`;
const password = `${PASSWORD}`;
const API = `${MAP_KEY}`;
let time = moment() ;
let timeUnix = time.unix();
const handleApiError = (error) => {
    console.error('API Error:', error);
    throw error;
  };
  const config = {
    auth: {
      username: username,
      password: password
    }, 
    params : {
      time : timeUnix
    }
  };
  

const BASE_URL = "https://opensky-network.org/api/states/all"; //  API base URL

export const ResponseFlightAPI = async () => {
    
    try {
    const response= await axios.get(BASE_URL, config);
          return response;
        } catch (error) {
      handleApiError(error);
      }
};


export const baseUrl = () => 
{
   return `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places`
}