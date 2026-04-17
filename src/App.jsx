import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HotelProvider } from './context/HotelContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Dining from './pages/Dining';
import Events from './pages/Events';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import FrontDesk from './pages/FrontDesk';
import StaffTasks from './pages/StaffTasks';

function App() {
  return (
    <HotelProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Guest Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />

              {/* Management Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/front-desk" element={<FrontDesk />} />
              <Route path="/admin/reservations" element={<FrontDesk />} /> {/* Reusing FrontDesk for reservations view */}
              <Route path="/staff/tasks" element={<StaffTasks />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </HotelProvider>
  );
}

export default App;
