<script>
  import supabase from '$lib/supabase'
  import { alphabetize } from '$lib/helpers'
  import Loader from '$lib/components/loader.svelte'
  import Details from '$lib/components/details.svelte'

  async function getData() {
    let { data: rooms, error } = await supabase
      .from('rooms')
      .select('name, description')
    return alphabetize(rooms, 'name')
  }  
</script>

<main>
  {#await getData()}
    <Loader />
  {:then rooms}
    {#each rooms as room}
      <Details thing={room} />
    {/each}
  {/await}
</main>