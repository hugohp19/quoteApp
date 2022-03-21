<template>
  <nav>
    <router-link to="/">Random <spam>Quote</spam></router-link> |
    <router-link to="/likedquotes">Liked <spam>Quote</spam></router-link> |
    <router-link to="/addquote">Add <spam>Quote</spam></router-link>
  </nav>
  <router-view :randomQuote="randomQuote" :likedQuotes="likedQuotes" />
</template>

<script>
import { quotes } from "@/data/quotes";
import { getRandomQuote } from "@/functions/quotesFunctions";

export default {
  name: "app",
  data() {
    return {
      quote: null,
      currentQuotes: quotes,
      randomQuote: {},
      likedQuotes: [],
      didChanged: false,
    };
  },
  mounted() {
    this.quotesToLocalStorage();
    this.setRandomQuote();
    this.getLikedQuotes();
  },
  methods: {
    quotesToLocalStorage() {
      const getQuotesFromStorage = JSON.parse(localStorage.getItem("quotes"));
      if (getQuotesFromStorage && getQuotesFromStorage.length > 0) {
        this.currentQuotes = [...getQuotesFromStorage];
        return;
      }
      localStorage.setItem("quotes", JSON.stringify(quotes));
    },

    setRandomQuote() {
      this.randomQuote = getRandomQuote(this.currentQuotes);
    },

    setLikedQuote(index) {
      console.log(index);
      console.log(this.currentQuotes[index]);
      this.currentQuotes[index].liked = !this.currentQuotes[index].liked;
      localStorage.setItem("quotes", JSON.stringify(this.currentQuotes));
      this.randomQuote = {
        data: { ...this.currentQuotes[index] },
        index: index,
      };
      this.getLikedQuotes();
    },

    setUnlikeQuote(quote) {
      console.log(quote);
      const quoteIndex = this.currentQuotes.findIndex((data) => {
        return data.id === quote.id;
      });
      this.currentQuotes[quoteIndex].liked = false;
      localStorage.setItem("quotes", JSON.stringify(this.currentQuotes));
      this.getLikedQuotes();
    },

    getLikedQuotes() {
      this.likedQuotes = {
        didChanged: !this.didChanged,
        data: this.currentQuotes.filter((data) => {
          return data.liked;
        }),
      };
      console.log(this.likedQuotes);
    },
    async deleteQuote(quoteData) {
      if (quoteData.data.liked) await this.setUnlikeQuote(quoteData.data);
      this.currentQuotes.splice(quoteData.index, 1);
      console.log(this.currentQuotes);
      this.setRandomQuote();
      console.log(quoteData.data.liked);
    },
    addQuoteToArray(newQuote) {
      this.currentQuotes.push(newQuote);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  padding: 20px 40px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
}

nav {
  height: 5%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

@media only screen and (max-width: 600px) {
  #app {
    padding: 20px;
  }
  spam {
    display: none;
  }
}
</style>
