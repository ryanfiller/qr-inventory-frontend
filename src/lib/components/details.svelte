<script>
  export let thing
</script>

<style>
  details {
    margin: 0 var(--size-3);
  }
  :global(*:not(details)) > summary {
    padding-left: calc(1.5em + var(--size-2));
    margin: 0;
  }

  :global(details) + details,
  :global(details) + summary {
    margin: 0 var(--size-3);
    margin-top: var(--size-2)
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
