<script>
  export let thing
</script>

<style>
  :global(*:not(details)) > summary {
    padding-left: calc(1.5em + var(--size-2));
    margin: 0;
  }
</style>

{#if thing.description}
  <details>
    <summary>
      <a href={`/${thing.name}`}>{thing.name}</a>
    </summary>
    {thing.description}
  </details>
{:else}
  <summary>
    <a href={`/${thing.name}`}>{thing.name}</a>
  </summary>
{/if}
