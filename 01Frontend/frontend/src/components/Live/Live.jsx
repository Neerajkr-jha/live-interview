import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Live() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

 
  useEffect(() => {
    const startInterview = async () => {
      try {
        const res = await axios.post(`${API_BASE}/api/interviews/start`, {
          userId: "672fbc9871f3cfa56e2d1234", 
          aiModel: "gemini-2.0-flash",
        });

        setSessionId(res.data._id);
        console.log("Interview started:", res.data);

        setMessages([{ sender: "ai", text: res.data.question }]);
      } catch (error) {
        console.error("Error starting interview:", error);
      }
    };

    startInterview();
    startCamera();

    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Camera error:", error);
      alert("Please allow camera access to continue.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      setIsCameraOn(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || !sessionId) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
   
      await axios.post(`${API_BASE}/api/interviews/${sessionId}/answer`, {
        questionId: "temp-ai-q1", 
        transcript: userInput,
        confidenceScore: 0.9,
      });


      const res = await axios.post(`${API_BASE}/api/interviews/${sessionId}/question`, {
        text: userInput,
        aiEmotion: "neutral",
      });

      const aiResponse = res.data.question?.text || "Thank you for your answer!";
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Something went wrong, please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-900 text-white">
      {/* Left: AI Chat Section */}
      <div className="flex flex-col justify-between w-full sm:w-1/2 p-6 border-r border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">AI Interviewer</h2>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "ai"
                  ? "bg-blue-600 self-start"
                  : "bg-green-600 self-end ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="p-3 bg-blue-500/40 rounded-lg w-fit animate-pulse">
              AI is thinking...
            </div>
          )}
        </div>

       
        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Type your answer..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600"
          >
            Send
          </button>
        </form>
      </div>

    
      <div className="flex flex-col w-full sm:w-1/2 items-center justify-center bg-gray-950 p-6 relative">
        <h2 className="text-2xl font-semibold mb-4">Your Live Camera</h2>

        <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-lg"
          ></video>

          {!isCameraOn && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <p className="text-gray-300">Camera is off</p>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          {isCameraOn ? (
            <button
              onClick={stopCamera}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Stop Camera
            </button>
          ) : (
            <button
              onClick={startCamera}
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Start Camera
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Live;
