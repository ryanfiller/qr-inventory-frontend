<script>
  import breadcrumbs from '$lib/stores/breadcrumbs.js'
</script>

<style>
  ol {
    list-style: none;
    padding: 0;
    display: flex;
  }

  li::after {
    content: '>';
  }
</style>

<ol>
  {#each $breadcrumbs as breadcrumb}
    <li>
      <a href={breadcrumb.link}>
        {breadcrumb.text}
      </a>
    </li>
  {/each}
</ol>