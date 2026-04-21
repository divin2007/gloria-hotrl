import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HotelProvider, useHotel } from './context/HotelContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthGuard from './components/AuthGuard';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
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
import AdminInventory from './pages/AdminInventory';
import ManagerDashboard from './pages/ManagerDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import StaffDashboard from './pages/StaffDashboard';
import GuestDashboard from './pages/GuestDashboard';
import NewBooking from './pages/NewBooking';
import StaffRequest from './pages/StaffRequest';
import MaintenanceLog from './pages/MaintenanceLog';
import NotFound from './pages/NotFound';

// Helper component to handle conditional layout
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPath = path === '/signin' || path === '/signup' || path === '/login';
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

// Dashboard Redirect Component
const DashboardRedirect = () => {
  const { user, profile } = useHotel();
  if (!user) return <Navigate to="/signin" replace />;
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to={`/dashboard/${profile?.role || 'guest'}`} replace />;
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
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press" element={<Press />} />

            {/* General Protected Dashboard Entry */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Management Portal Routes (Admin only) */}
            <Route path="/admin" element={<AuthGuard requiredRole="admin"><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/front-desk" element={<AuthGuard requiredRole="admin"><FrontDesk /></AuthGuard>} />
            <Route path="/admin/reservations" element={<AuthGuard requiredRole="admin"><AdminReservations /></AuthGuard>} />
            <Route path="/admin/housekeeping" element={<AuthGuard requiredRole="admin"><AdminHousekeeping /></AuthGuard>} />
            <Route path="/admin/maintenance" element={<AuthGuard requiredRole="admin"><AdminMaintenance /></AuthGuard>} />
            <Route path="/admin/reports" element={<AuthGuard requiredRole="admin"><AdminReports /></AuthGuard>} />
            <Route path="/admin/settings" element={<AuthGuard requiredRole="admin"><AdminSettings /></AuthGuard>} />
            <Route path="/admin/inventory" element={<AuthGuard requiredRole="manager"><AdminInventory /></AuthGuard>} />
            <Route path="/admin/new-booking" element={<AuthGuard requiredRole="admin"><NewBooking /></AuthGuard>} />
            <Route path="/admin/maintenance-log" element={<AuthGuard requiredRole="admin"><MaintenanceLog /></AuthGuard>} />

            {/* Role-Based Dashboard Routes */}
            <Route path="/dashboard/manager" element={<AuthGuard requiredRole="manager"><ManagerDashboard /></AuthGuard>} />
            <Route path="/dashboard/receptionist" element={<AuthGuard requiredRole="receptionist"><ReceptionistDashboard /></AuthGuard>} />
            <Route path="/dashboard/staff" element={<AuthGuard requiredRole="staff"><StaffDashboard /></AuthGuard>} />
            <Route path="/dashboard/guest" element={<AuthGuard requiredRole="guest"><GuestDashboard /></AuthGuard>} />

            {/* Staff specific tool routes */}
            <Route path="/staff/tasks" element={<AuthGuard requiredRole="staff"><StaffTasks /></AuthGuard>} />
            <Route path="/staff/request" element={<AuthGuard requiredRole="staff"><StaffRequest /></AuthGuard>} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </HotelProvider>
  );
}

export default App;
