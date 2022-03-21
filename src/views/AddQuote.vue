<template>
  <div class="addQuoteContainer">
    <div class="inputContainer">
      <label for="quoteInput">New Quote</label>
      <input type="text" id="quoteInput" name="quote" v-model="message" />
      <label for="authorInput">Author</label>
      <input type="text" id="authorInput" name="author" v-model="author" />
      <div class="buttonContainer">
        <button @click="addQuote">Add Quote</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddQuoteView",
  data() {
    return {
      message: null,
      author: null,
    };
  },
  // mounted() {
  //   if (this.randomQuote.data.liked) {
  //     this.currentImage = this.heartFilled;
  //   } else {
  //     this.currentImage = this.heartEmpty;
  //   }
  // },
  methods: {
    addQuote() {
      if (!this.message || !this.author) return;
      console.log(this.message.length);
      console.log(this.author);
      const quoteData = {
        quote: this.message.trim(),
        author: this.author.trim(),
        liked: false,
      };
      console.log(quoteData);
      if (quoteData.quote.length < 1 || quoteData.author.length < 1) return;
      this.$parent.$parent.addQuoteToArray(quoteData);
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
  .quoteContainer {
    flex-direction: column;
  }
}
</style>
