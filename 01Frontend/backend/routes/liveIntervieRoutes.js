import express from 'express';
import LiveInterviewSession from '../models/Live.js';

const router = express.Router();


router.post('/start', async (req, res) => {
  try {
    const { userId, aiModel } = req.body;

    const newSession = new LiveInterviewSession({
      user: userId,
      aiModel: aiModel || 'gemini-live-2.5-flash-preview',
      startedAt: Date.now(),
    });

    const session = await newSession.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Error starting interview:', error);
    res.status(500).json({ message: 'Failed to start interview session' });
  }
});


router.post('/:id/question', async (req, res) => {
  try {
    const { text, aiEmotion } = req.body;
    const session = await LiveInterviewSession.findById(req.params.id);

    if (!session) return res.status(404).json({ message: 'Session not found' });

    const question = {
      questionId: new mongoose.Types.ObjectId().toString(),
      text,
      aiEmotion,
    };

    session.questions.push(question);
    await session.save();

    res.status(200).json({ message: 'Question added', question });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Failed to add question' });
  }
});


router.post('/:id/answer', async (req, res) => {
  try {
    const {
      questionId,
      transcript,
      confidenceScore,
      emotionDetected,
      duration,
      audioUrl,
      videoFrameUrl,
    } = req.body;

    const session = await LiveInterviewSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const answer = {
      answerId: new mongoose.Types.ObjectId().toString(),
      questionId,
      transcript,
      confidenceScore,
      emotionDetected,
      duration,
      audioUrl,
      videoFrameUrl,
    };

    session.answers.push(answer);
    await session.save();

    res.status(200).json({ message: 'Answer recorded', answer });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: 'Failed to record answer' });
  }
});


router.patch('/:id/end', async (req, res) => {
  try {
    const { performanceReport } = req.body;
    const session = await LiveInterviewSession.findById(req.params.id);

    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.status = 'completed';
    session.endedAt = Date.now();
    session.performanceReport = performanceReport;

    await session.save();
    res.status(200).json({ message: 'Interview ended', session });
  } catch (error) {
    console.error('Error ending interview:', error);
    res.status(500).json({ message: 'Failed to end interview' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const session = await LiveInterviewSession.findById(req.params.id).populate('user', 'name email');
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.status(200).json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Failed to fetch interview session' });
  }
});

export default router;
