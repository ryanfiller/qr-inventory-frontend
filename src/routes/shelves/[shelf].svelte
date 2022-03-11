<script>
  import { page } from '$app/stores'
  import supabase from '$lib/supabase'
  import { alphabetize } from '$lib/helpers'
  import breadcrumbs from '$lib/stores/breadcrumbs.js'
  import DataLoader from '$lib/components/data-loader.svelte'
  import Details from '$lib/components/details.svelte'

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

    shelf = shelf[0]

    $breadcrumbs = ([
      {
        link: `/rooms/${shelf.room.name}`,
        text: shelf.room.name
      }
    ])

    return shelf
  }

</script>

<DataLoader
  getDataFucntion={getData}
  let:data={shelf}
>
  {#each alphabetize(shelf.boxes, 'name') as box}
    <Details summary={[`/boxes/${box.name}`, box.name, box.heavy ? 'heavy!': '']}>
      {#if box.description}
        <p>{box.description}</p>
      {/if}
      <pre>{JSON.stringify(box.stuff, null, 2)}</pre>
    </Details>
  {/each}
</DataLoader>
