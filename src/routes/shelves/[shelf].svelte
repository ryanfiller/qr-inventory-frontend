<script>
  import { page } from '$app/stores'
  import supabase from '$lib/supabase'
  import { alphabetize } from '$lib/helpers'
  import breadcrumbs from '$lib/stores/breadcrumbs.js'
  import Loader from '$lib/components/loader.svelte'
  import Details from '$lib/components/details.svelte'

  console.log('page', $page.params)

  async function getData() {
    let { data: shelf, error } = await supabase
      .from(`shelves`)
      .select(`
        name,
        description,
        room (
          name
        ),
        boxes (
          name,
          stuff,
          heavy
        )`)
      .eq('name', $page.params.shelf)
    if (error) console.error(error)

    $breadcrumbs = ([
      {
        link: `/rooms/${shelf[0].room.name}`,
        text: shelf[0].room.name
      }
    ])

    return shelf[0]
    // return alphabetize(shelves, 'name')
  }

</script>

<main>
  {#await getData()}
    <Loader />
  {:then shelf}
    <!-- {JSON.stringify(shelf)} -->
    {#each shelf.boxes as box}
      <Details summary={[`/boxes/${box.name}`, box.name, box.heavy ? 'heavy!': '']}>
        {#if box.description}
          <p>{box.description}</p>
        {/if}
        <pre>{JSON.stringify(box.stuff, null, 2)}</pre>
      </Details>
    {/each}
  {/await}
</main>