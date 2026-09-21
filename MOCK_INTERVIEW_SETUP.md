# CareerPilot AI - Complete Mock Interview Feature

## What is included
- Resume upload for PDF/DOC/DOCX
- Browser-side resume text extraction when PDF.js/Mammoth are available
- Resume profile analysis and detected skills
- Role, type, difficulty and question-count configuration
- AI-style personalized interview question generation
- AI avatar UI with speaking animation
- Browser text-to-speech for interview questions
- Camera and microphone controls using getUserMedia
- Browser speech-to-text using SpeechRecognition/WebkitSpeechRecognition
- Text answer fallback
- Question navigation, progress, timer and skip
- Detailed performance report
- Local interview history
- Optional MongoDB interview persistence
- Optional OpenAI-compatible backend endpoint

## Run
1. Start MongoDB.
2. In `backend/`, run `npm install` if needed.
3. Run `npm start`.
4. Serve the frontend through VS Code Live Server or another local HTTP server.
5. Open `interviews.html`.
6. Allow camera/microphone permissions for voice/video mode.

## Optional real AI API
Add these to `backend/.env`:

AI_API_KEY=your_key
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o-mini

The `/api/interviews/ai` endpoint is intentionally optional. Without an API key, the mock interview still works using the built-in question/feedback engine.

## Notes
Camera recordings are not stored by this implementation. Answers and completed reports are stored locally for immediate demo use; authenticated users can also have completed sessions saved to MongoDB through `/api/interviews/save`.
