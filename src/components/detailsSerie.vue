<template>
  <div class="bg-dark text-light py-5 details-page">
    <div class="container">
      <div class="row justify-content-center">

        <div v-if="!serie" class="text-center">
          <h2 class="display-4">Cargando...</h2>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else class="col-lg-10 col-md-12">
          
          <div class="card bg-secondary text-light mb-3 shadow-lg border-0">
            <div class="row g-0">
              
              <div class="col-md-4">
                <img :src="serie.imagen" class="img-fluid rounded-start series-poster" :alt="serie.nombre">
              </div>

              <div class="col-md-8">
                <div class="card-body p-4 p-md-5">
                  
                  <h1 class="card-title display-5 fw-bold">{{ serie.nombre }}</h1>
                  <ul class="list-group list-group-flush bg-transparent my-4">
                    <li class="list-group-item bg-transparent text-light fs-5">
                      <strong>Puntuación:</strong> {{ serie.puntuacion }}
                    </li>
                    <li class="list-group-item bg-transparent text-light fs-5">
                      <strong>Año:</strong> {{ serie.anyo }}
                    </li>
                  </ul>

                  <div class="mt-4">
                    <router-link :to="'/personajes/' + serie.idSerie" class="btn btn-primary btn-lg shadow">
                      Ver Personajes
                    </router-link>
                    <router-link to="/" class="btn btn-outline-light btn-lg ms-2">
                      Volver al Catálogo
                    </router-link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Global from './../Global'
import axios from 'axios'

export default {
    name: "DetailsSerie",
    data() {
      return {
        serie: null 
      }
    },
    methods: {
      cargarSerie(id) {
        this.serie = null; 
        
        let request = "api/series/" + id;
        let url = Global.urlSeries + request;

        axios.get(url).then(response => {
          this.serie = response.data;
        });
      }
    },

    mounted() {
      const idSerie = this.$route.params.id;
      this.cargarSerie(idSerie);
    },
    watch: {
      '$route.params.id'(newId) {
        this.cargarSerie(newId);
      }
    }
}
</script>

<style scoped>
.details-page {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
}

.series-poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}
</style>