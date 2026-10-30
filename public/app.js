const form = document.querySelector("#form");
const input = document.querySelector("#question");
const chat = document.querySelector("#chat");
const send = document.querySelector("#send");
const history = [];
const API_BASE = (window.AYUDA_CENS_API_BASE || "").replace(/\/$/, "");
function bubble(text, role) {
  const el = document.createElement("div");
  el.className = "bubble " + role;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
  return el;
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question || send.disabled) return;
  history.push({ role: "user", content: question });
  bubble(question, "user");
  input.value = "";
  send.disabled = true;
  const waiting = bubble("Estoy preparando una explicación...", "assistant");
  try {
    const response = await fetch(API_BASE + "/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-20) })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error del servidor.");
    waiting.textContent = data.answer;
    history.push({ role: "assistant", content: data.answer });
  } catch (error) {
    waiting.textContent = error.message + " Revisá que el servidor esté publicado y que public/config.js tenga su dirección HTTPS.";
    history.pop();
  } finally {
    send.disabled = false;
    input.focus();
  }
});
if ("serviceWorker" in navigator && !window.location.protocol.startsWith("capacitor")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
