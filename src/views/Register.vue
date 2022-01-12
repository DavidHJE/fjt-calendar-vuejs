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
                <input type="password" v-model="input.passwordConfim" class="form-control" />
            </div>

            <div class="form-group">
                <label>Numéro de chambre: </label>
                <input type="text" v-model="input.roomNumber" class="form-control" />
            </div>
 
            <button type="button" class="btn btn-dark btn-lg btn-block" v-on:click="register()">S'inscrire</button>
 
            <p class="text-right mt-2 mb-4">
                <router-link to="/login">Vous possédez déjà un compte ? Connectez-vous ici !</router-link>
            </p>
        </form>
    </div>
</template>
 
<script>
    //import axios from 'axios';
    export default {
        name: 'Register',
        data() {
            return {
                input: {
                    lastname: "",
                    firstname: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    roomNumber: ""
                }
            }
        },
        methods: {
            async register() {
            }
        }
    }
</script>