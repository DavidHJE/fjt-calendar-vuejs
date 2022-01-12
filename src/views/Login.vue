<template>
  <div class="container">
    <form>
      <h3>Connexion</h3>

      <div class="form-group">
        <label>Adresse email: </label>
        <input type="email" v-model="input.email" class="form-control" />
      </div>

      <div class="form-group">
        <label>Mot de passe: </label>
        <input type="password" v-model="input.password" class="form-control" />
      </div>

      <button
        type="button"
        class="btn btn-dark btn-lg btn-block"
        v-on:click="login()"
      >
        Se connecter
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Mot de passe oublié ?</router-link>
      </p>
      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/register"
          >Pas encore de compte ? Inscrivez-vous ici !</router-link
        >
      </p>
    </form>
  </div>
</template>
 
<script>
import axios from "axios";
import router from "../router/index";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (this.input.email != "" && this.input.password != "") {
        if (this.input.password.length >= 6) {
          try {
            console.log("OK");

            /*let token = localStorage.getItem("token");
            if (token) {*/
            const res = await axios.post(
              "http://localhost:3000/auth/login",
              {
                email: this.input.email,
                password: this.input.password,
              } /*  {headers: {'Authorization': `Bearer ${token}`}} */
            );
            
            // localStorage.token = res.data.access_token;
            localStorage.setItem('jwt-access', res.data.access_token);
            localStorage.setItem('jwt-refresh', res.data.refresh_token);
            console.log(res);
            router.push({ name: 'Home' })
            /*} */
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("Mot de passe trop court");
        }
      } else {
        console.log("A username and password must be present");
      }
    },
  },
};
</script>