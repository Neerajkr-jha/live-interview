// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function Evaluation() {
//   const navigate = useNavigate();

//   const handleGenerateSummary = () => {
//     navigate('/summary');
//   };

//   return (
//     <div className="flex min-h-screen bg-white">
//       <div className="flex-grow p-18 overflow-y-auto w-full">
//         <h2 className="text-3xl font-bold mb-8 text-center">Evaluation by InterviuX</h2>
        
//         <div className="flex flex-col md:flex-row gap-8">
          
//           {/* Technical Evaluation Section */}
//           <div className="flex-1">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">Technical Evaluation</h3>
//             <div className="bg-gray-100 rounded-lg shadow-lg p-6 min-h-[500px]">
//               {/* Content for technical evaluation goes here */}
//             </div>
//           </div>
          
//           {/* Behavioral Evaluation Section */}
//           <div className="flex-1">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">Behavioral Evaluation</h3>
//             <div className="bg-gray-100 rounded-lg shadow-lg p-6 min-h-[500px]">
//               {/* Content for behavioral evaluation goes here */}
//             </div>
//           </div>

//         </div>

//         {/* Generate Summary Button */}
//         <div className="mt-10 text-center">
//           <button 
//             onClick={handleGenerateSummary}
//             className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300"
//           >
//             Generate Summary
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Evaluation;