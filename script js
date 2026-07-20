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

    setTimeout(() => {
        const reply = getAIReply(message);
        addMessage(reply, "ai-message");
        speak(reply);
    }, 500);
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
        return "Hello! 👋 I am TWINX AI. Nice to meet you.";
    }

    if (message.includes("how are you")) {
        return "I'm doing great! Thank you for asking. 😊";
    }

    if (message.includes("your name")) {
        return "My name is TWINX AI, your personal assistant.";
    }

    if (message.includes("time")) {
        return "Current time is: " + new Date().toLocaleTimeString();
    }

    if (message.includes("date")) {
        return "Today's date is: " + new Date().toLocaleDateString();
    }

    return "I understand your message: \"" + message + "\". Soon I'll be connected to the internet and become much smarter! 🚀";
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
