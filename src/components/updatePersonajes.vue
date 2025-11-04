<template>
  <div class="bg-dark text-light py-5 form-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-md-10">
          
          <div class="bg-secondary p-4 p-md-5 rounded-3 shadow-lg">
            
            <h1 class="display-4 fw-bold text-center mb-4">Mover Personaje</h1>
            <p class="lead text-center mb-4">
              Selecciona un personaje y la serie a la que quieres moverlo.
            </p>

            <form v-on:submit.prevent="modificarPersonaje()">
              
              <div class="mb-3">
                <label for="selectPersonaje" class="form-label fs-5">Selecciona un personaje:</label>
                <select class="form-select form-select-lg" id="selectPersonaje" 
                        v-model="selectedPersonajeId">
                  <option :value="null" disabled>Elige un personaje...</option>
                  <option v-for="personaje in personajes" :key="personaje.idPersonaje" :value="personaje.idPersonaje">
                    {{ personaje.nombre }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="selectSerie" class="form-label fs-5">Selecciona una serie:</label>
                <select class="form-select form-select-lg" id="selectSerie"
                        v-model="selectedSerieId">
                  <option :value="null" disabled>Elige la nueva serie...</option>
                  <option v-for="serie in series" :key="serie.idSerie" :value="serie.idSerie">
                    {{ serie.nombre }}
                  </option>
                </select>
              </div>

              <div class="d-grid mt-4">
                <button class="btn btn-danger btn-lg shadow">Mover Personaje</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceSeries from './../services/ServiceSeries';
import Global from './../Global';
import axios from 'axios';
import Swal from 'sweetalert2';

const service = new ServiceSeries();

export default {
    name: "UpdatePersonajes",
    data() {
        return {
            series: [],
            personajes: [],
            selectedPersonajeId: null,
            selectedSerieId: null,
        }
    },
    methods: {
        async modificarPersonaje() {
            if (!this.selectedPersonajeId || !this.selectedSerieId) {
                Swal.fire({
                    title: 'Error', text: 'Debes seleccionar un personaje y una serie.',
                    icon: 'error', background: '#495057', color: '#fff'
                });
                return;
            }

            const result = await Swal.fire({
                title: '¿Confirmar movimiento?',
                text: `¿Estás seguro de que quieres mover el personaje a la nueva serie?`,
                icon: 'question', showCancelButton: true,
                confirmButtonText: 'Sí, mover', cancelButtonText: 'Cancelar',
                background: '#495057', color: '#fff',
                confirmButtonColor: '#dc3545', cancelButtonColor: '#6c757d'
            });

            if (result.isConfirmed) {
                try {
                    const personajeAMover = await service.findPersonaje(this.selectedPersonajeId);

                    personajeAMover.idSerie = this.selectedSerieId;

                    await service.updatePersonajes(personajeAMover); 

                    await Swal.fire({
                        title: '¡Éxito!',
                        text: 'El personaje se ha movido de serie correctamente.',
                        icon: 'success', background: '#495057', color: '#fff',
                        confirmButtonColor: '#dc3545'
                    });

                    this.$router.push('/personajes/' + this.selectedSerieId);

                } catch (error) {
                    Swal.fire({
                        title: 'Error en la API', text: 'No se pudo completar la operación.',
                        icon: 'error', background: '#495057', color: '#fff'
                    });
                }
            }
        }
    },
    mounted() {
        let urlSeries = Global.urlSeries + "api/series";
        fetch(urlSeries)
            .then(response => {
                if (!response.ok) throw new Error("Error cargando series con fetch");
                return response.json();
            })
            .then(data => {
                this.series = data;
            })
            .catch(error => console.error("Error Fetch (Series):", error));

        let urlPersonajes = Global.urlSeries + "api/personajes";
        axios.get(urlPersonajes)
            .then(response => {
                this.personajes = response.data;
            })
            .catch(error => console.error("Error Axios (Personajes):", error));
    }
}
</script>

<style scoped>
  .form-page {
    min-height: calc(100vh - 70px);
    display: flex;
    align-items: center;
  }
  .form-select {
    background-color: #495057;
    color: #fff;
    border: 1px solid #6c757d;
  }
  .form-select:focus {
    background-color: #495057;
    color: #fff;
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
  }
</style>