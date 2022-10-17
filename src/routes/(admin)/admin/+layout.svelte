<nav>
	<a href="/">Home</a>
	<div style="display: inline-block">
		<form action="/logout" method="POST">
			<button type="submit">Logout</button>
		</form>
	</div>
	<code>I am the (admin)/+layout.svelte layout navbar</code>
</nav>

<hr />

<main data-sveltekit-prefetch>
	<slot />
</main>
