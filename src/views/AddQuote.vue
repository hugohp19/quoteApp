<template>
  <!-- This view will have the inputs to add a quote to the array -->
  <div class="addQuoteContainer">
    <div class="inputContainer">
      <label for="quoteInput">New Quote</label>
      <input type="text" id="quoteInput" name="quote" v-model="quote" />
      <label for="authorInput">Author</label>
      <input type="text" id="authorInput" name="author" v-model="author" />
      <div class="buttonContainer">
        <button @click="addQuote">Add Quote</button>
      </div>
    </div>
  </div>
</template>

<script>
import { uid } from "uid";
import swal from "sweetalert";
export default {
  name: "AddQuoteView",
  data() {
    return {
      quote: null,
      author: null,
    };
  },
  methods: {
    /* 
      this method will check that the data needed from the input is not empty,
      as well as adding the necessary information such as id and liked.
      then it will call the addQuoteToArray method from the parent component
    */
    addQuote() {
      if (!this.quote || !this.author) {
        swal(
          "Sorry",
          "You need to add a quote and an author to proceed",
          "warning"
        );
        return;
      }
      const quoteData = {
        id: uid(),
        quote: this.quote.trim(),
        author: this.author.trim(),
        liked: false,
      };
      if (quoteData.quote.length < 1 || quoteData.author.length < 1) return;
      try {
        this.$parent.$parent.addQuoteToArray(quoteData);
      } catch (error) {
        console.log(error);
      }
      swal("All Right!", "Your quote has been added", "success");
      this.quote = "";
      this.author = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addQuoteContainer {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inputContainer {
  width: 60%;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 2rem;
}
label {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
  align-self: flex-start;
}

button {
  width: 150px;
  height: 30px;
  border-radius: 10px;
  background-color: #e24e42;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  border: 2px solid #008f95;
  background-color: #f0958d;
}

button:active {
  background-color: #008f95;
}

@media only screen and (max-width: 600px) {
  .inputContainer {
    width: 100%;
    padding: 10px;
  }
}
</style>
