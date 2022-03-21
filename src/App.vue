<template>
  <nav>
    <router-link to="/">Random <span>Quote</span></router-link> |
    <router-link to="/likedquotes">Liked <span>Quote</span></router-link> |
    <router-link to="/addquote">Add <span>Quote</span></router-link>
  </nav>
  <router-view :randomQuote="randomQuote" :likedQuotes="likedQuotes" />
</template>

<script>
import { quotes } from "@/data/quotes";
import { getRandomQuote } from "@/functions/quotesFunctions";
import swal from "sweetalert";

export default {
  name: "app",
  data() {
    return {
      //currentQuotes will originally have the data from quotes.js
      //it will be updated depending on local storage and when performing actions on the quotes
      currentQuotes: quotes,
      // randomQuote is the quote that is randomly generated and display on the home view
      randomQuote: {},
      // likedQuotes is an array of all the quotes that the user has liked
      likedQuotes: [],
      // this is use to check if the likedQuotes has change. it will help update tables
      didChanged: false,
    };
  },
  mounted() {
    this.quotesToLocalStorage();
    this.setRandomQuote();
    this.getLikedQuotes();
  },
  methods: {
    /* 
      this method will check if there is something already store in local storage.
      if it returns something and the length is greater than 0, it will store the
      quotes array in a variable to be passed as a prop to the children components.
      We check this to keep a update version of the array. One that the user have already
      manipulated by deleting, liking, or adding a quote.
      In case one of the conditions is false, it will store the original array to
      local storage.
    */
    quotesToLocalStorage() {
      const getQuotesFromStorage = JSON.parse(localStorage.getItem("quotes"));
      if (getQuotesFromStorage && getQuotesFromStorage.length > 0) {
        this.currentQuotes = [...getQuotesFromStorage];
        return;
      }
      localStorage.setItem("quotes", JSON.stringify(quotes));
    },

    // this methods uses a function store in the functions folder to get a random quote from teh array.
    setRandomQuote() {
      this.randomQuote = getRandomQuote(this.currentQuotes);
    },

    /* 
      this method will change the field like in the quote object and set it to true or false.
      we pass the index of the random quote from HomeView, and we use it to access that quote's data
      inside the array and modify it.
      then, we store the modified array in local storage.
      we also set the random quote again with the new information to render in our app.
      finally, we call the getLikedQuotes to update the array that keeps all the like quotes.
      this will toggle the button depending on what state the liked fields is in.
    */
    setLikedQuote(index) {
      this.currentQuotes[index].liked = !this.currentQuotes[index].liked;
      localStorage.setItem("quotes", JSON.stringify(this.currentQuotes));
      this.randomQuote = {
        data: { ...this.currentQuotes[index] },
        index: index,
      };
      this.getLikedQuotes();
    },

    /* 
      this method is utilized in the LikedQuotes view, where we display a list of al the quotes a user has liked
      this works similar to setLikedQuote method, but this one only sets the field liked to false.
      It also updates de likedQuotes array to update the table with the list of quotes.
    */
    setUnlikeQuote(quote) {
      const quoteIndex = this.currentQuotes.findIndex((data) => {
        return data.id === quote.id;
      });
      this.currentQuotes[quoteIndex].liked = false;
      localStorage.setItem("quotes", JSON.stringify(this.currentQuotes));
      this.getLikedQuotes();
      swal("Success", "Your quote has been remove from this list", "success");
    },

    /* 
      this method filters all the quotes by the field liked
      if it's liked (true), it will add it to the list
    */
    getLikedQuotes() {
      this.likedQuotes = {
        didChanged: !this.didChanged,
        data: this.currentQuotes.filter((data) => {
          return data.liked;
        }),
      };
    },

    /* 
      this method deletes a specific quote
      if it's liked (true), it will add it to the list
      it will also check if that quote is liked. if it is, it will also remove it from the liked list.
      then, it will generate another random quote to display
    */
    async deleteQuote(quoteData) {
      if (quoteData.data.liked) await this.setUnlikeQuote(quoteData.data);
      this.currentQuotes.splice(quoteData.index, 1);
      this.setRandomQuote();
      swal("Success", "Your quote has been delete", "success");
    },

    /* 
      this method add a quote object with all its fields:
        id, quote, author, liked
    */
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
  color: #e24e42;
}

@media only screen and (max-width: 600px) {
  #app {
    padding: 20px;
  }
  span {
    display: none;
  }
}
</style>
