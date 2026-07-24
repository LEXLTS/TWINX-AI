const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// Send button
sendBtn.addEventListener("click", sendMessage);

// Enter key
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    addMessage(message, "user-message");

    userInput.value = "";

    const typing = document.createElement("div");
typing.className = "ai-message";
typing.innerHTML = "⌛ TWINX AI is typing...";

chatBox.appendChild(typing);
chatBox.scrollTop = chatBox.scrollHeight;

setTimeout(() => {

    chatBox.removeChild(typing);

    const reply = getAIReply(message);

    addMessage(reply, "ai-message");

    speak(reply);

}, 1000);
}

function addMessage(text, className) {
    const message = document.createElement("div");
    message.className = className;
    message.innerHTML = text;

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIReply(message) {

    message = message.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
        return "Hello! 👋 Nice to see you again, TWINX!";
    }

    if (message.includes("good morning")) {
        return "🌅 Good Morning, TWINX! I hope you have a wonderful day!";
    }

    if (message.includes("good afternoon")) {
        return "☀️ Good Afternoon, TWINX! How can I help you today?";
    }

    if (message.includes("good evening")) {
        return "🌆 Good Evening, TWINX! Welcome back!";
    }

    if (message.includes("how are you")) {
        return "😊 I'm doing great! Thank you for asking.";
    }

    if (message.includes("who are you")) {
        return "🤖 I am TWINX AI, your personal AI assistant. I was built to help you learn, work, and grow every day.";
    }

    if (message.includes("who created you")) {
        return "⚡ I was created by TWINX with guidance from TWINXLEX. Together we're building me step by step.";
    }

    if (message.includes("who am i")) {
        return "👤 You are TWINX, the creator of TWINX AI. You're learning programming and building your own AI assistant.";
    }

    if (message.includes("time")) {
        return "🕒 Current time is: " + new Date().toLocaleTimeString();
    }

    if (message.includes("date")) {
        return "📅 Today's date is: " + new Date().toLocaleDateString();
    }

    if (message.includes("forex")) {
        return "📈 I can help you learn Forex trading. Soon I'll also be able to analyze charts and assist you with market observations.";
    }

    if (message.includes("thank")) {
        return "💚 You're welcome, TWINX! I'm always here to help.";
    }

    if (message.includes("bye")) {
        return "👋 Goodbye! Have a wonderful day. I'll be here when you come back.";
    }

    return "🤔 That's an interesting question. My knowledge is still growing. In a future version, I'll be connected to a real AI service so I can answer many more questions.";
}

// Voice Output
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
}

// Voice Input
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = function(event) {

        const transcript = event.results[0][0].transcript;

        userInput.value = transcript;

        sendMessage();
    };

    voiceBtn.addEventListener("click", () => {
        recognition.start();
    });

} else {

    voiceBtn.disabled = true;
    voiceBtn.innerHTML = "❌";

}
