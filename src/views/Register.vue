<template>
  <div class="container">
    <form>
      <h3>Inscription</h3>

      <div class="form-group">
        <label>Nom: </label>
        <input type="text" v-model="input.lastname" class="form-control" />
      </div>

      <div class="form-group">
        <label>Prenom: </label>
        <input type="text" v-model="input.firstname" class="form-control" />
      </div>

      <div class="form-group">
        <label>Adresse mail: </label>
        <input type="email" v-model="input.email" class="form-control" />
      </div>

      <div class="form-group">
        <label>Mot de passe: </label>
        <input type="password" v-model="input.password" class="form-control" />
      </div>

      <div class="form-group">
        <label>Confirmer mot de passe: </label>
        <input
          type="password"
          v-model="input.passwordConfirm"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label>Numéro de chambre: </label>
        <input type="text" v-model="input.roomNumber" class="form-control" />
      </div>

      <button
        type="button"
        class="btn btn-dark btn-lg btn-block"
        v-on:click="register()"
      >
        S'inscrire
      </button>

      <p class="text-right mt-2 mb-4">
        <router-link to="/login"
          >Vous possédez déjà un compte ? Connectez-vous ici !</router-link
        >
      </p>
    </form>
  </div>
</template>
 
<script>
import axios from "axios";
import * as _ from "lodash";
export default {
  name: "Register",
  data() {
    return {
      input: {
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        roomNumber: "",
      },
    };
  },
  methods: {
    async register() {
      if (
        !_.isEmpty(this.input.lastname) &&
        !_.isEmpty(this.input.firstname) &&
        !_.isEmpty(this.input.email) &&
        !_.isEmpty(this.input.password) &&
        !_.isEmpty(this.input.passwordConfirm) &&
        !_.isEmpty(this.input.roomNumber)
      ) {
        if (this.input.password.length >= 6) {
          if (!_.isNaN(parseInt(this.input.roomNumber))) {
            if (_.isEqual(this.input.password, this.input.passwordConfirm)) {
              try {
                console.log("OK");
                const res = await axios.post("http://localhost:3000/auth/register", {
                  first_name: this.input.firstname,
                  last_name: this.input.lastname,
                  email: this.input.email,
                  password: this.input.password,
                  confirme_password: this.input.passwordConfirm,
                  room_number: _.toNumber(this.input.roomNumber),
                  roles: ["User"],
                  status: "Pending",
                });
                console.log(res);
              } catch (error) {
                console.error(error.response.data.message);
              }
            } else {
              console.log("Mots de passe de correspondent pas");
            }
          } else {
            console.log("Le numéro de chambre doit être un nombre");
          }
        } else {
            console.log("Mot de passe trop court");
          }
      } else {
        console.log("Un ou plusieurs champs vides");
      }
    },
  },
};
</script>