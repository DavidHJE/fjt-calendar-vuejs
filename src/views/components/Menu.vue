<template>
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div
            class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        >
            <router-link
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                to="/"
            >
                <template v-if="loading"></template>
                <template v-else>
                    <img
                        src="../../images/avatar1.png"
                        alt="hugenerd"
                        width="50"
                        height="50"
                        class="rounded-circle"
                    />
                    <span class="d-none d-sm-inline mx-1">{{ user.first_name }} {{ user.last_name }}</span>
                    
                </template>
            </router-link>

            <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
            >
                <li class="nav-item">
                    <router-link class="nav-link align-middle px-0" to="/events">
                        <span class="ms-1 d-none d-sm-inline">Evenements</span>
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link align-middle px-0" to="/">
                        <span class="ms-1 d-none d-sm-inline">Propositions</span>
                    </router-link>
                </li>
            </ul>
            <hr />

            <div>
                <router-link class="nav-link text-white" to="/">Déconnexion</router-link>
            </div>
            <!--                 
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
const jwt = require("jsonwebtoken");

export default {
    name: "Menu",
    async asyncData() {
        let token = localStorage.getItem("jwt-access");
        let tokenDecoded = jwt.decode(token);
        let userId = tokenDecoded.sub;
        let user = await axios.get("http://localhost:3000/users/" + userId, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return { last_name: user.last_name, first_name: user.first_name };
    },
    data() {
        return {
            loading: false,
            user: null,
        };
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.loading = true;
            let token = localStorage.getItem("jwt-access");
            let tokenDecoded = jwt.decode(token);
            let userId = tokenDecoded.sub;

            axios
                .get("http://localhost:3000/users/" + userId, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    this.loading = false;
                    this.user = response.data;
                })
                .catch((error) => {
                    this.loading = false;
                    console.log(error);
                });
        },
    },
};
</script>

<style>
#menu-sidebar {
    width: 200px;
    min-height: 100%;
}
</style>
