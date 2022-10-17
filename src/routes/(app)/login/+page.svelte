<script>
	export let form;
</script>

<h1>Log in</h1>

<!-- TODO: Progressive enhancement -->
<form action="?/login" method="POST">
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	<button type="submit">Log in</button>
</form>
