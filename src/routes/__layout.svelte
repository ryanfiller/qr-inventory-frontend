<script>
  import { page } from '$app/stores'
  import '../app.css'
  const segment = $page.url.pathname === '/' ? 'homepage' : $page.url.pathname.split('/')[1]
</script>

<style>
  h1 {
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
</header>

{#if !$page.error}
  {#if Object.values($page.params).length}
    <h1>{Object.values($page.params)}</h1>
  {:else}
    <h1>{$page.url.pathname.split('/').filter(Boolean)}</h1>
  {/if}
{/if}

<slot {segment} />

<footer>
  © Oh, I'm sorry I thought this was America.
</footer>