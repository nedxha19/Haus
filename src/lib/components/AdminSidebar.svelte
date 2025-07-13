<script>
  import { onMount } from 'svelte';
  import '@fortawesome/fontawesome-free/css/all.min.css';

  export let isSidebarHidden;

  let activeIndex = 0;

  const menuItems = [
    { icon: 'home', text: 'Property System', href: '/admin/propertySystem', idx: 0 },
    { icon: 'plus-circle', text: 'Add Property', href: '/admin/propertySystem/addProperty', idx: 1 },
    { icon: 'calendar-alt', text: 'Calendar Schedule', href: '/admin/calendarSchedule', idx: 2 },
    { icon: 'message', text: 'Chat Bot', href: '/admin/chatBot', idx: 3 },
    { icon: 'sign-out-alt', text: 'Logout', href: '/admin/logout', idx: 4 }
  ];

  function toggleSidebar() {
    isSidebarHidden = !isSidebarHidden;
  }

  function setActive(index) {
    activeIndex = index;
  }

  onMount(() => {
    const handleResize = () => {
      isSidebarHidden = window.innerWidth < 768;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<nav class="sidebar {isSidebarHidden ? 'hide' : ''}">
  <div class="toggle-container">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="toggle-btn" on:click={toggleSidebar}>
      <i class="fas fa-bars"></i>
    </button>
  </div>

  <a href="/" class="logo">
    <i class="fas fa-user-cog logo-icon"></i>
    <span class="logo-text">Admin Dashboard</span>
  </a>

  <ul class="side-menu">
    {#each menuItems as item (item.idx)}
      <li class="menu-item" class:active={activeIndex === item.idx}>
        <div class="active-indicator"></div>
        <a href={item.href} class="nav-link" on:click={() => setActive(item.idx)}>
          <i class="fas fa-{item.icon}"></i>
          <span class="link-text">{item.text}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  :global(:root) {
    --sidebar-bg: #1a2236;
    --sidebar-active: #0ea5e9;
    --sidebar-hover: rgba(14, 165, 233, 0.15);
    --text-primary: #f3f4f6;
    --text-secondary: #9ca3af;
    --transition-speed: 0.3s;
    --border-radius: 8px;
    --icon-size: 1.25rem;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 260px;
    background: var(--sidebar-bg);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    transition: width var(--transition-speed) ease;
    overflow: hidden;
    z-index: 100;
    font-family: 'Poppins', sans-serif;
  }

  .sidebar.hide {
    width: 72px;
  }

  .toggle-container {
    display: flex;
    justify-content: flex-end;
    padding: 24px 20px 16px;
  }

  .toggle-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: var(--icon-size);
    transition: transform var(--transition-speed), color 0.2s ease;
  }

  .toggle-btn:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.05);
  }

  .logo {
    display: flex;
    align-items: center;
    padding: 0 20px 28px;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 12px;
    color: var(--text-primary);
  }

  .logo-icon {
    font-size: 22px;
    color: var(--sidebar-active);
    margin-right: 12px;
  }

  .logo-text {
    font-weight: 600;
    font-size: 19px;
    letter-spacing: 0.5px;
    white-space: nowrap;
    transition: opacity var(--transition-speed);
  }

  .sidebar.hide .logo-text {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }

  .side-menu {
    padding: 0 12px;
    list-style: none;
    margin: 0;
    flex-grow: 1;
  }

  .menu-item {
    position: relative;
    margin-bottom: 8px;
    height: 50px;
    border-radius: var(--border-radius);
    transition: background var(--transition-speed);
  }

  .menu-item.active {
    background: var(--sidebar-hover);
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--border-radius);
    transition: color 0.2s ease, background var(--transition-speed);
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.03);
  }

  .menu-item.active .nav-link {
    color: var(--text-primary);
  }

  .nav-link i {
    min-width: 36px;
    font-size: var(--icon-size);
    transition: color var(--transition-speed);
  }

  .menu-item.active .nav-link i {
    color: var(--sidebar-active);
  }

  .link-text {
    font-weight: 500;
    font-size: 15px;
    transition: opacity var(--transition-speed), transform var(--transition-speed);
  }

  .sidebar.hide .link-text {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }

  .active-indicator {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 4px;
    background: var(--sidebar-active);
    border-radius: 0 4px 4px 0;
    opacity: 0;
    transition: opacity var(--transition-speed);
  }

  .menu-item.active .active-indicator {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 72px;
    }
    .logo-text {
      display: none;
    }
    .link-text {
      display: none;
    }
  }
</style>
