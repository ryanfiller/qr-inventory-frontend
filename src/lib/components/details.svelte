<script>
  export let summary = []

  function buildSummaryHtml(summary) {
    let html = `<a href={${summary[0]}}>${summary[1]}</a>`
    if (summary.length === 3) {
      html = `${html} <span>${summary[2]}</span>`
    }
    return html
  }
</script>

<style>
  details {
    margin: 0 var(--size-3);
  }

  summary :global(span) {
    float: right;
  }

  :global(p) {
    font-style: italic;
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
      {@html buildSummaryHtml(summary)}
    </summary>
    <slot />
  </details>
{:else}
  <summary>
    {@html buildSummaryHtml(summary)}
  </summary>
{/if}
