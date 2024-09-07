import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CustomerDetails() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Use useParams to get route params

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) return <p>Loading customer details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!customer) return <p>No customer found</p>;

  return (
    <div>
      <h2>Customer Details</h2>
      <p>First Name: {customer.firstName}</p>
      <p>Last Name: {customer.lastName}</p>
      <p>Phone: {customer.phoneNumber}</p>
      <p>Email: {customer.email}</p>
      <p>Address: {customer.address}</p>
    </div>
  );
}

export default CustomerDetails;
