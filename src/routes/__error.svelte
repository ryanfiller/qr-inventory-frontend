<script>
  import { page } from '$app/stores'
import Box from './boxes/[box].svelte';
</script>

<style>
  pre {
    white-space: pre-wrap;
  }
</style>

<pre>{JSON.stringify({ name: $page.error.name, message: $page.error.message }, null, 2)}</pre>

<details>
  <summary>
    stack
  </summary>
  <pre>{JSON.stringify($page.error.stack, null, 2)}</pre>
</details>

