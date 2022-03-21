export function getRandomQuote(quotes) {
  /* 
    - this functions receives the quotes array
    - then, using the length of the array, we calculate a random number
      and multiply by the array length to get a number between 0 and the array length (-1)
    - then, we pass that number as the index of that array to get a specific quote
  */
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  return { data: quotes[quoteIndex], index: quoteIndex };
}
