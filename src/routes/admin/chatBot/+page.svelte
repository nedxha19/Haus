<script>
  let messages = [];
  let input = '';
  let loading = false;
  let controller;
  let typingInterval;

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg = {
      role: 'user',
      text: input.trim()
    };

    messages = [...messages, userMsg];
    input = '';
    loading = true;

    controller = new AbortController();

    try {
      const res = await fetch('/admin/chatBot/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: messages }),
        signal: controller.signal
      });

      const data = await res.json();

      const botMsg = {
        role: 'bot',
        text: '',
        typingText: data.reply.split(' '),
        currentWordIndex: 0
      };

      messages = [...messages, botMsg];
      typeBotResponse(botMsg);
    } catch (err) {
      messages = [...messages, { role: 'bot', text: err.message || 'Error' }];
      loading = false;
    }
  }

  function typeBotResponse(botMsg) {
    typingInterval = setInterval(() => {
      if (botMsg.currentWordIndex < botMsg.typingText.length) {
        botMsg.text += (botMsg.currentWordIndex === 0 ? '' : ' ') + botMsg.typingText[botMsg.currentWordIndex++];
      } else {
        clearInterval(typingInterval);
        loading = false;
      }
    }, 40);
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="chat-page">
  <header class="chat-header">
    <h2>AI ChatBot</h2>
  </header>

  <div class="chat-body">
    {#each messages as msg (msg.text + msg.role)}
      <div class="message {msg.role}">
        <p class="message-text">{msg.text}</p>
      </div>
    {/each}

    {#if loading}
      <div class="message bot">
        <p class="message-text">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </p>
      </div>
    {/if}
  </div>

  <footer class="chat-footer">
    <textarea
      bind:value={input}
      placeholder="Type a message..."
      rows="1"
      on:keydown={handleKeydown}
    ></textarea>

    <button on:click={sendMessage}>Send</button>
  </footer>
</div>
<style>
  .chat-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #ffffff;
    color: #1f2937; /* neutral dark text */
    font-family: 'Poppins', sans-serif;
  }

  .chat-header {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--sidebar-active);
    color: #ffffff;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: #f9fafb; /* light gray background */
  }

  .message {
    max-width: 80%;
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius);
    line-height: 1.4;
    font-size: 0.95rem;
    word-wrap: break-word;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .message.user {
    align-self: flex-end;
    background: #e0f2fe; /* light blue */
    color: #0c4a6e;      /* dark blue text */
  }

  .message.bot {
    align-self: flex-start;
    background: #e5e7eb; /* soft gray */
    color: #1f2937;
  }

  .chat-footer {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid #e5e7eb;
    background: #ffffff;
  }

  .chat-footer textarea {
    flex: 1;
    resize: none;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    border-radius: var(--border-radius);
    border: 1px solid #cbd5e1; /* soft border */
    background: #ffffff;
    color: #1f2937;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .chat-footer textarea:focus {
    outline: none;
    border-color: var(--sidebar-active);
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
  }

  .chat-footer button {
    background: var(--sidebar-active);
    color: #ffffff;
    border: none;
    padding: 0 1.25rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background 0.2s;
  }

  .chat-footer button:hover {
    background: #0284c7;
  }

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background: var(--sidebar-active);
    border-radius: 50%;
    animation: blink 1.4s infinite both;
  }

  @keyframes blink {
    0%, 80%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }
</style>
