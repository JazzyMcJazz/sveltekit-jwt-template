/*
 * This file serves as an example of how you can import page text data instead of using static data.
 */

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
	/*
	 * Wrap every fetch in async functions and call them without await.
	 * SvelteKit will run all top level promises/async functions concurrently and
	 * await them. This way you prevent waterfall conditions.
	 */
	const fetchPageData = async () => {
		const res = await fetch(`${url.origin}/AboutPageData`);
		if (!res.ok) return { data: null };
		return await res.json();
	};

	return {
		pageText: fetchPageData(),
	};
}
