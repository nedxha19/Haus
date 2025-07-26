<script> 
import AdminSidebar from '$lib/components/AdminSidebar.svelte';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';
  export const isSidebarHidden = writable(false);

  // Check if the current route is an auth page
  $: isAuthPage = $page.url.pathname === '/admin/login' || $page.url.pathname === '/admin/register';
</script>

{#if isAuthPage}
  <slot />
{:else}
  <div class="admin-layout { $isSidebarHidden ? 'sidebar-hidden' : '' }">
    <AdminSidebar bind:isSidebarHidden={$isSidebarHidden} />
    <main class="content { $page.url.pathname === '/admin/calendarSchedule' ? 'no-padding' : '' }">
      <slot />
    </main>
  </div>
{/if}

<style>
  /* ========================================
     GLOBAL ADMIN DESIGN SYSTEM
     Professional, Clean, Maintainable
  ======================================== */

  /* CSS Reset */
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Global CSS Variables - Professional Design System */
  :global(:root) {
    /* === PROFESSIONAL ADMIN COLORS === */
    --admin-primary: #1a2236;           /* Dark navy - professional */
    --admin-primary-light: #2a3441;     /* Lighter navy */
    --admin-primary-dark: #141b28;      /* Darker navy */
    --admin-secondary: #6b7280;
    --admin-accent: #0ea5e9;            /* Bright blue accent */
    
    /* Original Auth Colors (same as admin now) */
    --auth-sidebar-bg: #1a2236;
    --auth-sidebar-active: #0ea5e9;
    --auth-sidebar-hover: rgba(14, 165, 233, 0.15);
    --auth-text-primary: #f3f4f6;
    --auth-text-secondary: #9ca3af;
    
    /* Backgrounds */
    --admin-bg-primary: #f8fafc;
    --admin-bg-secondary: #ffffff;
    --admin-bg-dark: #1a2236;
    --admin-bg-accent: rgba(14, 165, 233, 0.05);
    
    /* Professional Gradients */
    --admin-gradient-primary: linear-gradient(135deg, var(--admin-primary-dark) 0%, var(--admin-primary) 100%);
    --admin-gradient-header: linear-gradient(135deg, var(--admin-primary) 0%, var(--admin-primary-light) 100%);
    --admin-gradient-button: linear-gradient(135deg, var(--admin-accent) 0%, #0284c7 100%);
    
    /* Professional Text Colors */
    --admin-text-primary: #0f172a;      /* Rich dark slate - premium readability */
    --admin-text-secondary: #475569;    /* Professional medium gray */
    --admin-text-muted: #64748b;        /* Lighter muted text */
    --admin-text-white: #ffffff;
    --admin-text-label: #1e293b;        /* Strong labels */
    --admin-text-placeholder: #94a3b8;  /* Professional placeholder */
    
    /* Borders */
    --admin-border-light: #e5e7eb;
    --admin-border-medium: #d1d5db;
    --admin-border-dark: #374151;
    
    /* Status Colors */
    --admin-success: #10b981;
    --admin-success-light: #d1fae5;
    --admin-error: #ef4444;
    --admin-error-light: #fee2e2;
    --admin-warning: #f59e0b;
    --admin-warning-light: #fef3c7;
    
    /* === SHADOWS === */
    --admin-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --admin-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --admin-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --admin-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* === SPACING (Mobile-First) === */
    --admin-space-1: 0.25rem;
    --admin-space-2: 0.5rem;
    --admin-space-3: 0.75rem;
    --admin-space-4: 1rem;
    --admin-space-5: 1.25rem;
    --admin-space-6: 1.5rem;
    --admin-space-8: 2rem;
    --admin-space-10: 2.5rem;
    --admin-space-12: 3rem;
    --admin-space-16: 4rem;
    --admin-space-20: 5rem;
    
    /* === TYPOGRAPHY (Mobile-First) === */
    --admin-text-xs: 0.75rem;
    --admin-text-sm: 0.875rem;
    --admin-text-base: 1rem;
    --admin-text-lg: 1.125rem;
    --admin-text-xl: 1.25rem;
    --admin-text-2xl: 1.5rem;
    --admin-text-3xl: 1.875rem;
    --admin-text-4xl: 2.25rem;
    
    /* === BORDER RADIUS === */
    --admin-radius-sm: 0.25rem;
    --admin-radius-md: 0.5rem;
    --admin-radius-lg: 0.75rem;
    --admin-radius-xl: 1rem;
    --admin-radius-2xl: 1.5rem;
    
    /* === TRANSITIONS === */
    --admin-transition-fast: 150ms ease-in-out;
    --admin-transition-normal: 250ms ease-in-out;
    --admin-transition-slow: 350ms ease-in-out;
    
    /* === BREAKPOINTS (Mobile-First) === */
    --admin-bp-sm: 640px;
    --admin-bp-md: 768px;
    --admin-bp-lg: 1024px;
    --admin-bp-xl: 1280px;
    
    /* === LAYOUT === */
    --admin-sidebar-width: 260px;
    --admin-sidebar-collapsed: 72px;
    --admin-header-height: 64px;
    --admin-content-max-width: 1400px;
  }

  /* === PROFESSIONAL MOBILE-FIRST RESPONSIVE DESIGN === */
  .admin-layout {
    display: flex;
    min-height: 100vh;
    transition: var(--admin-transition-normal);
  }

  .content {
    flex: 1;
    padding: 0;
    transition: var(--admin-transition-normal);
    background: transparent;
    min-height: 100vh;
    
    /* Mobile-first: Start with collapsed sidebar */
    margin-left: var(--admin-sidebar-collapsed);
  }

  /* Desktop: Expand sidebar */
  @media (min-width: 768px) {
    .content {
      margin-left: var(--admin-sidebar-width);
    }
  }

  .admin-layout.sidebar-hidden .content {
    margin-left: var(--admin-sidebar-collapsed);
  }

  .content.no-padding {
    padding: 0;
  }

  /* === GLOBAL UTILITY CLASSES === */
  :global(.admin-container) {
    margin: 0;
    padding: 0;
    background: var(--admin-bg-primary);
    min-height: 100vh;
    position: relative;
  }

  :global(.admin-card) {
    background: var(--admin-bg-secondary);
    border-radius: var(--admin-radius-xl);
    box-shadow: var(--admin-shadow-md);
    border: 1px solid var(--admin-border-light);
    overflow: hidden;
  }

  :global(.admin-button-primary) {
    display: inline-flex;
    align-items: center;
    gap: var(--admin-space-2);
    background: var(--admin-gradient-button);
    color: var(--admin-text-white);
    border: none;
    padding: var(--admin-space-3) var(--admin-space-6);
    border-radius: var(--admin-radius-lg);
    font-weight: 600;
    font-size: var(--admin-text-base);
    cursor: pointer;
    transition: var(--admin-transition-normal);
    text-decoration: none;
    box-shadow: var(--admin-shadow-md);
  }

  :global(.admin-button-primary:hover) {
    background: linear-gradient(135deg, #0284c7 0%, var(--admin-accent) 100%);
    box-shadow: var(--admin-shadow-lg);
    transform: translateY(-1px);
  }

  :global(.admin-input) {
    width: 100%;
    padding: var(--admin-space-3) var(--admin-space-4);
    border: 2px solid var(--admin-border-light);
    border-radius: var(--admin-radius-md);
    font-size: var(--admin-text-base);
    background: var(--admin-bg-secondary);
    color: var(--admin-text-primary);
    transition: var(--admin-transition-fast);
  }

  :global(.admin-input:focus) {
    outline: none;
    border-color: var(--admin-accent);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }

  :global(.admin-input::placeholder) {
    color: var(--admin-text-placeholder);
    opacity: 1;
  }

  /* === PROFESSIONAL RESPONSIVE GRID SYSTEM === */
  :global(.admin-grid) {
    display: grid;
    gap: var(--admin-space-6);
  }

  /* Mobile: 1 column */
  :global(.admin-grid-responsive) {
    grid-template-columns: 1fr;
  }

  /* Tablet: 2 columns */
  @media (min-width: 640px) {
    :global(.admin-grid-responsive) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Desktop: 3 columns */
  @media (min-width: 1024px) {
    :global(.admin-grid-responsive) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* === PROFESSIONAL TYPOGRAPHY SYSTEM === */
  :global(.admin-heading-1) {
    font-size: var(--admin-text-2xl);
    font-weight: 700;
    color: var(--admin-text-primary);
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.025em;
  }

  @media (min-width: 768px) {
    :global(.admin-heading-1) {
      font-size: var(--admin-text-4xl);
    }
  }

  :global(.admin-heading-2) {
    font-size: var(--admin-text-xl);
    font-weight: 600;
    color: var(--admin-text-primary);
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.015em;
  }

  @media (min-width: 768px) {
    :global(.admin-heading-2) {
      font-size: var(--admin-text-2xl);
    }
  }

  :global(.admin-text-body) {
    font-size: var(--admin-text-base);
    color: var(--admin-text-secondary);
    line-height: 1.5;
    margin: 0;
  }

  :global(.admin-text-label) {
    font-size: var(--admin-text-base);
    font-weight: 600;
    color: var(--admin-text-label);
    margin: 0;
    line-height: 1.4;
  }

  /* === MOBILE-OPTIMIZED SPACING === */
  :global(.admin-section) {
    padding: var(--admin-space-6) var(--admin-space-4);
  }

  @media (min-width: 768px) {
    :global(.admin-section) {
      padding: var(--admin-space-8) var(--admin-space-6);
    }
  }

  @media (min-width: 1024px) {
    :global(.admin-section) {
      padding: var(--admin-space-10) var(--admin-space-8);
    }
  }
</style>