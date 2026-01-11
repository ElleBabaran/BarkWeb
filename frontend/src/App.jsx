import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Students from './pages/Student';
import Schedules from './pages/Schedules';
import Detection from './pages/Detection';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/detection" element={<Detection />} />
      </Routes>
    </Router>
  );
}

export default App;