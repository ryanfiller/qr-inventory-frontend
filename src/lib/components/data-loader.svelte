<script>
  export let getDataFucntion = () => null
  import LoadingSpinner from '$lib/components/loading-spinner.svelte'
</script>

{#await getDataFucntion()}
  <LoadingSpinner />
{:then data}
  <slot data={data}/>
{/await}