import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './context/AuthProvider/AuthProvider';
import Explore from './Pages/Explore/Explore/Explore';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import Contact from './Pages/Contact/Contact';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import Pay from './Pages/Dashboard/Pay/Pay';
import Review from './Pages/Dashboard/Review/Review';
import ManageAllOrders from './Pages/Dashboard/ManageAllOrders/ManageAllOrders';
import AddProducts from './Pages/Dashboard/AddProducts/AddProducts';
import ManageProducts from './Pages/Dashboard/ManageProducts/ManageProducts';
import ManageUsers from './Pages/Dashboard/ManageUsers/ManageUsers';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home animate={true} />} />
            <Route path="/home" element={<Home animate={true} />} />
            <Route path="/login" element={<Login animate={true} />} />
            <Route path="/register" element={<Register animate={true} />} />
            <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route index element={<PrivateRoute><MyOrders /></PrivateRoute>} />
              <Route path="payment" element={<PrivateRoute><Pay /></PrivateRoute>} />
              <Route path="review-us" element={<PrivateRoute><Review /></PrivateRoute>} />
              <Route path="manage-all-orders" element={<AdminRoute><ManageAllOrders /></AdminRoute>} />
              <Route path="add-new-products" element={<AdminRoute><AddProducts /></AdminRoute>} />
              <Route path="manage-products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
              <Route path="manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            </Route>
              
            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;