<script>
	import { t } from '$lib/client/localization/translations';

	export let form;
</script>

<h1>{$t('register.title')}</h1>

<!-- TODO: Progressive enhancement -->
<form action="?/register" method="POST">
	<div>
		<label for="username">{$t('register.username')}</label>
		<input id="username" name="username" type="text" required />
	</div>
	<div>
		<label for="password">{$t('register.password')}</label>
		<input id="password" name="password" type="password" required />
	</div>
	<div>
		<label for="repeatPassword">{$t('register.repeatPassword')}</label>
		<input id="repeatPassword" name="repeatPassword" type="password" required />
	</div>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	<button type="submit">{$t('register.submitButton')}</button>
</form>
