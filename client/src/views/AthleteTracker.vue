<template>
  <container title="Tracker">
    <div class="athlete-tracker">
      <h1>{{ header }}</h1>
      <h3>{{ caption }}</h3>
      <ul>
        <li
          v-for="route in routes"
          :key="route.label"
          @click="loadRoute(route.stravaId)">
          {{ route.worldLabel }} - {{ route.label }}
        </li>
      </ul>
      <div v-if="selectedRoute">
        Tracking:
        <button @click="switchTracking()">{{ socket ? 'Stop' : 'Start' }}</button>
        <table>
          <thead>
            <th>Distance</th>
            <th>Altitude</th>
            <th>Coordinates</th>
          </thead>
          <tbody>
            <tr
              v-for="(milestone, index) in selectedRoute"
              :key="index"
              :class="{ 'current-position': index === currentIndex }">
              <td>{{ milestone.distance }}</td>
              <td>{{ milestone.altitude }}</td>
              <td>{{ milestone.latlng[0] }} : {{ milestone.latlng[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </container>
</template>

<script>
import io from 'socket.io-client';

import Container from '@/components/Container.vue';

function findPosition(eLat, eLng, route) {

  function precisionRound(number, precision) {
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
  }

  function matches(actual, expected, accurracy = 0.0001) {
    return Math.abs(expected - actual) <= accurracy;
  }

  let index = -1;
  const gLat = precisionRound(eLat, 4);
  const gLng = precisionRound(eLng, 4);

  index = route.findIndex(({ latlng }) => {
    let [lat, lng] = latlng;

    lat = precisionRound(lat, 4);
    lng = precisionRound(lng, 4);

    return matches(lat, gLat) && matches(lng, gLng);
  });

  return index;
}

const AthleteTracker = {
  name: 'AthleteTracker',
  components: { Container },
  data: () => ({
    header: 'Hello Zwifter!',
    caption: 'Here\'s list of currently supported routes:',
    routes: [],
    selectedRoute: null,
    socket: null,
    currentIndex: -1
  }),
  methods: {
    loadRoute(id) {
      fetch(`/api/routes/${id}`)
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
      const route = this.selectedRoute;

      socket.on('riderStatus', (position) => {
        this.currentIndex = findPosition(position.lat, position.lng, route);
      });

      socket.on('riderDisconnected', (error) => {
        console.log('riderDisconnected', error);
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
    fetch('/api/routes')
      .then(response => response.json())
      .then(routes => (this.routes = routes));
  }
};

export default AthleteTracker;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.athlete-tracker {
}

.current-position {
  font-weight: bold;
  font-size: 18px;
}
</style>
