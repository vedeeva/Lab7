// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'style.css',
  '/scripts/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});




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

