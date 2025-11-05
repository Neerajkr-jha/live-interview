// In Summary.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Summary() {
  const [summaryData, setSummaryData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the summary data passed from the ChatPanel component
    const data = location.state?.summary;
    if (data) {
      setSummaryData(data);
    } else {
      // If no data is found (e.g., user refreshed the page or navigated directly),
      // redirect them to the start page.
      console.log("No summary data found, redirecting.");
      navigate('/select');
    }
  }, [location.state, navigate]);

  // Show a loading screen until the data is ready
  if (!summaryData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Generating your report...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 mt-3 p-8">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-10 mt-14 ">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6 pt-5">Summary Report</h1>
        <p className="text-lg text-gray-600 text-center mb-10">Your Interview Highlights</p>

        {/* Overall Score */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Overall Score</h2>
          <div className="text-6xl font-extrabold text-green-500">{summaryData.overallScore}/10</div>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4">Strengths 💪</h3>
            {/* The API sends strengths as a single paragraph string */}
            <p className="text-gray-700 whitespace-pre-wrap">{summaryData.strengths}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">Areas to Improve 🤔</h3>
            {/* The API sends areasForImprovement as a single paragraph string */}
            <p className="text-gray-700 whitespace-pre-wrap">{summaryData.areasForImprovement}</p>
          </div>
        </div>

        {/* Suggested Resources */}
        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-4">Suggested Learning Resources 📚</h3>
          {/* The API sends suggestedResources as an array, so we can map it */}
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {summaryData.suggestedResources.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Summary;


















// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function Summary() {
//   // Dummy data to display the report. In a real app, this would come from a prop or API call.
//   const overallScore = 8;
//   const strengths = [
//     "Clear logical flow in problem-solving.",
//     "Provided strong, relevant examples to back up points.",
//     "Demonstrated a good understanding of core concepts."
//   ];
//   const areasToImprove = [
//     "Missed some key edge cases in the technical problem.",
//     "Responses could be more concise to stay on time.",
//     "Could have elaborated more on the 'why' behind certain technical decisions."
//   ];
//   const learningResources = [
//     "Practice LeetCode array problems",
//     "Review common system design patterns",
//     "Read 'Cracking the Coding Interview' for behavioral tips"
//   ];


   



//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
//       <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-10">
//         <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Summary Report</h1>
//         <p className="text-lg text-gray-600 text-center mb-10">Your Interview Highlights</p>

//         {/* Overall Score */}
//         <div className="mb-10 text-center">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-2">Overall Score</h2>
//           <div className="text-6xl font-extrabold text-green-500">{overallScore}/10</div>
//         </div>

//         {/* Strengths and Improvements */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//           <div>
//             <h3 className="text-xl font-semibold text-green-600 mb-4">Strengths 💪</h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-700">
//               {strengths.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-red-600 mb-4">Areas to Improve 🤔</h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-700">
//               {areasToImprove.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Suggested Resources */}
//         <div>
//           <h3 className="text-xl font-semibold text-purple-600 mb-4">Suggested Learning Resources 📚</h3>
//           <ul className="list-disc list-inside space-y-2 text-gray-700">
//             {learningResources.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Summary;
























//  useEffect(() => {
//       // **THE KEY STEP:** Access the data from location.state
//       const startData = location.state?.interviewData;
  
//       // Check if the data exists
//       if (startData && startData.sessionId) {
//         // Set the first message and store the session ID
//         // setMessages([{ sender: 'bot', text: startData.question }]);
//         setSessionId(startData.sessionId);
//       } else {
//         // If a user lands here directly, they won't have the data.
//         // It's good practice to redirect them back.
//         console.error("No sessionId  found. Redirecting...");
//         navigate('/select'); 
//       }
//       // The dependency array ensures this runs only once on mount
//     }, [location.state, navigate]);