const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// Event Listeners
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    addMessage(message, "user-message");

    userInput.value = "";

    // Typing indicator updated to TWINX is typing...
    const typing = document.createElement("div");
    typing.className = "ai-message";
    typing.innerHTML = "⌛ TWINX is typing...";

    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("https://twinx-ai-api.letchus43.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: message
            })
        });

        const data = await response.json();

        if (chatBox.contains(typing)) {
            chatBox.removeChild(typing);
        }

        if (data.reply) {
    const formattedReply = data.reply.replace(/\n/g, "<br>");
    addMessage(formattedReply, "ai-message");
   // speak(data.reply);
} else {
    addMessage("⚠️ " + (data.error || "Unknown error"), "ai-message");
}

    } catch (error) {
        if (chatBox.contains(typing)) {
            chatBox.removeChild(typing);
        }
        addMessage("❌ Unable to connect to TWINX.", "ai-message");
    }
}

function addMessage(text, className) {
    const message = document.createElement("div");
    message.className = className;

    const messageText = document.createElement("div");
    messageText.innerHTML = text;

    const time = document.createElement("div");
    time.className = "message-time";

    const now = new Date();

    time.innerHTML = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    message.appendChild(messageText);
    message.appendChild(time);

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
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

// Welcome Message
window.onload = function () {
    const hour = new Date().getHours();
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "🌅 Good Morning, TWINX!<br><br>I hope you have a wonderful day.<br><br>How can I help you today?";
    } else if (hour >= 12 && hour < 17) {
        greeting = "☀️ Good Afternoon, TWINX!<br><br>Ready to continue building your dreams?";
    } else if (hour >= 17 && hour < 21) {
        greeting = "🌆 Good Evening, TWINX!<br><br>Welcome back! What shall we build today?";
    } else {
        greeting = "🌙 Good Night, TWINX!<br><br>Don't forget to get enough rest.<br><br>Tomorrow we'll build something even more amazing!";
    }

    addMessage(greeting, "ai-message");
};
