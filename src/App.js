import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Dashbord from './Componats/Dashbord/Dashbord';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashbord/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
