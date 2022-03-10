<script>
  import supabase from '$lib/supabase'
  import Loader from '$lib/components/loader.svelte'

  async function getData() {
    let { data: rooms, error } = await supabase
      .from('rooms')
      .select('name, description')
    return rooms
  }  
</script>

<main>
  {#await getData()}
    <Loader />
  {:then rooms}
    {#each rooms as room}
      {#if room.description}
        <details>
          <summary>
            <a href={`/${room.name}`}>{room.name}</a>
          </summary>
          {room.description}
        </details>
      {:else}
        <summary>
          <a href={`/${room.name}`}>{room.name}</a>
        </summary>
      {/if}
    {/each}
  {/await}
</main>