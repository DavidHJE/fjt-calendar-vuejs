<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Titre</th>
                <th scope="col">Date de début</th>
                <th scope="col">Date de fin</th>
                <th scope="col">Organisateur</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="loading">
                En cours de chargement ...
            </template>
            <template v-else>
               
                <tr v-for="event in events" :key="event._id">
                    <td>{{ event.name }}</td>
                    <td>{{ (new Date(event.start_date)) }}</td>
                    <td>{{ event.end_date }}</td>
                    <td>{{ event.organizer_id }}</td>
                    <td>action</td>
                </tr>
                
            </template>
        </tbody>
    </table>
</template>

<script>
import axios from "axios";

export default {
    name: "TableEvents",
    data() {
        return {
            loading: false,
            events: [],
        };
    },
    created() {
        this.getEvents();
    },
    methods: {
        getEvents() {
            console.log("ok");
            this.loading = true;
            let token = localStorage.getItem("jwt-access");

            axios
                .get("http://localhost:3000/events", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    this.loading = false;
                    console.log(response.data);
                    this.events = response.data
                })
                .catch((error) => {
                    this.loading = false;
                    console.log(error);
                });
        },
    },
};
</script>
