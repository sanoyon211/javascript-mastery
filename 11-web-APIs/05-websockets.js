// ============================================================
// 📘 05 - WebSockets (Real-time Communication)
// ============================================================
// HTTP: Client request করে, Server respond করে (one-way trigger)
// WebSocket: দুজনেই যেকোনো সময় message পাঠাতে পারে (bidirectional!)
//
// Use cases: Chat app, Live notifications, Online games,
//            Stock prices, Collaborative editing, Live sports scores

// ============================================================
// 📌 Basic WebSocket
// ============================================================
function createWebSocket(url) {
  const ws = new WebSocket(url);

  // Connection events:
  ws.onopen = (event) => {
    console.log("✅ Connected to WebSocket server");
    ws.send("Hello Server!"); // message পাঠাও
  };

  ws.onmessage = (event) => {
    const data = event.data;
    console.log("📨 Message received:", data);

    // JSON parse:
    try {
      const parsed = JSON.parse(data);
      handleMessage(parsed);
    } catch {
      console.log("Plain text:", data);
    }
  };

  ws.onclose = (event) => {
    console.log("❌ Connection closed:", event.code, event.reason);
    // Reconnect logic:
    if (!event.wasClean) {
      console.log("Unexpected disconnect! Reconnecting...");
      setTimeout(() => createWebSocket(url), 3000);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return ws;
}

function handleMessage(data) {
  switch (data.type) {
    case "chat":
      displayMessage(data);
      break;
    case "notification":
      showNotification(data);
      break;
    case "userJoined":
      updateUserList(data.user);
      break;
  }
}

// ============================================================
// 📌 Chat App Class
// ============================================================
class ChatClient {
  #ws = null;
  #username;
  #messageHandlers = new Map();

  constructor(username) {
    this.#username = username;
  }

  connect(url) {
    this.#ws = new WebSocket(url);

    this.#ws.onopen = () => {
      this.#emit("connected");
      this.#sendRaw({ type: "join", username: this.#username });
    };

    this.#ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.#emit(data.type, data);
      this.#emit("message", data); // all messages
    };

    this.#ws.onclose = () => this.#emit("disconnected");
    this.#ws.onerror = (e) => this.#emit("error", e);

    return this;
  }

  sendMessage(text, room = "general") {
    this.#sendRaw({
      type: "chat",
      text,
      room,
      username: this.#username,
      timestamp: new Date().toISOString()
    });
  }

  on(event, handler) {
    if (!this.#messageHandlers.has(event)) {
      this.#messageHandlers.set(event, []);
    }
    this.#messageHandlers.get(event).push(handler);
    return this;
  }

  #emit(event, data) {
    this.#messageHandlers.get(event)?.forEach(handler => handler(data));
  }

  #sendRaw(data) {
    if (this.#ws?.readyState === WebSocket.OPEN) {
      this.#ws.send(JSON.stringify(data));
    }
  }

  disconnect() {
    this.#ws?.close(1000, "User disconnected");
  }

  get isConnected() {
    return this.#ws?.readyState === WebSocket.OPEN;
  }
}

// Usage:
// const chat = new ChatClient("Karim");
// chat
//   .connect("wss://your-chat-server.com")
//   .on("connected", () => console.log("Connected!"))
//   .on("chat", (data) => displayMessage(data))
//   .on("disconnected", () => console.log("Disconnected"));
//
// chat.sendMessage("Hello everyone!");

// ============================================================
// 📌 Helper functions (Browser এ implement করো)
// ============================================================
function displayMessage(data) {
  const messagesDiv = document.querySelector("#messages");
  if (!messagesDiv) return;

  const msgEl = document.createElement("div");
  msgEl.classList.add("message");
  msgEl.innerHTML = `
    <span class="username">${data.username}</span>
    <span class="text">${escapeHTML(data.text)}</span>
    <span class="time">${new Date(data.timestamp).toLocaleTimeString()}</span>
  `;
  messagesDiv.append(msgEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // auto scroll
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function showNotification(data) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(data.title, { body: data.message });
  }
}

function updateUserList(user) {
  const usersList = document.querySelector("#users-list");
  // Update active users display
}

// ============================================================
// 📌 Auto-reconnect WebSocket
// ============================================================
class ReliableWebSocket {
  #url;
  #ws = null;
  #reconnectDelay = 1000;
  #maxDelay = 30000;
  #handlers = {};

  constructor(url) {
    this.#url = url;
  }

  connect() {
    this.#ws = new WebSocket(this.#url);
    this.#ws.onopen = () => {
      this.#reconnectDelay = 1000; // reset delay on success
      this.#handlers.open?.();
    };
    this.#ws.onmessage = (e) => this.#handlers.message?.(JSON.parse(e.data));
    this.#ws.onclose = (e) => {
      if (!e.wasClean) {
        console.log(`Reconnecting in ${this.#reconnectDelay / 1000}s...`);
        setTimeout(() => this.connect(), this.#reconnectDelay);
        this.#reconnectDelay = Math.min(this.#reconnectDelay * 2, this.#maxDelay); // exponential backoff
      }
    };
  }

  on(event, handler) { this.#handlers[event] = handler; return this; }
  send(data) { this.#ws?.send(JSON.stringify(data)); }
}

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// WebSocket test server: wss://echo.websocket.org (echo server)
// 1. Echo test: message পাঠাও, server ফেরত পাঠাবে
// 2. Chat UI: HTML তৈরি করো, message send/receive handle করো
// 3. Live typing indicator: typing শুরু করলে "X is typing..." দেখাও
