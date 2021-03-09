
'use strict';

function getRepoList() {
  let user = $('#user').val();
  console.log('this is the search:' + user);
  let userSpecificUrl =
  `https://api.github.com/users/${user}/repos`;
  fetch(userSpecificUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Please make sure to enter a valid user handle.'));
  }

 function displayResults(responseJson) {
  console.log('this is the response' + responseJson);
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  
    $('.results').removeClass('hidden');
}

function clearList(){
  $('#results-list').empty();
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    clearList();
    getRepoList();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  });