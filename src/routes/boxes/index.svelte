<script>
  import supabase from '$lib/supabase'
  import { alphabetize } from '$lib/helpers'
  import DataLoader from '$lib/components/data-loader.svelte'
  import Details from '$lib/components/details.svelte'

  async function getData() {
    let { data: boxes, error } = await supabase
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
    if (error) console.error(error)

    return alphabetize(boxes, 'name')
  }

  function buildBoxLocation(box) {
    if (box.room) {
      return box.room.name
    }

    if (box.shelf) {
      return `${box.shelf.name} / ${box.shelf.room.name}`
    }
    // let html = `<a href={${summary[0]}}>${summary[1]}</a>`
    // if (summary.length === 3) {
    //   html = `${html} <span>${summary[2]}</span>`
    // }
    // return box
  }
  
</script>

<DataLoader
  getDataFucntion={getData}
  let:data={boxes}
>
  {#each boxes as box}
    <Details summary={[`/boxes/${box.name}`, box.name, buildBoxLocation(box)]}>
      {#if box.description}
        <p>{box.description}</p>
      {/if}
      <pre>{JSON.stringify(box.stuff, null, 2)}</pre>
    </Details>
  {/each}
</DataLoader>
