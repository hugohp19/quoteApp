<template>
  <div class="likeQuotesContainer">
    <table>
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
  </div>
</template>

<script>
export default {
  name: "LikedQuotesView",
  props: ["likedQuotes"],
  data() {
    return {
      removeIcon: require("@/assets/icons/removeIcon.png"),
    };
  },
  methods: {
    getUserLikedQuotes() {
      this.$parent.$parent.getLikedQuotes();
    },
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
}
th,
td {
  background-color: #96d4d4;
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
