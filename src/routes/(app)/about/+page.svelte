<script>
	import { t } from "$lib/client/localization/translations"

	export let data;

	const { pageText } = data || undefined;
	const { title, paragraphs } = pageText;
</script>

<a href="/">{$t('about.backButton')}</a>

<h1>{@html title}</h1>

{#each paragraphs as paragraph}
	<p>{@html paragraph}</p>
{/each}
