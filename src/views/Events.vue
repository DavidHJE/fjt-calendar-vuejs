<template>
  <Menu/>

  <div class="container">
    <modale 
      v-bind:reveal="reveal" 
      v-bind:toggleModale="toggleModale">
    </modale>
    <div v-on:click="toggleModale" class="btn btn-success">Ouverture modale</div>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import AddEventModale from './components/AddEventModale.vue';

export default {
  data(){
      return {
        reveal: false
      }
    },
  components: {
    Menu,
    'modale': AddEventModale,
  },
  methods:{
    toggleModale: function(){
      this.reveal = !this.reveal
    }
  }
}

</script>


<style>

</style>