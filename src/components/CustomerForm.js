import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, saveCustomer } from '../utils/api';
import './CustomerForm.css'; // Import your CSS file for styling

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
  });
  const [originalCustomer, setOriginalCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch customer details if an id is present
      getCustomerById(id)
        .then(data => {
          setCustomer(data);
          setOriginalCustomer(data.customer); // Set the original customer details for Customer Details
          setIsEditing(true);
        })
        .catch(err => {
          console.error('Error fetching customer:', err);
          setError('Error fetching customer');
        });
    } else {
      setIsEditing(false);
      setOriginalCustomer(null);
    }
  }, [id]);

  const validate = () => {
    const { firstName, lastName, phoneNumber, email } = customer;
    let errors = '';

    // Validate alphabetical characters
    if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
      errors = 'First name and Last name must contain only alphabetical characters.';
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      errors += ' Phone number must consist of 10 digits.';
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors += ' Invalid email format.';
    }

    setValidationErrors(errors);
    return errors === '';
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (isEditing) {
          // Update existing customer
          await saveCustomer(id, customer);
          setSuccessMessage('Customer updated successfully!');
        } else {
          // Add new customer
          await saveCustomer(null, customer);
          setSuccessMessage('Customer added successfully!');
        }
        navigate('/');
      } catch (err) {
        console.error('Error saving customer:', err);
        setError('Failed to save customer.');
      }
    }
  };

  return (
    <div className="customer-form-container">
      <h1>{isEditing ? 'Edit Customer' : 'Add Customer'}</h1>
      {error && <p className="error">{error}</p>}
      {validationErrors && <p className="error">{validationErrors}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      {isEditing && originalCustomer && (
        <div className="customer-details">
          <h2>Customer Details</h2>
          <div className="details">
            <p><strong>First Name:</strong> {originalCustomer.firstName}</p>
            <p><strong>Last Name:</strong> {originalCustomer.lastName}</p>
            <p><strong>Phone Number:</strong> {originalCustomer.phoneNumber}</p>
            <p><strong>Email:</strong> {originalCustomer.email}</p>
            <p><strong>Address:</strong> {originalCustomer.address}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-section">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={customer.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={customer.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? 'Update Customer' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
