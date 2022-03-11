<script>
  export let counts = []
</script>

<ul>
  {#each counts as count}
    <li>
      <strong>{count.count}</strong> {count.text}
    </li>
  {/each}
</ul>