<script>
	import { page } from "$app/stores";
	import { Roles } from "$lib/enums/enums.ts";

	const { user } = $page.data;
</script>

<nav>
	<a href="/about">About</a>

	{#if !user}
		<a href="/login">Log In</a>
		<a href="/register">Register</a>
	{/if}

	{#if user}
		{#if user.roles.includes(Roles.ADMIN)}
			<a href="/admin/dashboard">Admin</a>
		{/if}
		<a href="/profile/dashboard">Profile</a>
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
