<template>
  <v-app>
    <div class="bg"
    >
      <v-card
          v-if="isLogin"
          width="500"
          height="600"
          class="mx-auto my-16"
          color="#F9E4B7"
      >
        <v-card-title>
          <p class="mt-16 mx-auto login">Login</p>
        </v-card-title>
        <v-col cols="10" class="mx-auto">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="nameLogin"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>

            <v-text-field
                v-model="passwordLogin"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>
            <v-btn
                x-large
                block
                color="success"
                class="mt-16"
                @click="loginValidate"
            >
              Login
            </v-btn>
          </v-form>
          <v-card-actions class="mt-4">
            <v-spacer></v-spacer>
            <v-btn
                text
                color="deep-purple accent-4"
                @click="switchCard"
            >
              Create Account
            </v-btn>
          </v-card-actions>
          <v-alert v-if="isErrorMessage" type="error" dense>
            {{errorMessage}}
          </v-alert>
        </v-col>
      </v-card>

      <v-card
          v-if="isRegister"
          width="500"
          height="600"
          class="mx-auto my-16"
          raised
          color="#F9E4B7"
      >
        <v-card-title>
          <p class="mt-16 mx-auto login">Register</p>
        </v-card-title>
        <v-col cols="10" class="mx-auto">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="nameRegister"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>

            <v-text-field
                v-model="passwordRegister"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>

            <v-text-field
                v-model="passwordConfirmRegister"
                :rules="passwordConfirmRules"
                label="Password"
                required
            ></v-text-field>
            <v-btn
                x-large
                block
                color="success"
                class="mt-10"
                @click="registerValidate"
            >
              Create Account
            </v-btn>
          </v-form>
          <v-card-actions class="mt-4">
            <v-spacer></v-spacer>
            <v-btn
                text
                color="deep-purple accent-4"
                @click="switchCard"
            >
              Login
            </v-btn>
          </v-card-actions>
          <v-alert v-if="isErrorMessage" type="error" dense>
            {{errorMessage}}
          </v-alert>
        </v-col>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from "axios"
import jsSHA from "jssha"

export default {
  name: "Login",
  data() {
    return {
      baseUrl: "http://localhost:5000/api/",
      errorMessage: '',
      isErrorMessage: false,
      isLogin: true,
      isRegister: false,
      valid: true,
      nameLogin: '',
      nameRegister: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      passwordRegister: '',
      passwordConfirmRegister: '',
      passwordLogin: '',
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length <= 32) || "Password must be less than 32 characters"
      ],
      passwordConfirmRules: [
        v => (v && v === this.passwordRegister) || "Password must match"
      ],
    }
  },
  methods: {
    switchCard() {
      this.isLogin = !this.isLogin;
      this.isRegister = !this.isRegister;
    },
    test(url) {
      url = "http://localhost:5000/api/country_data"
      axios.get(url, {headers: {"Authorization": "Bearer ey1234"}})
          .then(res => {
            console.log(res);
          })
      ;
    },
    registerValidate(url) {
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
      } else {
        const shaObj = new jsSHA("SHA-256", "TEXT", {encoding: "UTF8"});
        shaObj.update(this.passwordRegister);
        url = this.baseUrl + "register_process";
        axios.post(
            url,
            {
              headers: {"Content-Type": "application/json"},
              data: {"username": this.nameRegister, "hashedPassword": shaObj.getHash("HEX")}
            }
        )
        .then(res => {
          if (res["data"]["message"] === "Success"){
            window.location.href = '/user/' + this.nameRegister;
          }
          else{
            this.isErrorMessage = true;
            this.errorMessage = res["data"]["message"];
          }
        })
      }
    },
    loginValidate(url) {
      if (!this.$refs.form.validate()){
        this.$refs.form.validate();
      }else{
        const shaObj = new jsSHA("SHA-256", "TEXT", {encoding: "UTF8"});
        shaObj.update(this.passwordLogin);
        url = this.baseUrl + "login_process"
        axios.post(
            url,
            {
              headers: {"Content-Type": "application/json"},
              data: {"username": this.nameLogin, "hashedPassword": shaObj.getHash("HEX")}
            }
        )
        .then(res => {
          if (res["data"]["message"] === "Success"){
            this.$store.dispatch("auth", {userName: this.nameLogin})
            console.log(this.nameLogin)
            //window.location.href = '/user/' + this.nameLogin;
            this.$router.push('/user/' + this.nameLogin);
          }
          else{
            this.isErrorMessage = true;
            this.errorMessage = res["data"]["message"];
          }
        })
      }
    },
  }
}
</script>

<style>
.bg {
  background-image: url("../../../public/static/img/map-2153535.jpg");
  height: 100%;
}

.login {
  font-family: "Allura", cursive;
  font-weight: bold;
  font-size: 60px;
}
</style>