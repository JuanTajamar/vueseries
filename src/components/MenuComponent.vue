<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div class="container-fluid">
      
      <router-link class="navbar-brand" to="/">SERIES HUB</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/create" class="nav-link">Crear Personaje</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/update" class="nav-link">Modificar Personaje</router-link>
          </li>

          <li class="nav-item dropdown" v-if="series.length > 0">
            
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownSeries" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Series
            </a>
            
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownSeries">
              
              <li v-for="serie in series" :key="serie">
                
                <router-link :to="'/details/' + serie.idSerie" class="dropdown-item">
                  {{ serie.nombre }}
                </router-link>
              </li>

            </ul>
          </li>
          </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Global from './../Global'
import axios from 'axios'

export default {
    name: "MenuComponent",
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