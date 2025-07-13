<script>
  import AdminSidebar from '$lib/components/AdminSidebar.svelte';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';

  export const isSidebarHidden = writable(false);

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
  .admin-layout {
    display: flex;
    min-height: 100vh;
    overflow-x: hidden;
    transition: all 0.3s ease;
  }

  .content {
    flex: 1;
    padding: 20px;
    transition: margin-left 0.3s ease;
    margin-left: 260px;
    background: #f9fafb;
  }

  .admin-layout.sidebar-hidden .content {
    margin-left: 72px;
  }

  .content.no-padding {
    padding: 0;
  }

  @media (max-width: 768px) {
    .content {
      margin-left: 0;
    }
  }
</style>
