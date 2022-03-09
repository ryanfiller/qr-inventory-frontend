<h1>shelves</h1>

<script>
  import supabase from '$lib/supabase'

  async function getData() {
    let { data: boxes, error } = await supabase
      .from('shelves')
      .select('*')
    return boxes
  }
  
</script>

{#await getData() then data}
<pre>
{JSON.stringify(data, null, 2)}
</pre>
{/await}
