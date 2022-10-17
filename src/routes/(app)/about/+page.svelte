<script>
	export let data;

	const { pageText } = data || undefined;
	const { title, paragraphs } = pageText;
</script>

<a href="/" data-sveltekit-prefetch>back</a>

<h1>{@html title}</h1>

{#each paragraphs as paragraph}
	<p>{@html paragraph}</p>
{/each}
