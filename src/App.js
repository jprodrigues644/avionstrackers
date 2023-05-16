
import Map from "./components/Map";

function App() {
  const  apiKey = "AIzaSyCeYWIlAdb6ZEJrj_Zj33lpkcYDizbex9c" ;
  return (
    <div className="App">
      
      <Map apiKey={apiKey} /> 
    </div>
  );
}

export default App;
