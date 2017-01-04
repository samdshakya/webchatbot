(function() {
  // 'use strict';

  // var app = {
  //   isLoading: true,
  //   visibleCards: {},
  //   selectedCities: [],
  //   spinner: document.querySelector('.loader'),
  //   cardTemplate: document.querySelector('.cardTemplate'),
  //   container: document.querySelector('.main'),
  //   addDialog: document.querySelector('.dialog-container'),
  //   daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  // };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  // document.getElementById('butRefresh').addEventListener('click', function() {
    
  // });


  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  // TODO add startup code here

  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('./service-worker.js')
     .then(function() { console.log('Service Worker Registered'); });
  }
})();
