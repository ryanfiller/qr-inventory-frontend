<script>
  import { page } from '$app/stores'
  import supabase from '$lib/supabase'
  import { alphabetize } from '$lib/helpers'
  import breadcrumbs from '$lib/stores/breadcrumbs.js'
  import Loader from '$lib/components/loader.svelte'
  import Details from '$lib/components/details.svelte'

  async function getData() {
    let { data: box, error } = await supabase
      .from(`boxes`)
      .select(`
        name,
        stuff,
        heavy,
        shelf (
          name,
          room (
            name
          )
        ),
        room (
          name
        )
      `)
      .eq('name', $page.params.box)

    if (error) console.error(error)

    box = box[0]

    if (box.room) {
      $breadcrumbs = ([
        {
          link: `/rooms/${box.room.name}`,
          text: box.room.name
        }
      ])
    }

    if (box.shelf) {
      $breadcrumbs = ([
        {
          link: `/rooms/${box.shelf.room.name}`,
          text: box.shelf.room.name
        },
        {
          link: `/shelf/${box.shelf.name}`,
          text: box.shelf.name
        }
      ])
    }

    return box
  }

</script>

<main>
  {#await getData()}
    <Loader />
  {:then box}
    <pre>{JSON.stringify(box, null, 2)}</pre>
  {/await}
</main>