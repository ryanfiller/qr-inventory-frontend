<script>
  import { page } from '$app/stores'
  import '../app.css'

  import Breadcrumbs from '$lib/components/breadcrumbs.svelte'

  const segment = $page.url.pathname.split('/').filter(Boolean)[0]
</script>

<style>
  :global(body) {
    padding: var(--size-3);
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto;
    gap: var(--size-3);
  }

  /* svelte-announcer is the last-child, so do first-child instead */
  :global(body > *:not(:first-child)) {
    margin-top: var(--size-3);
  }
</style>

<header>
  <!-- TODO - scan, search, all... -->
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
      <h1>{segment}</h1>
    {/if}
  {/if}
</header>

<main data-segment={segment}>
  <slot />
</main>

<footer>
  © Oh, I'm sorry I thought this was America.
</footer>