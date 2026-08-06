document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatStream = document.getElementById("chatStream");

  // Toggle profile dropdown
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
      profileDropdown.classList.remove("active");
    }
  });

  // Send message function
  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Render User Message (Light Green Bubble)
    const userRow = document.createElement("div");
    userRow.className = "message-row user";
    userRow.innerHTML = `
      <div class="bubble user-bubble">${escapeHtml(text)}</div>
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="User" class="avatar user-avatar">
    `;
    chatStream.appendChild(userRow);

    userInput.value = "";
    chatStream.scrollTop = chatStream.scrollHeight;

    // Simulate TWINX AI Response (Light Orange Bubble)
    setTimeout(() => {
      const twinxRow = document.createElement("div");
      twinxRow.className = "message-row twinx";
      twinxRow.innerHTML = `
        <div class="avatar twinx-avatar">TWINX</div>
        <div class="bubble twinx-bubble">I received your message! Let me process that for you.</div>
      `;
      chatStream.appendChild(twinxRow);
      chatStream.scrollTop = chatStream.scrollHeight;
    }, 800);
  }

  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function escapeHtml(string) {
    return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
