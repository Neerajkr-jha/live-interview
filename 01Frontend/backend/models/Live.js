import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  aiEmotion: {
    type: String,
    enum: ['curious', 'neutral', 'challenging', 'friendly'],
    default: 'neutral',
  },
});

const answerSchema = new mongoose.Schema({
  answerId: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
  },
  confidenceScore: {
    type: Number,
    min: 0,
    max: 1,
  },
  emotionDetected: {
    type: String,
    enum: ['confident', 'nervous', 'neutral', 'positive'],
    default: 'neutral',
  },
  duration: {
    type: Number, 
  },
  audioUrl: {
    type: String,
  },
  videoFrameUrl: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const performanceReportSchema = new mongoose.Schema({
  overallScore: { type: Number, default: 0 },
  communication: { type: Number, default: 0 },
  confidence: { type: Number, default: 0 },
  clarity: { type: Number, default: 0 },
  aiFeedback: { type: String },
});

const logSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const LiveInterviewSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'failed'],
    default: 'active',
  },
  aiModel: {
    type: String,
    default: 'gemini-live-2.5-flash-preview',
  },
  questions: [questionSchema],
  answers: [answerSchema],
  performanceReport: performanceReportSchema,
  logs: [logSchema],
});

const LiveInterviewSession = mongoose.model('LiveInterviewSession', LiveInterviewSessionSchema);

export default LiveInterviewSession;
