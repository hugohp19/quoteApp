export function getRandomQuote(quotes) {
  /* 
    - this functions receives the quotes array
    - then, using the length of the array, we calculate a random number
      and multiply by the array length to get a number between 1 and the array length
    - then, we pass that number as the index of that array to get a specific quote
  */
  const quoteIndex = Math.floor(Math.random() * quotes.length) - 1;
  console.log("length: ", quotes.length);
  console.log("index: ", quoteIndex);
  console.log("quote: ", quotes[quoteIndex]);
  return { data: quotes[quoteIndex], index: quoteIndex };
}
