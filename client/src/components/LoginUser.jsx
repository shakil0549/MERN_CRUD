
import { useState,useEffect } from "react";
import { useNavigate  } from "react-router-dom";
export default function LoginUser() {

  const navigate  = useNavigate();
    const [errorMessages, setMessages] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        try {
            const response = await fetch(
                `${apiUrl}/users/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginData),
                    credentials: "include", // include cookies
                    
                    
                }
            );
            const data = await response.json(); // read backend JSON
            console.log("Login response data:", data);
            if (!response.ok) {
                // Backend validation errors
                if (data.errors) {
                    setMessages(data.errors);  // <-- show messages
                }
                if(data.message){
                    setMessages([{msg: data.message}]);
                }
                return;
            }
            if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/dashboard");
          }


            navigate('/dashboard');
            // If success
            console.log("Login successful:", data);
            setMessages([]); // clear errors
        } catch (err) {
            console.error("Network error:", err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/dashboard");
        }else{
            navigate("/login");
        }
    }, []);


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">  
        <h2 className="text-2xl font-bold mb-6 text-center">Login User</h2>
        <form onSubmit={handleSubmit} >
            <div className="mb-4">
                {errorMessages.find(err => err.msg && !err.path) && (
                  <p className="text-red-500 text-sm mb-2">
                    {errorMessages.find(err => err.msg && !err.path).msg}
                  </p>
                )}
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input type="text" id="email" name="email" className="w-full px-3 py-2 border rounded"  />
                {errorMessages.find(err => err.path === "email") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessages.find(err => err.path === "email").msg}
                  </p>
                )}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded"  />
                {errorMessages.find(err => err.path === "password") && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessages.find(err => err.path === "password").msg}
                  </p>
                )}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                Login
            </button>
        </form>
    </div>
  );
}
