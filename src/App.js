import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserDetails from './UserDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<UserList />} />
          <Route exact path="/user/:login" element={<UserDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;