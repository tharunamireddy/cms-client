import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCustomers, deleteCustomer } from '../utils/api';
import './CustomerList.css'; // Add CSS file for styling

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      if (data.status === 'ok') {
        setCustomers(data.customers);
      } else {
        throw new Error('Failed to fetch customers');
      }
    } catch (error) {
      setError(`Error fetching customers: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      setError(`Error deleting customer: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="home-container">
      <h1>Customer List</h1>
      {error && <p className="error">{error}</p>}
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul className="customer-list">
          {customers.map(customer => (
            <li key={customer._id} className="customer-item">
              <div className="customer-info">
                <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phoneNumber}</p>
                <p><strong>Address:</strong> {customer.address}</p>
              </div>
              <div className="customer-actions">
                <Link to={`/edit/${customer._id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(customer._id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add" className="add-button">Add Customer</Link>
    </div>
  );
};

export default CustomerList;
