<script>
  import { enhance } from '$app/forms';
  export let form;
</script>

<div class="login-container">
  <div class="login-card">
    <div class="login-header">
      <i class="fas fa-user-cog logo-icon"></i>
      <h1>Admin Login</h1>
      <p>Secure access to your account</p>
    </div>

    <form method="POST" action="?/login" use:enhance>
      <div class="form-group">
        <label for="email">Email address</label>
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="••••••••"
          />
        </div>
      </div>

      <button type="submit" class="login-btn">
        <i class="fas fa-sign-in-alt"></i>
        Sign in
      </button>

      {#if form}
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {form.message}
        </div>
      {/if}
    </form>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

  :global(:root) {
    --sidebar-active: #0ea5e9;
    --text-primary: #f3f4f6;
    --text-secondary: #9ca3af;
    --border-radius: 8px;
    --transition-speed: 0.3s;
  }

  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1rem;
    background-color: #1a2236;
    font-family: 'Poppins', sans-serif;
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--border-radius);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo-icon {
    font-size: 2.5rem;
    color: var(--sidebar-active);
    margin-bottom: 1rem;
  }

  .login-header h1 {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .login-header p {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .input-group {
    position: relative;
  }

  .input-group i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .input-group input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
    color: var(--text-primary);
    font-size: 0.875rem;
    transition: all var(--transition-speed);
  }

  .input-group input::placeholder {
    color: var(--text-secondary);
  }

  .input-group input:focus {
    outline: none;
    border-color: var(--sidebar-active);
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
  }

  .login-btn {
    width: 100%;
    padding: 0.875rem;
    background: var(--sidebar-active);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background 0.3s, transform 0.1s;
  }

  .login-btn:hover {
    background: #0284c7;
    transform: translateY(-1px);
  }

  .error-message {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--border-radius);
    color: #ef4444;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 640px) {
    .login-card {
      padding: 1.5rem;
    }
  }
</style>
