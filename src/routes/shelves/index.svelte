<script>
  import supabase from '$lib/supabase'
  import { alphabetize, pluralize } from '$lib/helpers'
  import Loader from '$lib/components/loader.svelte'
  import Details from '$lib/components/details.svelte'
  import CountsList from '$lib/components/counts-list.svelte'

  async function getData() {
    // TODO - it would be great if these were grouped by room
    let { data: shelves, error } = await supabase
      .from(`shelves`)
      .select(`
        name,
        description,
        boxes (
          name
        )`)
    if (error) console.error(error)

    return alphabetize(shelves, 'name')
  }

  function formatShelfData(shelf) {
    const data = []

    const totalBoxes = shelf.boxes.length
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
  {:then shelves}
    {#each shelves as shelf}
      <Details summary={[`/shelves/${shelf.name}`, shelf.name]}>
        {#if shelf.description}
          <p>{shelf.description}</p>
        {/if}
        <CountsList counts={formatShelfData(shelf)} />
      </Details>
    {/each}
  {/await}
</main>