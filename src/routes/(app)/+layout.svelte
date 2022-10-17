<script>
	import { page } from "$app/stores";
	import { Roles } from "$lib/enums/enums.ts";

	const { user } = $page.data;
</script>

<nav>
	<a href="/about" data-sveltekit-prefetch>About</a>

	{#if !user}
		<a href="/login" data-sveltekit-prefetch>Log In</a>
		<a href="/register" data-sveltekit-prefetch>Register</a>
	{/if}

	{#if user}
		{#if user.roles.includes(Roles.ADMIN)}
			<a href="/admin/dashboard" data-sveltekit-prefetch>Admin</a>
		{/if}
		<div style="display: inline-block">
			<form action="/logout" method="POST">
				<button type="submit">Logout</button>
			</form>
		</div>
	{/if}
	<code>I am the (app)/+layout.svelte navbar</code>
</nav>

<hr />

<main>
	<slot />
</main>
