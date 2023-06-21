import { ResponseFlightAPI} from '../utils/apiUtils.js';
export const fetchFlight = async () => {
  const response = await (ResponseFlightAPI());
  const planes = [];
  for (let plane in  response["data"]["states"]) {
    const icao24 =response["data"]["states"][plane][0]
    const callsign = response["data"]["states"][plane][1] ;
    const origin_country = response["data"]["states"][plane][2] ;
    const longitude =response["data"]["states"][plane][5] ;
    const latitude = response["data"]["states"][plane][6] ;
    const velocity = response["data"]["states"][plane][9] ;
    const track  = response["data"]["states"][plane][10];
    const geo_altitude = response["data"]["states"][plane][13];
    const baro_altitude = response["data"]["states"][plane][7];
    const squawk = response["data"]["states"][plane][14] ;
    planes.push({
      icao24: icao24,
      callsign : callsign,
      origin : origin_country,
      longitude: longitude,
      latitude: latitude,
      velocity : velocity,
      track : track,
      geo_altitude: geo_altitude,
      baro_altitude: baro_altitude,
      squawk : squawk   
              });
       }
      return planes;
};
