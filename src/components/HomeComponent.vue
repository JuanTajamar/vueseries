<template>
  <div class="bg-dark text-light py-5">
    <div class="container">
      
      <h2 class="display-4 fw-bold text-center mb-4">Catálogo</h2>
      
      <div class="row">
        
        <div v-for="serie in series" :key="serie.id" class="col-lg-3 col-md-4 col-6 mb-4">
          
          <div class="card bg-transparent border-0 text-light series-card">
            
            <img :src="serie.imagen" class="card-img-top rounded shadow" :alt="serie.nombre">
            
            <div class="card-body px-0 py-2">
              <h5 class="card-title text-center fw-bold">{{ serie.nombre }}</h5>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// El script que proporcionaste
import Global from './../Global'
import axios from 'axios'

    export default {
        name: "HomeComponent",
        data() {
            return {
                series: []
            }
        }, 
        mounted() {
            let request = "api/series"
            let url = Global.urlSeries + request
            axios.get(url).then(response => {
                this.series = response.data
            })
        }
    }
</script>

<style scoped>
.series-card {
  transition: transform 0.2s ease-in-out;
}

.series-card:hover {
  transform: scale(1.05);
  cursor: pointer;
  z-index: 10;
}

.series-card .card-img-top {
  aspect-ratio: 2 / 3;
  object-fit: cover;
}
</style>