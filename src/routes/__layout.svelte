<script>
  import { page } from '$app/stores'
  import '../app.css'

  import Breadcrumbs from '$lib/components/breadcrumbs.svelte'

  $: segment = $page.url.pathname.split('/').filter(Boolean)[0] || 'homepage'
</script>

<style>
  :global(body) {
    padding: var(--size-3);
    display: grid;
    align-items: center;
    grid-template-columns: 100%;
    grid-template-rows: auto auto 1fr auto auto;
    gap: var(--size-3);
    grid-template-areas: "lists" "header" "main" "actions" "footer";
  }

  header { grid-area: header; }

  main { grid-area: main; }

  nav.lists { grid-area: lists; }

  nav.actions { grid-area: actions; }

  footer { grid-area: footer; }


  main {
    /* display: grid;
    gap: var(--size-3);
    grid-template-rows: auto-fill; */
  }
</style>

<nav class='actions'>
  <ul>
    <li>
      <a class='button' href='/'>scan</a>
    </li>
    <li>
      <a class='button' href='/search'>search</a>
    </li>
  </ul>
</nav>

<nav class='lists'>
  <ul>
    <li>
      <a class='button' href='/rooms'>all rooms</a>
    </li>
    <li>
      <a class='button' href='/shelves'>all shelves</a>
    </li>
    <li>
      <a class='button' href='/boxes'>all boxes</a>
    </li>
  </ul>
</nav>

<header>
  {#if $page.error}
    <h1>oh shit!</h1>
  {:else}
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