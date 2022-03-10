<script>
  import { page } from '$app/stores'
  import '../app.css'

  console.log($page.url.pathname)
  // console.log($page.params)

</script>

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

{#if Object.values($page.params).length}
  <h1>{Object.values($page.params)}</h1>
{:else}
  <h1>{$page.url.pathname.split('/').filter(Boolean)}</h1>
{/if}

<slot />

<footer>
  © Oh, I'm sorry I thought this was America.
</footer>