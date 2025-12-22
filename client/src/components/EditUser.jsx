import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
 
export default function EditUser() {
  const [errorMessages, setErrorMessages] = useState([]);
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("Editing user with ID:", id);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //get user data by id being passed in url
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/${id}`);
        const data = await response.json();
        // You might want to set the fetched data to state here to populate the form
        console.log("Fetched user data:", data);
        setUserData({
          name: data.name,
          email: data.email,
          password: "", // Do not pre-fill password for security reasons
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();
      console.log("Update response data:", data);
      if (data.errors) {
        setErrorMessages(data.errors);  // <-- show messages
        return;
      }

      if (data.success) {
        alert("User updated successfully!");
        navigate("/dashboard");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Name
          </label>
         {errorMessages.find(err => err.path === "username") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessages.find(err => err.path === "username").msg}
                  </p>
                )}
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border rounded"
            defaultValue={userData.name || ""}
             
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          {errorMessages.find(err => err.path === "email") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessages.find(err => err.path === "email").msg}
                  </p>
                )}
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            defaultValue={userData.email || ""}
             
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
         
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded"
            defaultValue=""
             
          />

          <input type="hidden" name="id" defaultValue={id} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
