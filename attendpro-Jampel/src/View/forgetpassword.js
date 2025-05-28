// ResetPassword.js
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null); // State to store the fetched data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/routes/resetP',{data});
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/routes/reset', { email });

      console.log(response)
      if (response.status === 200) {
        alert('Recovery email sent'); // Display the alert
        navigate('/signin'); // Redirect to the login page
      } else {
        alert('Error sending email. Please try again.');
      }
    } catch (error) {
      console.error('Error during request:', error);
      alert('Error sending email. Please try again.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form id="resetForm" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
