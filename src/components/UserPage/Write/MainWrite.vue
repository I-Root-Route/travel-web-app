<template>
  <v-container>
    <choose-place></choose-place>
    <stay-data></stay-data>
    <v-col cols="6" class="mx-auto">
      <v-row>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click="storeData">Submit</v-btn>
      </v-row>
    </v-col>
    <v-dialog v-model="isSubmissionValid" color="success" width="500">
      <v-card>
        <v-card-title>
          Insert Success!
        </v-card-title>
        <v-card-text>
          Successfully submitted!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="isSubmissionValid=false">Close</v-btn>
          <v-btn color="success" text @click="goHome">Go TO "HOME"</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <v-dialog v-model="isSubmissionFailed" width="500">
      <v-card>
        <v-card-title>
          Submission Failed
        </v-card-title>
        <v-card-text>
          {{errorMessage}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink" text @click="isSubmissionFailed=false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
import ChoosePlace from "@/components/UserPage/Write/ChoosePlace";
import StayData from "@/components/UserPage/Write/StayData";

export default {
  name: "MainWrite",
  components: {
    ChoosePlace,
    StayData,
  },
  data() {
    return {
      isSubmissionValid: false,
      isSubmissionFailed: false,
      errorMessage: "",
      insertUrl: "https://journey-list.azurewebsites.net/api/insert_visit_data"
    }
  },
  methods: {
    storeData() {
      axios.post(
          this.insertUrl,
          {
            data: {
              userName: this.$store.state.userName,
              visitedCountry: this.$store.state.visitedCountry,
              visitedState: this.$store.state.visitedState,
              dates: this.$store.state.dates,
              totalCost: this.$store.state.totalCost,
              selectedCurrency: this.$store.state.selectedCurrency,
            }
          }
      )
      .then(res => {
        if (res["data"]["message"] === "Insert Success"){
          this.isSubmissionValid = true;
        }else{
          this.isSubmissionFailed = true;
          this.errorMessage = res["data"]["message"]
        }
      })
    },
    goHome() {
      this.isSubmissionValid = false;
      this.$router.push('/user/' + this.$store.state.userName)
    },
  }
}
</script>

<style scoped>

</style>