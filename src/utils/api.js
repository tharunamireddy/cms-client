import axios from 'axios';

const API_URL = 'https://cms-server-7gd8.onrender.com/api/customers';

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const saveCustomer = async (id, customer) => {
  try {
    if (id) {
      // Update customer
      const response = await axios.put(`${API_URL}/${id}`, customer);
      return response.data;
    } else {
      // Create new customer
      const response = await axios.post(API_URL, customer);
      return response.data;
    }
  } catch (error) {
    console.error('Error saving customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};
