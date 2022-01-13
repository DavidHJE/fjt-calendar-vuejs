<template>
  <div id="menu-sidebar" class="d-flex flex-column flex-shrink-0 p-3 bg-light">
    <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
      <template v-if="loading"> </template>
      <template v-else>
        <span class="fs-4">{{ user.first_name }} {{ user.last_name }}</span>
      </template>
    </div>

    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link"></a>
        <router-link class="nav-link" to="/events">Evenements</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/">Propositions</router-link>
      </li>
    </ul>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li id="nav-item">
        <router-link class="nav-link" to="/">Déconnexion</router-link>
      </li>
    </ul>
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
      user: null
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

      axios.get("http://localhost:3000/users/" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(response => {
                    this.loading = false
                    this.user = response.data
                })
                .catch(error => {
                    this.loading = false
                    console.log(error)
                })

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