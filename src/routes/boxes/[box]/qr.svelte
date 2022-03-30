<script>
  import { page } from '$app/stores'
  import supabase from '$lib/supabase'
  import QR from 'svelte-qr'
  import breadcrumbs from '$lib/stores/breadcrumbs.js'
  import DataLoader from '$lib/components/data-loader.svelte'

  async function getData() {
    let { data: box, error } = await supabase
      .from(`boxes`)
      .select(`
        uuid,
        name,
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

<style>
  figcaption {
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: space-between;
    max-inline-size: none;
    gap: 1rem;
    font-size: .75rem;
  }

  :global(svg) {
    width: 100%;
    height: auto;
    fill: currentColor;
  }

  @media print {
    :global(body > *:not(main)) {
      display: none;
    }

    :global(figure) {
      display: block;
      margin: 0 auto;
      width: 3in;
      height: 3in;
      padding: 0.25in;
      border: 1px solid currentColor;
    }
  }
</style>

<DataLoader
  getDataFucntion={getData}
  let:data={box}
>
  <figure>
    <QR text={box.uuid} level='H' />
    <figcaption>
      <span>{box.heavy ? `${box.name} (heavy!)` : box.name}</span>
      <!-- <span>{box.uuid}</span> -->
    </figcaption>
  </figure>
  
</DataLoader>