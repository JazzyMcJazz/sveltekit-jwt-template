<script>
	import { page } from "$app/stores";
	import { Roles } from "$lib/client/interfaces/enums.ts";
	import { t } from "$lib/client/localization/translations";

	const { user } = $page.data;

</script>

<nav>
	<a href="/about">{$t('common.navAbout', { default: 'About' })}</a>

	{#if !user}
		<a href="/login">{$t('common.navLogin', { default: 'Log in' })}</a>
		<a href="/register">{$t('common.navRegister', { default: 'Register' })}</a>
	{/if}

	{#if user}
		{#if user.roles.includes(Roles.ADMIN)}
			<a href="/admin/dashboard">{$t('common.navAdmin', { default: 'Admin' })}</a>
		{/if}
		<a href="/profile/dashboard">{$t('common.navProfile', { default: 'Profile' })}</a>
		<div style="display: inline-block">
			<form action="/logout" method="POST">
				<button type="submit">{$t('common.navLogout', { default: 'Logout' })}</button>
			</form>
		</div>
	{/if}
	<code>I am the (app)/+layout.svelte navbar</code>
</nav>

<hr />

<main>
	<slot />
</main>
