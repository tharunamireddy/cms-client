import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/add" element={<CustomerForm />} />
        <Route path="/edit/:id" element={<CustomerForm />} />
      </Routes>
    </Router>
  );
};

export default App;
