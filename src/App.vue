<template>
  <MenuComponent/>
  
  <main class="main-content">
    <router-view></router-view>
  </main>

</template>

<script>
import MenuComponent from './components/MenuComponent.vue'

export default {
  name: 'App',
  components: {
    MenuComponent
  }
}
</script>

<style>
/* 2. Modifica tu estilo global */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px;  <-- ELIMINA ESTA LÍNEA */
}

/* 3. Añade esta nueva regla */
.main-content {
  /* Esto empuja tu contenido hacia abajo 
     para que no quede oculto por el navbar.
     Ajusta este valor si la altura de tu navbar cambia. */
  padding-top: 70px; 
}
</style>
