<template>
    <div class="map-container">
        <gmap-map
                class="gmap"
                :center="center"
                :zoom="zoom"
        >
            <gmap-cluster>
                <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center=m.position"
                        :clickable="true"
                        :draggable="true"
                ></gmap-marker>
            </gmap-cluster>

        </gmap-map>
    </div>
</template>

<script>
    import ApiService from "../services/api.service";
    import AuthService from "../services/auth.service";

    export default {
        name: "MapPage",
        data() {
          return {
              center: { lat: 40.7128, lng: -74.0060 },
              markers: [],
              zoom: 8
          }
        },
        mounted() {
            if (!AuthService.getToken()) {
                this.$router.push({name: 'login'});
            }

            ApiService.getEmployeesWithZipCoordinates().then(employees => {
                this.markers = employees.map(e => {
                    return {
                        position: {
                            lat: e.zip_coordinates_by_zip.latitude,
                            lng: e.zip_coordinates_by_zip.longitude
                        },
                    }
                });
            });

            if (this.$route.query.latitude && this.$route.query.longitude) {
                this.center.lat = this.$route.query.latitude;
                this.center.lng = this.$route.query.longitude;
                this.zoom = 15;
            }

        },
    }
</script>

<style lang="scss">
    .map-container {
        width: 100%;
        height: auto;
    }

    .gmap {
        width: 100%;
        height: calc(100vh - 150px);
    }
    .wrapper {
        margin: 0;
    }
</style>
