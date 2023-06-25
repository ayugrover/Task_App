import DisplayData from './Components/DiaplayData';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Details from './Components/Details';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={ <DisplayData/>}/>
          <Route exact path="/DisplayData/:id" element={ <Details/>}/>
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
