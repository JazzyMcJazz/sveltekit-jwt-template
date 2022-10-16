<script>
    import { page } from "$app/stores"

    const { user } = $page.data;
</script>

<h1>Welcome {user && user.username ? user.username : ''}</h1>
