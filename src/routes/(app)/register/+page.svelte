<script>
	export let form;
</script>

<h1>Register</h1>

<!-- TODO: Progressive enhancement -->
<form action="?/register" method="POST">
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" required />
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>
	<div>
		<label for="repeatPassword">Repeat Password</label>
		<input id="repeatPassword" name="repeatPassword" type="password" required />
	</div>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	<button type="submit">Register</button>
</form>
