<!-- HOME PAGE -->
<script>
	import { page } from "$app/stores";
    import { t } from "$lib/client/localization/translations";

	const { user } = $page.data;
</script>

<h1>{$t('home.title')} {user && user.username ? user.username : ""}</h1>
