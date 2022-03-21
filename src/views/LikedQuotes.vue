<template>
  <!-- This view will display a table with all the quotes that a user has liked -->
  <div class="likeQuotesContainer">
    <table v-if="displayTable">
      <tr>
        <th>Quote</th>
        <th>Author</th>
        <th>Unlike</th>
      </tr>
      <tr v-for="quote in likedQuotes.data" :key="quote.quote">
        <td>{{ quote.quote }}</td>
        <td class="center">{{ quote.author }}</td>
        <td class="actionIcon">
          <img :src="removeIcon" alt="Delete" @click="unlikeQuote(quote)" />
        </td>
      </tr>
    </table>
    <p v-else>Please like any of our quotes, then come back to see you list</p>
  </div>
</template>

<script>
export default {
  name: "LikedQuotesView",
  props: ["likedQuotes"],
  data() {
    return {
      removeIcon: require("@/assets/icons/removeIcon.png"),
      displayTable: this.likedQuotes.data.length > 0 ? true : false,
    };
  },
  // in watch: we are going to keep track of the likedQuotes object to check when it has a change,
  // and update the list accordingly
  watch: {
    likedQuotes: function (newVal) {
      if (newVal.data.length > 0) {
        this.displayTable = true;
      } else {
        this.displayTable = false;
      }
    },
  },
  methods: {
    //this method calls the getLikedQuotes from the parent (App.vue)
    getUserLikedQuotes() {
      this.$parent.$parent.getLikedQuotes();
    },
    //this method calls the setUnlikeQuote from the parent (App.vue)
    unlikeQuote(quote) {
      this.$parent.$parent.setUnlikeQuote(quote);
    },
  },
};
</script>

<style scoped>
.likeQuotesContainer {
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
table,
th,
td {
  border: 1px solid white;
  border-collapse: collapse;
  color: #fff;
}
th,
td {
  background-color: #e24e42;
  padding: 5px 20px;
}
.center {
  text-align: center;
}
.actionIcon {
  text-align: center;
}
img {
  width: 20px;
  background-color: #fff;
  border-radius: 50%;
  padding: 1px;
  cursor: pointer;
}
</style>
