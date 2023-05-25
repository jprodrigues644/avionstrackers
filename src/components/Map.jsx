import React, { useEffect, useRef} from 'react';
import { fetchFlight } from '../models/FlightModel';
import { baseUrl } from '../utils/apiUtils';

const Map = () => {
  //const [change, setChange] = useState('react');
  const mapRef = useRef(null);
  
  // setInterval(()=>{ setChange(change + 1 )}, 3000 )
  useEffect(() => {
    const initMap = async() => {
      const mapOptions = {
        center: { lat: 48, lng: 2 },
        zoom: 4,
        title: 'Avions Trackers',
        mapTypeId: "satellite",
      }; 
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      const dataFlights = await fetchFlight();
      const infoWindow = new window.google.maps.InfoWindow();
      const svgMarker = {
        path: "m 124.5,1060.3622 0,1 -5.5,-1 0,3 2,1.2222 0,0.7778 -6,0 0,-0.7778 2,-1.2222 0,-3 -5.5,1 0,-1 5.5,-3 c 0,0 0,-1.7036 0,-3 0,-0.7777 0.22222,-2 1,-2 0.77777,0 1,1.2223 1,2 0,1.2964 0,3 0,3 z",
        fillColor: "yellow",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1.25,

      }; 
      if(dataFlights) {
        
      let i = 0
      for ( let plane of dataFlights){
        
        if(i<500) {  // to reduce the number of tht flights and reduce the execution time
         const markerFlight = {
         
          position: { lat: parseFloat(plane["latitude"]), lng: parseFloat(plane["longitude"]) }, 
          map: map,
          title: `Plane ${plane["callsign"]}`,
          icon: {
            ...svgMarker,
            rotation: plane["track"],
          }        
         
          }; 

        const mFlight = new window.google.maps.Marker(markerFlight);
      

        // Listener to click event on marker
        const contentString =
       '<div class="infowindow">'+
        "<table>" +
         "<tr>" +
           `<td> <h2>${plane["callsign"]}</h2> </td>` +
            
         " </tr>"  +
         "<tr>" +
         `<td>Origin: ${plane["origin"]}</td>` +
         
         "</tr>" +
         "<tr>" +
          "<td>Route: Not available yet</td>"+
          "<td><une valeur></td>" +
          "</tr>" +
          "<tr>"  +
            "<td>Model Code:</td>" +
            `<td> ${plane["icao24"]}</td>` +
         "</tr>"+
          "<tr>"+
            "<td>Longitude:</td>" + 
           ` <td> ${parseFloat(plane["longitude"]) }</td> `+
          "</tr>" +
          "<tr>" +
            "<td>Latitude:</td>"+
            `<td>${plane["latitude"]} </td>`+
          "</tr>" +
          "<tr>"+
           " <td>Velocity:</td>"+
           `<td>${plane["velocity"]}m/s</td> `+
          "</tr>" +
       "<tr>" +
            "<td>Track:</td>" +
            `<td>${plane["track"]}°</td>` +
          "</tr>" +
          "<tr>" +
            "<td>Geometric Altitude:</td>" +
            ` <td>${plane["geo_altitude"]} m</td>` +
          "</tr>" +
          "<tr>" +
            "<td>Barometric Altitude:</td>" +
            `<td>${plane["baro_altitude"]} m</td>` +
          "</tr>" +
          "<tr>" +
            "<td>Squawk:</td>" +
            ` <td>${plane["squawk"]}</td>` +
          "</tr>" +
        "</table>" +
      "</div> "
         
          mFlight.addListener("click", () => {
          infoWindow.setContent(contentString);
          infoWindow.open({
            anchor:mFlight,
            map : map,
         })
         
        });
        i++;
      }
    } 
         
      } 
    }
 
    if (!window.google) {
      // Load the Google Maps script if it's not already loaded
      const script = document.createElement('script');
      script.src = baseUrl();
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
     
      initMap();
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '51.8rem' }} />;
};

export default Map;