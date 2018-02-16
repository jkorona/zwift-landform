<template>
  <div>
    <h1>{{ header }}</h1>
    <h3>{{ caption }}</h3>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io()

socket.on('riderStatus', (position) => {
  console.log(`new position ${JSON.stringify(position, null, 3)}`)
})

socket.on('riderDisconnected', (error) => {
  console.log('riderDisconnected: ', error)
})

export default {
  name: 'AthleteTracker',
  data: () => ({
    header: 'Hello Zwifter!',
    caption: 'Here\'s list of currently supported routes:',
    routes: [],
    selectedRoute: null,
    socket: null,
    currentIndex: -1
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
