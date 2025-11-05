

import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { ArrowRight,Loader2  } from "lucide-react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Signup Data:", formData);
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
setLoading(true);
setError(""); // Clear any previous errors
  try {
    const response = await fetch("https://backend-for-interview-prep.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
       credentials: "include",
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Check if the error is about email already existing
      if (response.status === 400 && (data.message?.toLowerCase().includes('email') || data.error?.toLowerCase().includes('email'))) {
        setError("This email is already registered. Please use a different email or try logging in.");
      } else {
        setError(data.message || data.error || "Registration failed. Please try again.");
      }
      return;
    }

    console.log("Server response:", data);

    // Example: Save token to localStorage
    // localStorage.setItem("token", data.token);

    // Redirect to '/login' if registration successful
    if(response.ok){
      
    navigate("/login");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    setError("Something went wrong. Please try again.");
  }
    finally {
      // Stop loading regardless of success or error
      setLoading(false);
    }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white mt-10 ">
      {/* App Logo / Title */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          ⌂
        </div>
        <h1 className="text-2xl font-bold text-gray-800">IntervuX</h1>
      </div>

      {/* Signup Box */}
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-2xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold text-center mb-2">Sign up</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Your AI coach to ace every interview.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Email */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div> */}

          {/* Password */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>  */}

          {/* Continue Button */}



          {/* Username */}
<div>
  <label
    htmlFor="username"
    className="block text-sm font-medium text-gray-700 text-left mb-1"
  >
    Username
  </label>
  <input
    id="username"
    type="text"
    name="name" // should match your state key
    value={formData.name}
    onChange={handleChange}
    autoComplete="username"
    className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
    required
     disabled={loading}
  />
</div>

{/* Email */}
<div>
  <label
    htmlFor="email"
    className="block text-sm font-medium text-gray-700 text-left mb-1"
  >
    Email
  </label>
  <input
    id="email"
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    autoComplete="email"
    className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
    required
    disabled={loading}
  />
</div>

{/* Password */}
<div>
  <label
    htmlFor="password"
    className="block text-sm font-medium text-gray-700 text-left mb-1"
  >
    Password
  </label>
  <input
    id="password"
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    autoComplete="new-password"
    className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
    required
    disabled={loading}
  />
</div>

{/* Error Message */}
{error && (
  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
    <p className="text-sm text-red-600 text-center">{`${error}, Please Login or try using another E-mail`}</p>
  </div>
)}

{/*           <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            Continue <ArrowRight size={18} />
          </button> */}

           <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing up...
              </>
            ) : (
              <>
                Continue <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

{/*         <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Log in
          </Link> */}
         <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className={`text-black font-medium hover:underline ${loading ? 'pointer-events-none opacity-50' : ''}`}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;












































































// import { useState } from "react";
// import { Link ,useNavigate } from "react-router-dom";
// import { ArrowRight,Loader2  } from "lucide-react";

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); 
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log("Signup Data:", formData);
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
// setLoading(true);
//   try {
//     const response = await fetch("https://backend-for-interview-prep.onrender.com/api/users/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//        credentials: "include",
//       body: JSON.stringify(formData)
//     });

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     const data = await response.json();
//     console.log("Server response:", data);

//     // Example: Save token to localStorage
//     // localStorage.setItem("token", data.token);

//     // Redirect to '/select' if login successful
//     if(response.ok){
      
//     navigate("/login");
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//   }
//     finally {
//       // Stop loading regardless of success or error
//       setLoading(false);
//     }
// };


//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
//       {/* App Logo / Title */}
//       <div className="absolute top-6 left-6 flex items-center space-x-2">
//         <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//           ⌂
//         </div>
//         <h1 className="text-2xl font-bold text-gray-800">IntervuX</h1>
//       </div>

//       {/* Signup Box */}
//       <div className="w-full max-w-sm p-8 bg-gray-100 rounded-2xl shadow-md border border-gray-300">
//         <h2 className="text-2xl font-semibold text-center mb-2">Sign up</h2>
//         <p className="text-sm text-gray-500 text-center mb-6">
//           Your AI coach to ace every interview.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Username */}
//           {/* <div>
//             <label className="block text-sm font-medium text-gray-700 text-left mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>

//           {/* Email */}
//           {/* <div>
//             <label className="block text-sm font-medium text-gray-700 text-left mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div> */}

//           {/* Password */}
//           {/* <div>
//             <label className="block text-sm font-medium text-gray-700 text-left mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>  */}

//           {/* Continue Button */}



//           {/* Username */}
// <div>
//   <label
//     htmlFor="username"
//     className="block text-sm font-medium text-gray-700 text-left mb-1"
//   >
//     Username
//   </label>
//   <input
//     id="username"
//     type="text"
//     name="name" // should match your state key
//     value={formData.name}
//     onChange={handleChange}
//     autoComplete="username"
//     className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//     required
//      disabled={loading}
//   />
// </div>

// {/* Email */}
// <div>
//   <label
//     htmlFor="email"
//     className="block text-sm font-medium text-gray-700 text-left mb-1"
//   >
//     Email
//   </label>
//   <input
//     id="email"
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleChange}
//     autoComplete="email"
//     className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//     required
//     disabled={loading}
//   />
// </div>

// {/* Password */}
// <div>
//   <label
//     htmlFor="password"
//     className="block text-sm font-medium text-gray-700 text-left mb-1"
//   >
//     Password
//   </label>
//   <input
//     id="password"
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleChange}
//     autoComplete="new-password"
//     className="w-full p-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//     required
//     disabled={loading}
//   />
// </div>

// {/*           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
//           >
//             Continue <ArrowRight size={18} />
//           </button> */}

//            <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
//           >
//             {loading ? (
//               <>
//                 <Loader2 size={18} className="animate-spin" />
//                 Signing up...
//               </>
//             ) : (
//               <>
//                 Continue <ArrowRight size={18} />
//               </>
//             )}
//           </button>
//         </form>

// {/*         <p className="text-center text-sm text-gray-500 mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-black font-medium hover:underline">
//             Log in
//           </Link> */}
//          <p className="text-center text-sm text-gray-500 mt-4">
//           Already have an account?{" "}
//           <Link 
//             to="/login" 
//             className={`text-black font-medium hover:underline ${loading ? 'pointer-events-none opacity-50' : ''}`}
//           >
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
