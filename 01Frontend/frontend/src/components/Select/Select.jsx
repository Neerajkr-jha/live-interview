import { useState,useEffect , Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";

import Logo from "../../assets/logoix.png";

function Select() {
  const [formData, setFormData] = useState({
    role: "",
    domain: "",
    interviewMode: "",
  });

  const navigate = useNavigate();

  const roles = [
    "Software Engineer",
    "Data Scientist",
    "DevOps Engineer",
    "Full Stack Developer",
    "AI/ML Engineer",
  ];

  const domains = [
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
  ];

  const interviewModes = ["Technical", "Behavioral"];

  // const handleSubmit = (e) => {
  //   e.preventDefault();

    
  //   console.log("Selected Data:", formData);
  //   navigate("/interview", { state: formData });
  // };

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://backend-for-interview-prep.onrender.com/api/interviews/start", {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
const interviewData = await response.json();
      //  console.log("Server response:", data);

    // Example: Save token to localStorage
    // localStorage.setItem("token", data.token);
console.log("Selected Data:", formData);
      // **THE KEY STEP:** Pass the fetched data in `state`
      navigate("/interview", { state: { interviewData: interviewData } });
    // const data = await response.json();
   
    
    // navigate("/interview", { state: formData });
  } catch (error) {
    console.error("Error starting interview:", error);
  }
};



  return (
    <div className="relative min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 ">
        <h2 className="text-3xl font-bold text-gray-700 pb-22">
          Pick Your Challenge
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl" 
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Dropdown
              label="Job Role"
              options={roles}
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
            />
            <Dropdown
              label="Domain"
              options={domains}
              value={formData.domain}
              onChange={(value) => setFormData({ ...formData, domain: value })}
            />
            <Dropdown
              label="Mode"
              options={interviewModes}
              value={formData.interviewMode}
              onChange={(value) => setFormData({ ...formData, interviewMode: value })}
            />      
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Start Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="w-full relative">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Label className="block text-sm font-medium mb-1">
          {label}
        </Listbox.Label>
        <div className="relative">
          <Listbox.Button className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center">
            <span>{value || `Select ${label}`}</span>
            <IoMdArrowDropdown className="h-5 w-5 text-gray-500" />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            
            <Listbox.Options className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto focus:outline-none">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default Select;