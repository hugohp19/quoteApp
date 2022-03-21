<template>
  <div class="home">
    <!-- <p>this is my first quote</p> -->
    <div class="quoteContainer">
      <div class="quoteDiv">
        <q>{{ randomQuote.data.quote }}</q>
        <cite>— {{ randomQuote.data.author }}</cite>
      </div>
      <div class="actionDiv">
        <img :src="currentImage" alt="heart" @click="likeQuote" />
        <img
          :src="removeIcon"
          @click="deleteRandomQuote(randomQuote)"
          alt="Delete"
        />
      </div>
    </div>
    <button @click="getNextQuote">Get next quote</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  props: ["randomQuote"],
  watch: {
    randomQuote: function (newVal, oldVal) {
      console.log("Prop  was: ", oldVal.data.liked);
      console.log("Prop changed: ", newVal.data.liked);
      if (newVal.data.liked) {
        this.currentImage = this.heartFilled;
      } else {
        this.currentImage = this.heartEmpty;
      }
    },
  },
  data() {
    return {
      heartEmpty: require("@/assets/icons/heartWhite.svg"),
      heartFilled: require("@/assets/icons/iconmonstr-favorite-3-240.png"),
      removeIcon: require("@/assets/icons/removeIcon.png"),
      currentImage: null,
    };
  },
  // components: {
  //   HelloWorld,
  // },
  mounted() {
    if (this.randomQuote.data.liked) {
      this.currentImage = this.heartFilled;
    } else {
      this.currentImage = this.heartEmpty;
    }
  },
  methods: {
    getNextQuote() {
      this.$parent.$parent.setRandomQuote();
    },
    likeQuote() {
      console.log(this.randomQuote.index);
      this.$parent.$parent.setLikedQuote(this.randomQuote.index);
    },
    isQuoteLiked() {
      if (this.randomQuote.data.liked) {
        this.currentImage = this.heartFilled;
      } else {
        this.currentImage = this.heartEmpty;
      }
    },
    deleteRandomQuote(quote) {
      console.log(quote);
      this.$parent.$parent.deleteQuote(quote);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

p,
q {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
}

cite {
  font-size: 1.4rem;
  text-align: right;
}

.quoteContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 2rem;
}

.quoteDiv {
  display: flex;
  flex-direction: column;
}

img {
  width: 30px;
  height: 30px;
  cursor: pointer;
  /* align-self: flex-end; */
}

.actionDiv {
  display: flex;
  align-self: flex-end;
  gap: 1rem;
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
  margin-top: 2rem;
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
    padding: 1rem;
  }
}
</style>
