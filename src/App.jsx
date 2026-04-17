import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HotelProvider } from './context/HotelContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Dining from './pages/Dining';
import Events from './pages/Events';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Press from './pages/Press';
import AdminDashboard from './pages/AdminDashboard';
import FrontDesk from './pages/FrontDesk';
import StaffTasks from './pages/StaffTasks';
import AdminReservations from './pages/AdminReservations';
import AdminHousekeeping from './pages/AdminHousekeeping';
import AdminMaintenance from './pages/AdminMaintenance';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import ManagerDashboard from './pages/ManagerDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import StaffDashboard from './pages/StaffDashboard';
import NewBooking from './pages/NewBooking';
import StaffRequest from './pages/StaffRequest';
import MaintenanceLog from './pages/MaintenanceLog';

// Helper component to handle conditional layout
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPath = path === '/signin' || path === '/signup';
  const isAdminPath = path.startsWith('/admin') || path.startsWith('/staff') || path.startsWith('/dashboard');

  const hideChrome = isAuthPath || isAdminPath;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideChrome && <Navbar />}
      <div className="flex-grow">
        {children}
      </div>
      {!hideChrome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <HotelProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Guest Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press" element={<Press />} />

            {/* Management Portal Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/front-desk" element={<FrontDesk />} />
            <Route path="/admin/reservations" element={<AdminReservations />} />
            <Route path="/admin/housekeeping" element={<AdminHousekeeping />} />
            <Route path="/admin/maintenance" element={<AdminMaintenance />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/new-booking" element={<NewBooking />} />
            <Route path="/admin/maintenance-log" element={<MaintenanceLog />} />

            {/* Role-Based Dashboard Routes */}
            <Route path="/dashboard/manager" element={<ManagerDashboard />} />
            <Route path="/dashboard/receptionist" element={<ReceptionistDashboard />} />
            <Route path="/dashboard/staff" element={<StaffDashboard />} />

            {/* Staff specific tool routes */}
            <Route path="/staff/tasks" element={<StaffTasks />} />
            <Route path="/staff/request" element={<StaffRequest />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </HotelProvider>
  );
}

export default App;
