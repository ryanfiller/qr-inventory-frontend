<script>
  import supabase from '$lib/supabase'
  import {readable, get} from 'svelte/store'

  // import Post from '$lib/Post.svelte'
  // async function addPost(e) {
  //   const formData = new FormData(e.target)
  //   const {data, error} = await supabase
  //     .from('posts')
  //     .insert({
  //       title: formData.get('title'),
  //       content: formData.get('content')
  //     })
  // }

  // const data = readable(null, (set) => {
  //   supabase
  //     .from('boxes')
  //     .select('*')
  //     .then(({error, data}) => set(data))
  //   // add subscription to supabase logic
  //   const subscription = supabase
  //     .from('posts')
  //     .on('INSERT', (payload) => {
  //       // payload.evenType
  //       // payload.new
  //       // payload.old
  //       set([...get(data), payload.new]) 
  //     })
  //     .subscribe()
  //   return () => supabase.removeSubscription(subscription)
  // })
  
</script>
