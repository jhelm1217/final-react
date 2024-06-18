import { Link } from "react-router-dom"
import Navbar from "./NavBar";

function App () {
  return (
  <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
      <div className="container" style={{ backgroundColor: 'darkslategrey', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <div className="text" style={{ color: 'white' }}>
            Where are you traveling to today?
          </div>
      </div>
      </div>
      
    </>
  );
}

export default App


