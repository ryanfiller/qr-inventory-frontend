<script>
  export let summary = []
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

{#if $$slots.default}
  <details>
    <summary>
      <a href={`${summary[0]}`}>{summary[1]}</a>
    </summary>
    <slot />
  </details>
{:else}
  <summary>
    <a href={`${summary[0]}`}>{summary[1]}</a>
  </summary>
{/if}
