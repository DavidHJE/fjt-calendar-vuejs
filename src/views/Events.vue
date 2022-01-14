<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <Menu />
            <div class="col py-3">
                <modale v-bind:reveal="reveal" v-bind:toggleModale="toggleModale"> </modale>
                <div v-on:click="toggleModale" class="btn btn-success">Ouverture modale</div>
                <TableEvents />
            </div>
        </div>
    </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import TableEvents from "./components/TableEvents.vue";
import AddEventModale from './components/AddEventModale.vue';

export default {
  data(){
      return {
        reveal: false
      }
    },
  components: {
    Menu,
    TableEvents,
    'modale': AddEventModale,
  },
  methods:{
    toggleModale: function(){
      this.reveal = !this.reveal
    }
  }
}
</script>

<style></style>
