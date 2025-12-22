
import React,{useState} from 'react';


export default function CreateUser() {
   const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
 const [errorMessages, setErrorMessages] = useState([]);
 const apiUrl = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `${apiUrl}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password
        }),
      }
    );

    const data = await response.json(); // read backend JSON
    
    if (!response.ok) { console.log("Response data:", data.errors);
      // Backend validation errors
      if (data.errors) {
        setErrorMessages(data.errors);  // <-- show messages
      }
      return;
    }

    // If success
    console.log("User created:", data);
    setErrorMessages([]); // clear errors

  } catch (err) {
    console.error("Network error:", err);
  }
};



  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">  
        <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
        <form onSubmit={handleSubmit} >
          

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="username">Username</label> 
               
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.username}
                    onChange={handleChange}
                     
                />
                {errorMessages.find(err => err.path === "name") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessages.find(err => err.path === "name").msg}
                  </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.email}
                    onChange={handleChange}
                     
                />
                {errorMessages.find(err => err.path === "email") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessages.find(err => err.path === "email").msg}
                  </p>
                )}

            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.password}
                    onChange={handleChange}
                     
                />
                {errorMessages.find(err => err.path === "password") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessages.find(err => err.path === "password").msg}
                  </p>
                )}
            </div>
            <button
                type="submit"
                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create User
            </button>
        </form>
    </div>
  );
}