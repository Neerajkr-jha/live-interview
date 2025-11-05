import express from 'express';
import verifyJWT from '../middleware/authMiddleware.js';
import InterviewSession from '../models/InterviewSession.js';
import main from '../server.js'
const router = express.Router();
// Note: We are now importing the 'callGemini' helper function.
// You should move that function from server.js to a utils file.

// Assume callGemini function is available here

// All routes in this file will be protected by the 'protect' middleware
router.use(verifyJWT);

/**
 * @route   POST /api/interviews/start
 * @desc    Starts a new interview
 */
router.post('/start', async (req, res) => {
    try {
  const { role, domain, interviewMode } = req.body;
  
  // The user ID is available from the 'protect' middleware
  const userId = req.user._id; 

  const prompt = ` Act as an expert interviewer for a ${role} position, specializing in ${domain}.
      You are starting a ${interviewMode} interview.
      Your tone should be professional, friendly, and encouraging.
      Do not ask for introductions or any pleasantries.
      Directly ask the very first interview question based on the role and interview mode.
      Do not add any preamble like "Great, let's start." or "Here is your first question:". Just state the question directly.`; // your start prompt
  const firstQuestionText = await main(prompt); // Replace with await callGemini(prompt);

  const newSession = new InterviewSession({
    user: userId, // Link the session to the logged-in user
    role,
    domain,
    interviewMode,
    history: [{ sender: 'ai', text: firstQuestionText }]
  });
  await newSession.save();

  res.json({ 
    question: firstQuestionText, sessionId: newSession._id
 });
 } catch (error) {
    console.error('Error in /api/interviews/start:', error);
    res.status(500).json({ error: error.message });
  }
});


/**
 * @route   POST /api/interviews/evaluate
 * @desc    Evaluates a user's answer and provides the next question.
 * @access  Public
 */
router.post('/evaluate', async (req, res) => {
  try {
    // const { history, role, domain, interviewMode } = req.body;
     const { sessionId, userAnswer } = req.body;
     // Find the current interview session
    const session = await InterviewSession.findById(sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Interview session not found.' });
    }

     session.history.push({ sender: 'user', text: userAnswer });
    // Convert history to a readable string for the prompt

    // const historyText = history.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    const historyText = session.history.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    const prompt = `
      You are an expert interviewer for a ${session.role} position specializing in ${session.domain}, conducting a ${session.interviewMode} interview.
      The entire interview history so far is:
      ---
      ${historyText}
      ---
      Your task is to evaluate the candidate's most recent answer and then ask the next question.
      You MUST provide your response as a valid JSON object with the following structure:
      {
        "feedback": "A detailed, constructive critique of the candidate's last answer. Be specific about what was good and what could be improved. Use markdown for formatting.",
        "score": A numerical score from 1 to 10 for the last answer, where 1 is poor and 10 is excellent.,
        "nextQuestion": "The next logical interview question. The question should build upon the conversation if possible, or introduce a new relevant topic. Do not repeat questions."
      }

      Do not add any extra text or explanation outside of the JSON object.
    `;
    
    const responseText = await main(prompt);
    // Clean the response to ensure it's valid JSON
    const cleanedJsonString = responseText.replace(/```json\n|```/g, '').trim();
    const result = JSON.parse(cleanedJsonString);
    // Add the AI's next question to the history
    session.history.push({ sender: 'ai', text: result.nextQuestion });
    await session.save(); // Save the updated session

    res.json(result);




  } catch (error) {
    console.error('Error in /api/evaluate:', error);
    res.status(500).json({ error: 'Failed to parse AI response or internal server error.' });
  }
});



/**
 * @route   POST /api/interviews/summary
 * @desc    Ends the interview and generates a final summary report.
 * @access  Public
 */
router.post('/summary', async (req, res) => {
    try {
        // const { history, role } = req.body;
          const { sessionId } = req.body;
           // Fetch the complete history from the database
        const session = await InterviewSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Interview session not found.' });
        }

         const historyText = session.history.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
        // const historyText = history.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

        const prompt = `
            You are an expert career coach providing a final summary for a mock interview.
            The candidate was interviewing for a ${session.role} position.
            Here is the complete transcript of the interview:
            ---
            ${historyText}
            ---
            Based on the entire transcript, generate a comprehensive final report for the candidate.
            The report should be encouraging and constructive.
            You MUST provide your response as a valid JSON object with the following structure:
            {
              "overallScore": An average score out of 10 for the entire interview performance.,
              "strengths": "A paragraph highlighting the candidate's key strengths, with specific examples from the interview.",
              "areasForImprovement": "A paragraph detailing the areas where the candidate can improve, offering actionable advice.",
              "suggestedResources": "A list of 3-5 bullet points with suggested resources (like articles, courses, or topics to study) to help the candidate improve."
            }

            Do not add any text outside of this JSON object.
        `;

        const responseText = await main(prompt);
        const cleanedJsonString = responseText.replace(/```json\n|```/g, '').trim();
        const summary = JSON.parse(cleanedJsonString);

        res.json(summary);

    } catch (error) {
        console.error('Error in /api/summary:', error);
        res.status(500).json({ error: 'Failed to generate summary report.' });
    }
});




























// /**
//  * @route   POST /api/start
//  * @desc    Starts a new interview and gets the first question.
//  * @access  Public
//  */

// app.post('/api/start', async (req, res) => {
//   try {
//     const { role, domain, interviewMode } = req.body;

//     const prompt = `
//       Act as an expert interviewer for a ${role} position, specializing in ${domain}.
//       You are starting a ${interviewMode} interview.
//       Your tone should be professional, friendly, and encouraging.
//       Do not ask for introductions or any pleasantries.
//       Directly ask the very first interview question based on the role and interview mode.
//       Do not add any preamble like "Great, let's start." or "Here is your first question:". Just state the question directly.
//     `;

//     const firstQuestion =  await main(prompt);
//     // Create a new interview session in the database
//     const newSession = new InterviewSession({
//       role,
//       domain,
//       interviewMode,
//       history: [{ sender: 'ai', text: firstQuestionText }] // Add the first question to history
//     });

//     await newSession.save();

//     // Return the first question and the unique session ID to the client
//     res.json({ 
//         question: firstQuestion, 
//         sessionId: newSession._id 
//     });
//     // res.json({ question: firstQuestion });

//     // await main(prompt);

//   } catch (error) {
//     console.error('Error in /api/start:', error);
//     res.status(500).json({ error: error.message });
//   }
// });










// ... your other /evaluate and /summary routes would go here ...
// They would also be automatically protected.

export default router;