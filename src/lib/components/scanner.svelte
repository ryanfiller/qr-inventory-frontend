<script>
  import { onMount } from 'svelte'
  import Scanner from 'modern-svelte-qr-scanner'

  async function registerCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment'}, audio: false })
    // navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment'}, audio: false })
    // .then(async camera => {
    //   // have to do this here, after permission has been accepted
    //   const devices = await navigator.mediaDevices.enumerateDevices()
    //   const backCamera = devices.filter(device => device.label === 'Back Camera')[0]
    //   const id = backCamera ? backCamera.deviceId : camera.id
    //   // camera = backCamera ? backCamera : camera
    //   log = JSON.stringify(camera)
    //   navigator.mediaDevices.getUserMedia({
    //     video: {
    //       deviceId: id,
    //       facingMode: 'environment'
    //     },
    //     audio: false
    //   })
    // }).catch(error => {
    //   console.log('error getting camera', error)
    // })
  }

  onMount(async () => {
    await registerCamera()

    // fix a weird ios thing
    var video = document.getElementById('cam-preview')
    video.setAttribute('playsinline', 'true')
  })

  let mediaErrorMessage

  let scanned
  function onQRScan(event) {
    console.log(event)
    scanned = event.detail.qrContent
    alert(scanned)
  }
  
</script>

<style global>
  .video-container {
    position: fixed !important;
    inset: 0;
    /* for some reason this won't reach the bottom of the screen with just 100 */
    height: 115vh !important;
    width: 100vw !important;
    z-index: -1;
  }

  video {
    height: 100% !important;
    width: 100% !important;
    object-fit: cover !important;
    padding: 0 !important;
    margin: 0 !important;
    /* have to turn off translateX(-50%) from the package here */
    transform: none !important;
  }

  .video-container button {
    display: none;
  }
</style>

scanned: {JSON.stringify(scanned, null, 2)}

<Scanner
  on:scan={onQRScan}
  bind:mediaErrorMessage
  previewWidth_px={500}
  previewHeight_px={500}
>
  <!-- <div slot="loading" class="loading">
      <span>Loading Animation, but text</span>
  </div> -->
  <!-- <div slot="failedToInitialize" class="failed-to-initialize">
      Failed to initialize camera.<br>
      Error: {mediaErrorMessage}
  </div> -->
</Scanner>