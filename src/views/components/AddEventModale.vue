<template>
    <div class="bloc-modale" v-if="reveal">
        <div class="overlay" v-on:click="toggleModale"></div>
        <div class="modale card">
            <h1>Ajouter un évènement</h1>
            <div class="btn-modale btn btn-danger" v-on:click="toggleModale">X</div>
            <form id="eventForm">
                <div class="form-group">
                    <label>Titre </label>
                    <input type="text" class="form-control" v-model="title" />
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="descriptiontextArea" rows="4" v-model="description"></textarea>
                </div>

                <div class="form-group">
                    <label>Début</label>
                    <input type="date" class="form-control" v-model="startDate"/>
                </div>

                <div class="form-group">
                    <label>Fin</label>
                    <input type="date" class="form-control" v-model="endDate"/>
                </div>

                <div class="form-group">
                    <label>Heure Début</label>
                    <input type="time" class="form-control" v-model="startHour"/>
                </div>

                <div class="form-group">
                    <label>Heure fin</label>
                    <input type="time" class="form-control" v-model="endHour"/>
                </div>
                <br>
                <button type="button" class="btn btn-success" v-on:click="addEvent()">Ajouter</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:"AddEventModale",
    props: ['reveal', 'toggleModale'],
    data: function(){
      return {
        input: {
            title: '',
            description: '',
            startDate:'',
            endDate:'',
        }
      }
    },
    methods:{
    async addEvent(){
      if(this.title != undefined && this.description != undefined && this.startDate != undefined && this.endDate != undefined && this.startHour != undefined && this.endHour != undefined) {
        try {
            const finalStartDate = new Date(this.startDate + 'T' + this.startHour);
            const finalEndDate = new Date(this.endDate + 'T' + this.endHour);

            const res = await axios.post(
              "http://localhost:3000/events",
              {
                name:this.title,
                description:this.description,
                start_date:finalStartDate,
                end_date:finalEndDate,
                organizer_id:"61dfd3fd57e78a7b06f7fb50"
              } 
            );
            localStorage.setItem('jwt-access', res.data.access_token);
            localStorage.setItem('jwt-refresh', res.data.refresh_token);
            alert('ok');
        } catch (error) {
            console.error(error);
        }
      } else{
        alert('champs inccorecte');
      }
    }
  }
}
</script>

<style scoped>
    .bloc-modale{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .overlay{
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .modale{
        background: #f1f1f1;
        color: #333;
        padding: 50px;
        position:fixed;
        top: 4%;
    }

    .btn-modale{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
</style>