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

<div class="admin-container">
  <div class="chat-page">
    <header class="chat-header">
      <h2 class="admin-heading-2">AI ChatBot</h2>
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
        class="chat-input"
      ></textarea>

      <button on:click={sendMessage} class="admin-button-primary send-button">Send</button>
    </footer>
  </div>
</div>

<style>
  .chat-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--admin-bg-secondary);
    color: var(--admin-text-primary);
  }

      .chat-header {
        display: flex;
        align-items: center;
        padding: var(--admin-space-4) var(--admin-space-6);
        background: var(--admin-gradient-header);
        color: var(--admin-text-white);
        box-shadow: var(--admin-shadow-md);
    }

  .chat-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--admin-space-5);
    display: flex;
    flex-direction: column;
    gap: var(--admin-space-3);
    background: var(--admin-bg-accent);
  }

  .message {
    max-width: 80%;
    padding: var(--admin-space-3) var(--admin-space-4);
    border-radius: var(--admin-radius-lg);
    line-height: 1.4;
    font-size: var(--admin-text-base);
    word-wrap: break-word;
    box-shadow: var(--admin-shadow-sm);
  }

      .message.user {
        align-self: flex-end;
        background: var(--admin-gradient-button);
        color: var(--admin-text-white);
    }

  .message.bot {
    align-self: flex-start;
    background: var(--admin-bg-secondary);
    color: var(--admin-text-primary);
    border: 1px solid var(--admin-border-light);
  }

  .message-text {
    margin: 0;
  }

  .chat-footer {
    display: flex;
    gap: var(--admin-space-3);
    padding: var(--admin-space-4) var(--admin-space-5);
    border-top: 1px solid var(--admin-border-light);
    background: var(--admin-bg-secondary);
  }

  .chat-input {
    flex: 1;
    resize: none;
    padding: var(--admin-space-3) var(--admin-space-4);
    font-size: var(--admin-text-base);
    border-radius: var(--admin-radius-md);
    border: 2px solid var(--admin-border-light);
    background: var(--admin-bg-secondary);
    color: var(--admin-text-primary);
    transition: var(--admin-transition-fast);
    font-family: inherit;
  }

      .chat-input:focus {
        outline: none;
        border-color: var(--admin-accent);
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
    }

  .send-button {
    padding: var(--admin-space-3) var(--admin-space-6);
    white-space: nowrap;
  }

      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 2px;
        background: var(--admin-accent);
        border-radius: 50%;
        animation: blink 1.4s infinite both;
    }

  @keyframes blink {
    0%, 80%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }

  /* Mobile-First Responsive Design */
  @media (max-width: 640px) {
    .chat-header {
      padding: var(--admin-space-3) var(--admin-space-4);
    }

    .chat-body {
      padding: var(--admin-space-4);
      gap: var(--admin-space-2);
    }

    .message {
      max-width: 95%;
      padding: var(--admin-space-2) var(--admin-space-3);
      font-size: var(--admin-text-sm);
    }

    .chat-footer {
      padding: var(--admin-space-3) var(--admin-space-4);
      gap: var(--admin-space-2);
    }

    .send-button {
      padding: var(--admin-space-3) var(--admin-space-4);
      font-size: var(--admin-text-sm);
    }
  }
</style>