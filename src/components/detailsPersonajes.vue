<template>
  <div class="bg-dark text-light py-5 character-page">
    <div class="container">
      
      <h1 class="display-4 fw-bold text-center mb-5">Personajes de la Serie</h1>

      <div class="row justify-content-center">
        <div class="col-lg-10 col-md-12">

          <div class="table-responsive">
            
            <table class="table table-dark table-striped table-hover align-middle">
              
              <thead class="table-light"> <tr>
                  <th scope="col" style="width: 10%;">Personaje</th>
                  <th scope="col">Nombre</th>
                </tr>
              </thead>
              
              <tbody>
                <tr v-for="personaje in personajes" :key="personaje.idPersonaje">
                  
                  <td>
                    <img :src="personaje.imagen" :alt="personaje.nombre" class="character-avatar rounded-circle shadow">
                  </td>
                  
                  <td class="fw-bold fs-5">{{ personaje.nombre }}</td>

                </tr>

                <tr v-if="personajes.length === 0">
                  <td colspan="2" class="text-center fst-italic p-4">
                    Cargando personajes o no hay datos para esta serie...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Global from '@/Global'
import axios from 'axios'
    export default {
        name: "DetailsPersonajes",
        data() {
            return {
                personajes: []
            }
        },methods:{
            cargarPersonajes(id) {
                let request = "api/series/personajesserie/" + id
                let url = Global.urlSeries + request
                axios.get(url).then(response => {
                    this.personajes = response.data
                })
            }
        },mounted() {
            const idPersonajes = this.$route.params.id
            this.cargarPersonajes(idPersonajes)
        }, watch: {
            '$route.params.id'(newId){
                this.cargarPersonajes(newId)
            }
        }
    }
</script>

<style scoped>
.character-page {
  min-height: calc(100vh - 70px);
}


.character-avatar {
  width: 70px;
  height: 70px;
  object-fit: cover;
  background-color: #333; 
}

.table > :not(caption) > * > * {
  padding: 1.25rem 1rem;
}

.table-light th {
  color: #333;
}
</style>