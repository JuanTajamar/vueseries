<template>
  <div class="bg-dark text-light py-5 form-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-9">
          
          <div class="bg-secondary p-4 p-md-5 rounded-3 shadow-lg">
            
            <h1 class="display-4 fw-bold text-center mb-4">Crear Personaje</h1>

            <form v-on:submit.prevent="createPersonaje()">
              
              <div class="mb-3">
                <label for="idPersonajeInput" class="form-label fs-5">ID Personaje</label>
                <input type="number" class="form-control" id="idPersonajeInput" v-model.number="personaje.idPersonaje">
              </div>

              <div class="mb-3">
                <label for="nombreInput" class="form-label fs-5">Nombre</label>
                <input type="text" class="form-control" id="nombreInput" v-model="personaje.nombre">
              </div>

              <div class="mb-3">
                <label for="imagenInput" class="form-label fs-5">URL de la Imagen</label>
                <input type="text" class="form-control" id="imagenInput" v-model="personaje.imagen">
              </div>

              <div class="mb-3">
                <label for="idSerieInput" class="form-label fs-5">ID Serie</label>
                <input type="number" class="form-control" id="idSerieInput" v-model.number="personaje.idSerie">
              </div>

              <div class="d-grid mt-4">
                <button class="btn btn-danger btn-lg shadow">Crear</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceSeries from './../services/ServiceSeries'
import Swal from 'sweetalert2' 

const service = new ServiceSeries()

    export default {
        name: "CreatePersonaje",
        data(){
          return {
            personaje: {
              idPersonaje: 0,
              nombre: "",
              imagen: "",
              idSerie: 0
            }
          }
        }, 
        methods: {
          async createPersonaje(){ 
            const result = await Swal.fire({
              title: '¿Estás seguro?',
              text: "¿Deseas crear este personaje?",
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Continuar', 
              cancelButtonText: 'Volver',

              background: '#495057',
              color: '#fff',
              confirmButtonColor: '#dc3545',
              cancelButtonColor: '#6c757d'
            });

            if (result.isConfirmed) {
              
              service.createPersonaje(this.personaje).then(() => {
                Swal.fire(
                  '¡Creado!',
                  'El personaje se ha creado correctamente.',
                  'success'
                );

                this.$router.push("/personajes/" + this.personaje.idSerie);
              
              }).catch(error => {
                Swal.fire(
                  'Error',
                  'No se pudo crear el personaje.',
                  'error'
                );
                console.error(error);
              });
            }
          }
        }
    }
</script>

<style scoped>

.form-page {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center; 
}

.form-control {
  background-color: #495057;
  color: #fff; 
  border: 1px solid #6c757d; 
}

.form-control:focus {
  background-color: #495057;
  color: #fff;
  border-color: #dc3545; 
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25); 
}

.form-control::placeholder {
  color: #adb5bd;
}
</style>