/* eslint-disable */

<template>
  <div>
    <h1>{{ header }}</h1>
    <h3>{{ caption }}</h3>
    <ul>
      <li v-for="route in routes" v-on:click="loadRoute(route.stravaId)">
        {{ route.worldLabel }} - {{ route.label }}
    </li>
    </ul>
    <div v-if="selectedRoute">
      Tracking:
      <button v-on:click="switchTracking()">{{ socket ? 'Stop' : 'Start' }}</button>
      <table>
        <thead>
          <th>Distance</th>
          <th>Altitude</th>
          <th>Coordinates</th>
        </thead>
        <tbody>
          <tr v-for="(milestone, index) in selectedRoute" v-bind:class="{ 'current-position': index === currentIndex }">
            <td>{{ milestone.distance }}</td>
            <td>{{ milestone.altitude }}</td>
            <td>{{ milestone.latlng[0] }} : {{ milestone.latlng[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  name: "AthleteTracker",
  data: {
    header: "Hello Zwifter!",
    caption: "Here's list of currently supported routes:",
    routes: [],
    selectedRoute: null,
    socket: null,
    currentIndex: -1
  },
  methods: {
    loadRoute(id) {
      fetch(`/routes/${id}`)
        .then(response => response.json())
        .then(route => (this.selectedRoute = route))
        .then(() => this.socket && this.stopTracking());
    },
    switchTracking() {
      if (this.socket) {
        this.stopTracking();
      } else {
        this.startTracking();
      }
    },
    startTracking() {
      const socket = io();

      socket.on("riderStatus", position => {
        console.log(`new position ${JSON.stringify(position, null, 3)}`);
        this.currentIndex = findPosition(position.lat, position.lng);
      });

      socket.on("riderDisconnected", error => {
        console.log("riderDisconnected");
      });

      this.socket = socket;
    },
    stopTracking() {
      this.socket.close();
      this.socket = null;
      this.currentIndex = -1;
    }
  },
  created() {
    loadRoutes();
  }
};

function findPosition(eLat, eLng, lastIndex) {
  function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  let index = -1;
  eLat = precisionRound(eLat, 4);
  eLng = precisionRound(eLng, 4);

  index = app.selectedRoute.findIndex(({ latlng }) => {
    let [lat, lng] = latlng;

    lat = precisionRound(lat, 4);
    lng = precisionRound(lng, 4);

    return eLat === lat && eLng === lng;
  });

  return index;
}

async function loadRoutes() {
  const response = await fetch("/routes");
  const routes = await response.json();

  app.routes = routes;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
