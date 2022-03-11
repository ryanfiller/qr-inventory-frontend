<script>
  import { page } from '$app/stores'
  import supabase from '$lib/supabase'
  import { alphabetize } from '$lib/helpers'
  import breadcrumbs from '$lib/stores/breadcrumbs.js'
  import DataLoader from '$lib/components/data-loader.svelte'
  import Details from '$lib/components/details.svelte'

  console.log($page.params)

  async function getData() {
    let { data: room, error } = await supabase
      .from(`rooms`)
      .select(`
        name,
        description,
        boxes (
          name
        ),
        shelves!room (
          name,
          boxes (
            name
          )
        )
      `)
      .eq('name', $page.params.room)

    if (error) console.error(error)

    room = room[0]

    $breadcrumbs = ([])

    return room
  }

</script>

<DataLoader
  getDataFucntion={getData}
  let:data={room}
>
  <h2>lose boxes:</h2>
  {#each alphabetize(room.boxes, 'name') as box}
    <Details summary={[`/boxes/${box.name}`, box.name, box.heavy ? 'heavy!': '']}>
      {#if box.description}
        <p>{box.description}</p>
      {/if}
      <pre>{JSON.stringify(box, null, 2)}</pre>
    </Details>
  {/each}

  <h2>shelves:</h2>
  {#each alphabetize(room.shelves, 'name') as shelf}
    <Details summary={[`/shelves/${shelf.name}`, shelf.name]}>
      {#if shelf.description}
        <p>{shelf.description}</p>
      {/if}
      <pre>{JSON.stringify(shelf.stuff, null, 2)}</pre>
    </Details>
  {/each}
</DataLoader>
