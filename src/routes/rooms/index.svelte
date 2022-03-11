<script>
  import supabase from '$lib/supabase'
  import { alphabetize, pluralize } from '$lib/helpers'
  import breadcrumbs from '$lib/stores/breadcrumbs.js'
  import Loader from '$lib/components/loader.svelte'
  import Details from '$lib/components/details.svelte'
  import CountsList from '$lib/components/counts-list.svelte'

  async function getData() {
    let { data: rooms, error } = await supabase
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

    if (error) console.error(error)

    $breadcrumbs = ([])
    
    return alphabetize(rooms, 'name')
  }

  function formatRoomData(room) {
    const data = []

    const looseBoxCount = room.boxes.length
    let shelfBoxCount = 0

    data.push({
      count: looseBoxCount,
      text: `loose ${pluralize(looseBoxCount, 'boxes')}`
    })

    const shelvesCount = room.shelves.length
    data.push({
      count: shelvesCount,
      text: pluralize(shelvesCount, 'shelves')
    })

    if (shelvesCount > 0) {
      shelfBoxCount = room.shelves.reduce((acc, shelf) => {
        return acc + shelf.boxes.length
      }, 0)

      data.push({
        count: shelfBoxCount,
        text: 'boxes on shelves'
      })
    }

    const totalBoxes = looseBoxCount + shelfBoxCount
    data.push({
      count: totalBoxes,
      text: `total ${pluralize(totalBoxes, 'boxes')}`
    })

    return data
  }
</script>

<main>
  {#await getData()}
    <Loader />
  {:then rooms}
    {#each rooms as room}
      <Details summary={[`/rooms/${room.name}`, room.name]}>
        {#if room.description}
          <p>{room.description}</p>
        {/if}
        <CountsList counts={formatRoomData(room)} />
      </Details>
    {/each}
  {/await}
</main>