// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
var id = 0;
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        id++;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = id;
        
        newPost.addEventListener('click', ()=>{
          setState({page: 'entry', number: newPost.id});
          // console.log(document.querySelector('.entry-image'));
          document.querySelector('entry-page').entry = newPost.entry;
          console.log(newPost.entry);
        })
        document.querySelector('main').appendChild(newPost);
        // document.querySelector('entry-page').entry = document.querySelector('journal-entry').entry;
      });
    });
});

document.querySelector('header').children[1].addEventListener('click', () => {
  setState({page: 'settings'});
});
document.querySelector('header').children[0].addEventListener('click', () => {
  setState({page: 'back'});
});

