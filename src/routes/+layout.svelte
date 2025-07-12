<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';

	// Check if the current route is an admin route
	$: isAdminRoute = $page.url.pathname.startsWith('/admin');
</script>

{#if !isAdminRoute}
	<Navbar />
{/if}

<main class="main">
	<slot />
</main>

{#if !isAdminRoute}
	<Footer />
{/if}

<style>
	main.main {
		margin-left: 0px;
		margin-right: 0px;
	}

	@media (max-width: 480px) {
		main.main {
			margin: 0px;
		}
	}
	
</style>
