"use strict";

const GIPHY_API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const GIPHY_BASE_URL = "http://api.giphy.com/v1"

/** Accepts length of an array. Returns a random index of that array. */
function getRandomIndex(arrLength){
  return Math.floor(Math.random()*(arrLength - 1));
}

/** Handles click event. Returns no value.
 * Uses Axios query to GET from giphy.com
 */
async function handleClick(evt) {
  evt.preventDefault();
  console.log('handClick invoked');

  const search = $('#giphy-search').val();
  $('#giphy-search').val("");

  let response = await axios
    .get(`${GIPHY_BASE_URL}/gifs/search`,
    { params: { q: search, api_key: GIPHY_API_KEY }}
  );

  console.log("search resp=", response);

  let resultArrLength = response.data.data.length;
  if(resultArrLength === 0){
    return;
  }
  else{
    const randomIndex = getRandomIndex(response.data.data.length);
    const urlGIF = response.data.data[randomIndex].images.original.url;

    $(".container").append($("<img>").attr('src', urlGIF));
  }
}

/** Accepts no argument and returns no value.
 * Sets container innerHTML to empty.
 */
function resetGIFs(){
  $('.container').html('');
}

$("form").on("submit", handleClick);
$("#reset-button").on("click", resetGIFs)
