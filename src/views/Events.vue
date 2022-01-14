<template>
<div class="container-fluid"> 
    <div class="row flex-nowrap"> 
      <Menu/> 
      <div class="col py-3">
        <TableEvents/>
      </div>
    </div>

    </div>
  
  <div class="container">
   
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import TableEvents from "./components/TableEvents.vue";

export default {
  components: {
    Menu,
    TableEvents
  }
}

</script>


<style>

</style>