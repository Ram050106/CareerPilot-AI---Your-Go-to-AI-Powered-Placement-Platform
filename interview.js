const categories = [
  ["Technical Interview", "◎", "Core concepts, systems thinking, and technical depth.", "Intermediate", "Technical"],
  ["Full Stack Developer", "◈", "Frontend, APIs, databases, and delivery decisions.", "Intermediate", "Mixed"],
  ["Frontend Developer", "▣", "Browser fundamentals, React, UX, and performance.", "Beginner to advanced", "Technical"],
  ["Backend Developer", "⌘", "Services, APIs, security, and data architecture.", "Intermediate", "Technical"],
  ["Java Developer", "J", "OOP, collections, Spring patterns, and Java fluency.", "Intermediate", "Technical"],
  ["Python Developer", "Py", "Python design, APIs, testing, and automation.", "Beginner to advanced", "Mixed"],
  ["SQL / Database Interview", "DB", "Queries, modeling, optimization, and data reasoning.", "Intermediate", "Coding"],
  ["AI / ML Interview", "✦", "ML fundamentals, model choices, and responsible AI.", "Advanced", "Technical"],
  ["HR Interview", "♡", "Behavioral stories, motivation, and workplace judgment.", "All levels", "HR"],
  ["Aptitude Test", "⊙", "Logic, quantitative reasoning, and problem solving.", "Beginner to advanced", "Coding"],
  ["Communication Interview", "◌", "Clarity, confidence, and concise professional storytelling.", "All levels", "HR"],
];
const roleQuestions = {
  "Full Stack Developer": [
    ["How would you design a feature from a user story through a production release?", "text"],
    ["Write a function that removes duplicate values from an array while preserving order.", "coding"],
    ["Which layer should validate an incoming API request?", "mcq", ["Only the browser", "Only the database", "At the boundary and again where needed", "Validation is unnecessary"]],
    ["Explain how you would model users, courses, and enrollments in a database.", "text"],
  ],
  "Frontend Developer": [
    ["What happens between entering a URL and seeing a page in the browser?", "text"],
    ["Implement a debounce utility and explain where you would use it.", "coding"],
    ["Which React pattern best prevents unnecessary shared state?", "mcq", ["Put every value in global state", "Keep state closest to where it is used", "Use a new context for every value", "Avoid state entirely"]],
    ["How would you make a dashboard accessible and responsive?", "text"],
  ],
  "Backend Developer": [
    ["How would you design a versioned REST API for a growing product?", "text"],
    ["Write pseudocode for a rate limiter that protects an API endpoint.", "coding"],
    ["What is the main purpose of a database index?", "mcq", ["To encrypt every field", "To speed up selected lookups", "To replace validation", "To increase network bandwidth"]],
    ["Describe how you would secure an authenticated API.", "text"],
  ],
  "Java Developer": [
    ["Explain the difference between composition and inheritance in Java.", "text"],
    ["Write a method that counts repeated words in a list using Java collections.", "coding"],
    ["Which collection is best for fast key-based lookups?", "mcq", ["ArrayList", "HashMap", "Stack", "LinkedList"]],
    ["How should a Java service handle checked and unchecked exceptions?", "text"],
  ],
  "Python Developer": [
    ["How would you structure a maintainable Python API project?", "text"],
    ["Write a Python function that returns the first non-repeating character.", "coding"],
    ["What is a practical benefit of a generator?", "mcq", ["It always runs in parallel", "It can produce values lazily", "It removes all runtime errors", "It replaces unit tests"]],
    ["How do you test and monitor a Python service in production?", "text"],
  ],
  "SQL / Database Interview": [
    ["Write a query that returns the top three salaries in each department.", "coding"],
    ["When would you normalize a schema and when might you denormalize it?", "text"],
    ["Which SQL clause filters grouped results?", "mcq", ["WHERE", "ORDER BY", "HAVING", "LIMIT"]],
    ["How would you investigate a query that became slow after a data increase?", "text"],
  ],
  "AI / ML Interview": [
    ["How would you choose an evaluation metric for an imbalanced classifier?", "text"],
    ["Describe the steps you would take to prepare a dataset for modeling.", "text"],
    ["What does regularization help control?", "mcq", ["Network latency", "Model overfitting", "Database locking", "File permissions"]],
    ["How would you explain a model prediction to a non-technical stakeholder?", "text"],
  ],
  "Technical Interview": [
    ["Tell me about a technical tradeoff you made and what you learned.", "text"],
    ["Describe how you would debug a feature that suddenly stopped working.", "text"],
    ["What is the purpose of automated tests in a delivery pipeline?", "mcq", ["Replace code review", "Catch regressions early", "Guarantee zero bugs", "Remove the need for monitoring"]],
    ["How would you break a large technical problem into smaller tasks?", "text"],
  ],
  "HR Interview": [
    ["Tell me about yourself and the kind of work you want to do next.", "text"],
    ["Tell me about a time you received difficult feedback.", "text"],
    ["What is the best first step when two teammates disagree?", "mcq", ["Ignore it", "Choose a side immediately", "Understand both perspectives", "Escalate without context"]],
    ["Describe a time you took ownership without being asked.", "text"],
  ],
  "Aptitude Test": [
    ["A project takes 12 days for 4 people. At the same rate, how many days would 6 people take? Explain your reasoning.", "aptitude"],
    ["A sequence starts 3, 6, 12, 24. What comes next and why?", "aptitude"],
    ["If all analysts are curious and some developers are analysts, what can be concluded?", "mcq", ["All developers are curious", "Some developers are curious", "No developers are curious", "Nothing can be concluded"]],
    ["A train travels 180 km in 3 hours. What is its average speed?", "aptitude"],
  ],
  "Communication Interview": [
    ["Explain a complex technical idea to a non-technical customer.", "text"],
    ["Give a concise two-minute introduction for a hiring manager.", "text"],
    ["What makes a project update useful to a busy stakeholder?", "mcq", ["More jargon", "A clear status, risk, and next step", "Only positive news", "A long transcript"]],
    ["Describe how you would handle a misunderstanding in a team.", "text"],
  ],
};
const commonQuestions = [
  ["How do you prioritize when several tasks feel urgent?", "text"],
  ["Describe a project where you measured the result of your work.", "text"],
  ["What is one skill you are actively improving and how are you practicing it?", "text"],
  ["What would you do if you did not know the answer to an interview question?", "text"],
  ["Which response best demonstrates ownership?", "mcq", ["Wait for instructions", "Blame a dependency", "Clarify the goal and propose a next step", "Hide the risk"]],
  ["Write brief pseudocode for checking whether a string is a palindrome.", "coding"],
];
const state = { view: "landing", config: {}, questions: [], current: 0, answers: [], timer: null, remaining: 0, recording: false, recordingSeconds: 0, recordingTimer: null, latestReport: null, mediaStream: null, cameraEnabled: false, micEnabled: false };
function $(id) { return document.getElementById(id); }
function getHistory() { return JSON.parse(localStorage.getItem("careerPilotInterviewHistory") || "[]"); }
function saveHistory(record) { const history = [record, ...getHistory()].slice(0, 12); localStorage.setItem("careerPilotInterviewHistory", JSON.stringify(history)); }
function seedHistory() { if (!localStorage.getItem("careerPilotInterviewHistory")) localStorage.setItem("careerPilotInterviewHistory", JSON.stringify([{ id: "demo-1", role: "Frontend Developer", type: "Technical", difficulty: "Medium", duration: 30, score: 82, date: "2026-09-12", demo: true }, { id: "demo-2", role: "Python Developer", type: "Mixed", difficulty: "Easy", duration: 15, score: 76, date: "2026-09-08", demo: true }, { id: "demo-3", role: "HR Interview", type: "HR", difficulty: "Medium", duration: 30, score: 88, date: "2026-09-03", demo: true }])); }
function showView(id) { document.querySelectorAll(".mock-view").forEach((view) => view.classList.add("hidden")); $(id).classList.remove("hidden"); window.scrollTo({ top: 0, behavior: "smooth" }); state.view = id; }
function populateCategories() { $("categoryGrid").innerHTML = categories.map(([name, icon, description, level, type]) => `<article class="mock-category-card"><div class="category-icon">${icon}</div><div class="category-card-heading"><h3>${name}</h3><span>${level}</span></div><p>${description}</p><div class="category-card-footer"><small>${type} practice</small><button class="btn btn-soft btn-small" data-category="${name}">Start <span>→</span></button></div></article>`).join(""); }
function populateRoles() { $("setupRole").innerHTML = categories.map(([name]) => `<option>${name}</option>`).join(""); }
function updateSetupPreview() { const role = $("setupRole").value, experience = $("setupExperience").value, duration = document.querySelector("input[name='duration']:checked").value; $("setupPreviewRole").textContent = role; $("setupPreviewText").textContent = `${experience} ${$("setupType").value.toLowerCase()} practice calibrated to your goals.`; $("setupPreviewDuration").textContent = `${duration} min`; $("setupPreviewQuestions").textContent = `${duration === "15" ? 6 : duration === "30" ? 8 : 10} questions`; }
function buildQuestions(role, type, difficulty) { const custom = roleQuestions[role] || roleQuestions["Technical Interview"]; const pool = [...custom, ...commonQuestions]; let filtered = type === "HR" ? pool.filter((question) => question[1] === "text" || question[1] === "mcq") : type === "Coding" ? pool.filter((question) => question[1] === "coding" || question[1] === "aptitude" || question[1] === "mcq") : type === "Technical" ? pool.filter((question) => question[1] !== "aptitude") : pool; const target = difficulty === "Hard" ? 10 : difficulty === "Easy" ? 6 : 8; while (filtered.length < target) filtered = [...filtered, ...pool]; return filtered.slice(0, target).map(([prompt, format, choices]) => ({ prompt, format, choices, difficulty })); }
function formatTime(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`; }
function startTimer() { clearInterval(state.timer); state.timer = setInterval(() => { state.remaining -= 1; $("interviewTimer").textContent = formatTime(Math.max(0, state.remaining)); if (state.remaining <= 60) $("timerWrap").classList.add("timer-warning"); if (state.remaining <= 0) { clearInterval(state.timer); finishInterview(true); } }, 1000); }
function renderQuestionNav() { const answered = state.answers.filter((answer) => answer && answer.status === "answered").length; $("questionNav").innerHTML = state.questions.map((question, index) => { const answer = state.answers[index]; const status = answer?.status || (index === state.current ? "current" : "upcoming"); return `<button type="button" class="question-step ${status} ${index === state.current ? "selected" : ""}" data-question-index="${index}"><span>${String(index + 1).padStart(2, "0")}</span><b>${index === state.current ? "Current question" : answer?.status === "answered" ? "Completed" : answer?.status === "skipped" ? "Skipped" : "Upcoming"}</b><i></i></button>`; }).join(""); const percent = Math.round((answered / state.questions.length) * 100); $("progressPercent").textContent = `${percent}%`; $("progressBar").style.width = `${percent}%`; $("progressHint").textContent = answered ? `${answered} of ${state.questions.length} responses submitted.` : "Start with your best answer."; $("questionCount").textContent = `${String(state.current + 1).padStart(2, "0")} / ${String(state.questions.length).padStart(2, "0")}`; document.querySelectorAll("[data-question-index]").forEach((button) => button.addEventListener("click", () => { state.current = Number(button.dataset.questionIndex); renderQuestion(); })); }
function renderQuestion() { const question = state.questions[state.current], answer = state.answers[state.current] || {}; $("questionKicker").textContent = `QUESTION ${String(state.current + 1).padStart(2, "0")} · ${question.format.toUpperCase()}`; $("questionDifficulty").textContent = question.difficulty.toUpperCase(); $("questionTitle").textContent = question.prompt; $("questionPoints").textContent = `${question.difficulty === "Hard" ? 15 : 10} pts`; $("answerInput").classList.toggle("hidden", question.format === "coding"); $("codeAnswerWrap").classList.toggle("hidden", question.format !== "coding"); $("answerInput").value = answer.text || ""; $("codeInput").value = answer.text || ""; $("codeOutput").textContent = "Run your code to see a simulated result."; $("previousQuestion").disabled = state.current === 0; $("answerHint").textContent = question.format === "mcq" ? "Choose the response that best matches your reasoning." : question.format === "aptitude" ? "Show your working, not just the final answer." : question.format === "coding" ? "Explain your approach before optimizing the implementation." : "Take a moment to structure your thinking clearly."; $("questionBody").innerHTML = question.format === "mcq" ? `<div class="choice-list">${question.choices.map((choice, index) => `<label class="choice-option"><input type="radio" name="questionChoice" value="${index}" ${String(answer.choice) === String(index) ? "checked" : ""} /><span>${String.fromCharCode(65 + index)}</span><b>${choice}</b></label>`).join("")}</div>` : question.format === "aptitude" ? `<div class="aptitude-callout"><span>⊙</span><p>Reason it out step by step. The AI coach values a clear method as much as the final result.</p></div>` : ""; renderQuestionNav(); updateConversation(question, answer); }
function updateConversation(question, answer) { const conversation = $("aiConversation"); if (!answer.status) conversation.innerHTML = `<div class="ai-message"><span class="ai-avatar tiny">✦</span><p>${question.format === "coding" ? "Take your time. Talk through the tradeoffs before you write the solution." : "I am listening. Give me a specific example and explain your reasoning."}</p></div>`; }
function collectAnswer() { const question = state.questions[state.current]; if (question.format === "mcq") { const selected = document.querySelector("input[name='questionChoice']:checked"); return selected ? { text: question.choices[Number(selected.value)], choice: Number(selected.value) } : { text: "", choice: null }; } return { text: question.format === "coding" ? $("codeInput").value.trim() : $("answerInput").value.trim() }; }
function scoreAnswer(answer, question) { const lengthScore = Math.min(35, Math.floor((answer.text || "").length / 7)); const difficultyBonus = question.difficulty === "Hard" ? 3 : question.difficulty === "Easy" ? 7 : 5; const formatBonus = answer.text.length > 45 ? 8 : 0; return Math.min(98, 48 + lengthScore + difficultyBonus + formatBonus); }
function addAiFollowUp(answer, question, score) { const conversation = $("aiConversation"); const followUp = answer.text.length > 80 ? "That gives me useful context. What would you measure to know your approach worked?" : "Can you add a specific example or explain the decision behind your answer?"; conversation.innerHTML += `<div class="ai-message student"><span class="student-dot">You</span><p>${answer.text || "Skipped for now"}</p></div><div class="ai-message"><span class="ai-avatar tiny">✦</span><p><b>${score >= 75 ? "Good direction." : "Let's sharpen that."}</b> ${followUp}</p></div>`; $("coachTip").textContent = score >= 75 ? "Your answer has a clear signal. Add a measurable result next." : "Try context → action → result to make the answer easier to follow."; }
function submitCurrent(skip = false) { const question = state.questions[state.current]; const answer = skip ? { text: "", choice: null } : collectAnswer(); if (!skip && !answer.text) { alert(question.format === "mcq" ? "Choose an option before submitting." : "Add an answer before submitting, or skip this question."); return; } const score = skip ? 42 : scoreAnswer(answer, question); state.answers[state.current] = { ...answer, score, status: skip ? "skipped" : "answered" }; addAiFollowUp(answer, question, score); renderQuestionNav(); if (state.current === state.questions.length - 1) { setTimeout(() => finishInterview(false), 650); } else { setTimeout(() => { state.current += 1; renderQuestion(); }, 650); } }
function finishInterview(timeUp = false) { clearInterval(state.timer); stopInterviewMedia(); const answered = state.answers.filter(Boolean); const scores = state.questions.map((question, index) => state.answers[index]?.score || 42); const overall = Math.round(scores.reduce((sum, score) => sum + score, 0) / state.questions.length); const record = { id: `attempt-${Date.now()}`, role: state.config.role, type: state.config.type, difficulty: state.config.difficulty, duration: state.config.duration, score: overall, date: new Date().toISOString().slice(0, 10), answers: state.answers, timeUp }; state.latestReport = record; saveHistory(record); $("completionText").textContent = timeUp ? "Your time ran out, so CareerPilot AI saved the session and prepared your report." : `You completed ${answered.filter((answer) => answer?.status === "answered").length} of ${state.questions.length} questions. CareerPilot AI has prepared your report.`; $("completionSummary").innerHTML = `<div><span class="section-label">OVERALL SCORE</span><strong>${overall}<small>/100</small></strong></div><div><span class="section-label">ROLE</span><b>${state.config.role}</b></div><div><span class="section-label">TIME USED</span><b>${state.config.duration} min session</b></div>`; showView("interviewComplete"); }
function renderReport(record) { state.latestReport = record; const scores = record.answers?.length ? record.answers.map((answer) => answer?.score || 42) : [record.score]; const average = record.score || Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length); const categoriesScore = [Math.min(99, average + 3), Math.max(45, average - 2), Math.min(99, average + 6), Math.max(45, average - 5), Math.min(99, average + 1)]; $("reportSubtitle").textContent = `${record.role} · ${record.type} interview · ${record.difficulty}`; $("overallScore").textContent = average; $("scoreLabel").textContent = average >= 85 ? "Interview ready" : average >= 70 ? "Strong foundation" : "Good first signal"; $("scoreSummary").textContent = average >= 80 ? "You communicate your thinking clearly and have a strong base to build on." : "You have useful foundations. Focused repetition will make your answers more consistent."; $("scoreBreakdown").innerHTML = [["Technical Knowledge", categoriesScore[0]], ["Communication", categoriesScore[1]], ["Problem Solving", categoriesScore[2]], ["Confidence", categoriesScore[3]], ["Answer Relevance", categoriesScore[4]]].map(([label, score]) => `<div class="score-row"><div><span>${label}</span><b>${score}</b></div><div class="score-line"><i style="width:${score}%"></i></div></div>`).join(""); $("strengthList").innerHTML = `<li>You stayed engaged with ${record.role} scenarios and responded with a clear point of view.</li><li>Your strongest responses connected an idea to a practical outcome.</li><li>You showed willingness to reason through unfamiliar questions.</li>`; $("improvementList").innerHTML = `<li>Use more specific project details and measurable results.</li><li>Make your first sentence answer the question directly before adding context.</li><li>Practice the ${record.difficulty.toLowerCase()} questions you skipped or answered briefly.</li>`; $("aiSuggestion").textContent = `For your next ${record.role} session, practice one two-minute story using Situation, Action, and Result. Then add one technical tradeoff and how you measured success.`; $("topicList").innerHTML = ["Structured storytelling", `${record.role} fundamentals`, "Explaining tradeoffs"].map((topic, index) => `<span><b>0${index + 1}</b>${topic}</span>`).join(""); $("technicalFeedback").textContent = `Your technical signal is developing. Review the core patterns behind ${record.role} questions and narrate your assumptions before jumping to an implementation.`; $("communicationFeedback").textContent = "Your tone is constructive. Reduce filler words, lead with the conclusion, and close each example with an outcome or lesson."; showView("reportView"); }
function renderHistory() { const history = getHistory(); $("historyList").innerHTML = history.length ? history.map((record) => `<article class="history-row"><div class="history-role"><span class="history-icon">✦</span><div><b>${record.role}</b><small>${record.type} · ${record.date}</small></div></div><span class="history-level">${record.difficulty}</span><span class="history-duration">${record.duration} min</span><strong class="history-score">${record.score}<small>/100</small></strong><button class="btn btn-soft btn-small" data-report-id="${record.id}">View Report</button></article>`).join("") : `<div class="empty-history"><span>✦</span><h3>Your practice history starts here.</h3><p>Complete a mock interview to see your scores, feedback, and improvement over time.</p><button class="btn btn-primary" data-open-setup>Start your first interview</button></div>`; document.querySelectorAll("[data-report-id]").forEach((button) => button.addEventListener("click", () => renderReport(getHistory().find((record) => record.id === button.dataset.reportId)))); updateProgress(history); }
function updateProgress(history = getHistory()) { const scores = history.map((record) => record.score); const average = scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0; const highest = scores.length ? Math.max(...scores) : 0; const metrics = [["Interviews completed", history.length, "sessions logged"], ["Average score", average ? `${average}%` : "—", "across all attempts"], ["Highest score", highest ? `${highest}%` : "—", "personal best"], ["Current streak", history.length ? `${Math.min(history.length, 4)} days` : "0 days", "keep showing up"]]; $("progressMetrics").innerHTML = metrics.map(([label, value, note]) => `<div class="mock-metric"><span class="section-label">${label}</span><strong>${value}</strong><small>${note}</small></div>`).join(""); const points = history.slice(0, 6).reverse(); $("performanceChart").innerHTML = points.length ? points.map((record) => `<div class="chart-point" style="height:${Math.max(18, record.score)}%"><b>${record.score}</b><span></span><small>${record.date.slice(5)}</small></div>`).join("") : `<div class="chart-empty">Complete your first session to plot your progress.</div>`; }
async function enableInterviewMedia() {
  const status = $("mediaStatus");
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera and microphone access is not supported by this browser.");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    state.mediaStream = stream;
    state.cameraEnabled = stream.getVideoTracks().some((track) => track.enabled);
    state.micEnabled = stream.getAudioTracks().some((track) => track.enabled);
    $("candidateVideo").srcObject = stream;
    $("cameraPlaceholder").classList.add("hidden");
    $("toggleCameraButton").disabled = false;
    $("toggleMicButton").disabled = false;
    $("startMediaButton").textContent = "✓ Camera & mic enabled";
    $("startMediaButton").classList.remove("primary-control");
    updateMediaUI();
    status.textContent = "Camera and microphone are ready";
  } catch (error) {
    console.error("Media permission error:", error);
    status.textContent = error.name === "NotAllowedError" ? "Permission denied — allow camera & microphone in your browser." : error.message;
    toast("Please allow camera and microphone access to use the video interview room.");
  }
}
function updateMediaUI() {
  const videoTrack = state.mediaStream?.getVideoTracks()[0];
  const audioTrack = state.mediaStream?.getAudioTracks()[0];
  state.cameraEnabled = Boolean(videoTrack?.enabled);
  state.micEnabled = Boolean(audioTrack?.enabled);
  $("cameraStatusText").textContent = state.cameraEnabled ? "On" : "Off";
  $("micStatusText").textContent = state.micEnabled ? "On" : "Off";
  $("cameraStatusDot").classList.toggle("on", state.cameraEnabled);
  $("micStatusDot").classList.toggle("on", state.micEnabled);
  $("toggleCameraButton").innerHTML = state.cameraEnabled ? "📹 Camera on" : "📹 Camera off";
  $("toggleMicButton").innerHTML = state.micEnabled ? "🎤 Mic on" : "🔇 Mic off";
  $("cameraPlaceholder").classList.toggle("hidden", state.cameraEnabled);
  $("candidateVideo").style.opacity = state.cameraEnabled ? "1" : "0";
}
function toggleCamera() { const track = state.mediaStream?.getVideoTracks()[0]; if (!track) return; track.enabled = !track.enabled; updateMediaUI(); }
function toggleMicrophone() { const track = state.mediaStream?.getAudioTracks()[0]; if (!track) return; track.enabled = !track.enabled; updateMediaUI(); }
function stopInterviewMedia() { if (state.mediaStream) state.mediaStream.getTracks().forEach((track) => track.stop()); state.mediaStream = null; state.cameraEnabled = false; state.micEnabled = false; if ($("candidateVideo")) { $("candidateVideo").srcObject = null; $("candidateVideo").style.opacity = "0"; } }

function beginInterview() { state.config = { role: $("setupRole").value, experience: $("setupExperience").value, type: $("setupType").value, difficulty: $("setupDifficulty").value, duration: Number(document.querySelector("input[name='duration']:checked").value) }; state.questions = buildQuestions(state.config.role, state.config.type, state.config.difficulty); state.answers = []; state.current = 0; state.remaining = state.config.duration * 60; $("workspaceRole").textContent = state.config.role; $("workspaceType").textContent = `${state.config.type} · ${state.config.difficulty}`; $("interviewTimer").textContent = formatTime(state.remaining); $("timerWrap").classList.remove("timer-warning"); $("aiConversation").innerHTML = `<div class="ai-message"><span class="ai-avatar tiny">✦</span><p>Welcome, Vikram. I will ask questions tailored to <b>${state.config.role}</b>. Ready when you are.</p></div>`; showView("interviewWorkspace"); renderQuestion(); startTimer(); setTimeout(() => enableInterviewMedia(), 250); }
function stopRecording() { clearInterval(state.recordingTimer); state.recording = false; $("recordButton").classList.remove("recording"); $("recordButton").innerHTML = "<span>●</span> Start recording"; $("recordStatus").textContent = state.recordingSeconds ? `Voice note captured · ${state.recordingSeconds}s` : "Voice answers coming soon"; }
function initInterviewPage() { seedHistory(); populateCategories(); populateRoles(); renderHistory(); updateSetupPreview(); document.querySelectorAll("[data-open-setup]").forEach((button) => button.addEventListener("click", () => { showView("interviewSetup"); updateSetupPreview(); })); document.querySelectorAll("[data-show-landing]").forEach((button) => button.addEventListener("click", () => { showView("interviewLanding"); renderHistory(); })); $("categoryGrid").addEventListener("click", (event) => { const button = event.target.closest("[data-category]"); if (!button) return; $("setupRole").value = button.dataset.category; const category = categories.find((item) => item[0] === button.dataset.category); $("setupType").value = category[4]; updateSetupPreview(); showView("interviewSetup"); }); $("interviewSetupForm").addEventListener("submit", (event) => { event.preventDefault(); beginInterview(); }); ["setupRole", "setupExperience", "setupType", "setupDifficulty"].forEach((id) => $(id).addEventListener("change", updateSetupPreview)); document.querySelectorAll("input[name='duration']").forEach((input) => input.addEventListener("change", updateSetupPreview)); $("submitAnswer").addEventListener("click", () => submitCurrent(false)); $("skipQuestion").addEventListener("click", () => submitCurrent(true)); $("previousQuestion").addEventListener("click", () => { if (state.current > 0) { state.current -= 1; renderQuestion(); } }); $("finishInterviewTop").addEventListener("click", () => finishInterview(false)); $("exitInterview").addEventListener("click", () => { if (confirm("Exit this session? Your unfinished answers will not be saved.")) { clearInterval(state.timer); stopInterviewMedia(); showView("interviewLanding"); } }); $("viewReport").addEventListener("click", () => renderReport(state.latestReport)); $("reportPracticeAgain").addEventListener("click", () => showView("interviewSetup")); $("runCodeButton").addEventListener("click", () => { const code = $("codeInput").value.trim(); $("codeOutput").textContent = code ? "✓ Simulated tests passed · 3 assertions checked" : "Add a solution before running the code."; }); $("recordButton").addEventListener("click", () => { if (state.recording) { stopRecording(); return; } state.recording = true; state.recordingSeconds = 0; $("recordButton").classList.add("recording"); $("recordButton").innerHTML = "<span>■</span> Stop recording"; $("recordStatus").textContent = "Recording · 0s"; state.recordingTimer = setInterval(() => { state.recordingSeconds += 1; $("recordStatus").textContent = `Recording · ${state.recordingSeconds}s`; }, 1000); }); $("startMediaButton").addEventListener("click", enableInterviewMedia); $("toggleCameraButton").addEventListener("click", toggleCamera); $("toggleMicButton").addEventListener("click", toggleMicrophone); $("logoutBtn").addEventListener("click", () => { localStorage.removeItem("careerPilotUser"); toast("You have been logged out."); }); $("historySection").addEventListener("click", (event) => { const button = event.target.closest("[data-open-setup]"); if (button) showView("interviewSetup"); }); $("mockInterviewPage"); $("[data-scroll-history]"); document.querySelector("[data-scroll-history]").addEventListener("click", () => $("historySection").scrollIntoView({ behavior: "smooth" })); }
document.addEventListener("DOMContentLoaded", initInterviewPage);
