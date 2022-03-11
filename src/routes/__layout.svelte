<script>
  import { page } from '$app/stores'
  import '../app.css'

  import Breadcrumbs from '$lib/components/breadcrumbs.svelte'
</script>

<style>
  header {
    margin: 0 var(--size-3);
  }
</style>

<header>
  <!-- scan, search, all... -->
  <nav>
    <ul>
      <li>
        <a href='/'>home</a>
      </li>
      <li>
        <a href='/rooms'>all rooms</a>
      </li>
      <li>
        <a href='/shelves'>all shelves</a>
      </li>
      <li>
        <a href='/boxes'>all boxes</a>
      </li>
    </ul>
  </nav>

  {#if !$page.error}
    {#if Object.values($page.params).length}
      <Breadcrumbs />
      <h1>
        {Object.values($page.params)}
      </h1>
    {:else}
      <h1>{$page.url.pathname.split('/').filter(Boolean)}</h1>
    {/if}
  {/if}
</header>

<slot />

<footer>
  © Oh, I'm sorry I thought this was America.
</footer>