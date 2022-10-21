<script>
	import { t } from "$lib/client/localization/translations";

	export let form;
</script>

<h1>{$t('login.title')}</h1>

<!-- TODO: Progressive enhancement -->
<form action="?/login" method="POST">
	<div>
		<label for="username">{$t('login.username')}</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="password">{$t('login.password')}</label>
		<input id="password" name="password" type="password" required />
	</div>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	<button type="submit">{$t('login.submitButton')}</button>
</form>
