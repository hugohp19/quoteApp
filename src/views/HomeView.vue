<template>
  <div class="home">
    <!-- This view will display a random quote, as well as the author and two action buttons (a like/unlike button and a delete button) -->
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
import swal from "sweetalert";

export default {
  name: "HomeView",
  props: ["randomQuote"],
  // in watch: we are going to keep track of the randomQuote object to check when it has a change.
  // more specifically in the liked field.
  // this is to toggle the heart between white to red
  watch: {
    randomQuote: function (newVal) {
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
      heartFilled: require("@/assets/icons/heartRed.png"),
      removeIcon: require("@/assets/icons/removeIcon.png"),
      currentImage: null,
    };
  },
  mounted() {
    //this will do the same thing that watch (line 31) is doing but only the first time when it is mounted
    if (this.randomQuote.data.liked) {
      this.currentImage = this.heartFilled;
    } else {
      this.currentImage = this.heartEmpty;
    }
  },
  methods: {
    //this method calls the setRandomQuote from the parent (App.vue)
    getNextQuote() {
      this.$parent.$parent.setRandomQuote();
    },
    //this method calls the setLikedQuote from the parent (App.vue)
    likeQuote() {
      this.$parent.$parent.setLikedQuote(this.randomQuote.index);
    },
    //this method calls the deleteQuote from the parent (App.vue)
    deleteRandomQuote(quote) {
      swal("Are you sure you delete this quote?", {
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) this.$parent.$parent.deleteQuote(quote);
      });
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
