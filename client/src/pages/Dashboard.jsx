import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
export default function Dashboard() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
 const apiUrl = import.meta.env.VITE_API_URL;
  const handleDelete = async (userId) => {
    if(!confirm("Are you sure to delete this user")) return;
    try{
        const res = await fetch(`${apiUrl}/users/delete/${userId}`, {
            method: 'DELETE',
        });
        const data = await res.json(); // Parse the JSON response
        if(res){
            setUsers(users.filter(user => user._id !== userId));
            alert(data.message || "User deleted successfully");
        } else {
            alert("Failed to delete user");
        }
    }catch(error){
        alert("An error occurred while deleting the user."+error.message);
    }
    // alert(`Delete user with ID: ${userId} (Functionality not implemented)`);
    };

  useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    navigate("/login");
    return;
  }

  fetch(`${apiUrl}/users/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(res => {
      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then(data => {
      setUsers(data.data);
    })
    .catch(err => {
      console.error(err.message);
    });
}, [navigate]);


  return (
  
    <div className="p-6 bg-white rounded-lg shadow-md">

        <menu>
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div>
            <Link to="/createUser" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mr-2">Create User</Link>
            <button onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </div>
        </nav>
    </menu>
     {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
      <div className="bg-white shadow rounded p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  {new Date(user.date).toLocaleString()}
                </td>
                <td className="p-2 border">
                    <button onClick={ ()=> handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                     <Link to={`/editUser/${user._id}`} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 ml-2">Edit</Link>
                    
                 </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    )}
    </div>
        
  );
}
