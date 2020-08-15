'use strict';
(function iife() {

  const list = document.querySelector('.item-list');
  const login = document.querySelector('.login');
  const status = document.querySelector('.status');
  const addItem = document.querySelector('.add-item');
  const logout = document.querySelector('.logout');
  const loading = document.querySelector('.loading');

  const errorMessages = {
    'duplicate': 'Duplicate Item!',
    'missing-name': 'Name field empty',
    'network-error': 'There was a problem connecting to the network, try again',
    'not-found': 'Item does not exist',
    'sid-missing': 'SID is missing or empty',
    'sid-unknown': 'SID is unknown',
    'bad-login': 'Bad login',
  };

  function updateStatus( message ) {
    status.innerText = message;
  }

  function renderingLogin() {
    list.innerHTML = '';
    addItem.innerHTML = '';
    logout.innerHTML = '';
    loading.innerHTML = '';
    const loginHtml = `
                        <input class="username">
                        <button class="submit" type="button">Submit</button> `;
    login.innerHTML = loginHtml;
  }

  function renderingLoading(){
    login.innerHTML = '';
    list.innerHTML = '';
    addItem.innerHTML = '';
    logout.innerHTML = '';
    updateStatus('');
    loading.innerHTML = 'Loading....';
  }

  function renderItemsList(items) {
    login.innerHTML = '';
    loading.innerHTML = '';
    const itemListHtml = Object.keys(items).map((key) => {
    const item = items[key];
    return `
        <li class="item">
          <span class="item-name" data-id="${key}">${item.name}</span>
		  <button class="delete" data-name="${key}">X</button>
          <input class="item-quantity" data-id="${key}" value = "${item.quantity}">
          <button class="update" data-name="${key}">Update</button>
          
        </li>`
    }).join('');

    const addItemHtml = `
                <input class="add-item-name">
                <input class="add-item-quantity" value=0>
                <button class="add-button">Add</button> `;
    const logoutHtml = `<button class="logout-button">Logout</button>`;
    logout.innerHTML = logoutHtml;
    addItem.innerHTML = addItemHtml;
    list.innerHTML = itemListHtml;
    const addButton = document.querySelector('.add-button');
    addButton.disabled = true;
  }

  function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

  function getTheItemList() {
    fetch('/items/', {
      method: 'GET',
    })
    .catch( () => Promise.reject( { error: 'network-error' }) )
    .then(convertError)
    .then(items => {
      renderItemsList(items);
    })
    .catch( err => {
      updateStatus(errorMessages[err.error] || err.error);
      if(err.error === 'sid-missing' || err.error === 'sid-unknown'){
        renderingLogin();
      }
    })
  }

  logout.addEventListener('click', (e) => {
    if(e.target.classList.contains('logout-button') ) {
      fetch(`/session/`, {
        method: 'DELETE'
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( () => {
        renderingLogin();
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errorMessages[err.error] || err.error);
      });
    }
  });

  list.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete') ) {
      const itemid = e.target.dataset.name;
      fetch(`/items/${itemid}`, {
        method: 'DELETE',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( () => {
        getTheItemList();
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errorMessages[err.error] || err.error);
        if(err.error === 'sid-missing' || err.error === 'sid-unknown'){
          renderingLogin();
        }else{
          getTheItemList();
        }
      });
    }
  });

  list.addEventListener('click', (e) => {
    if(e.target.classList.contains('update') ) {
      const itemid = e.target.dataset.name;
      const newQuantity = e.target.previousElementSibling.value;
      const item =
      {
        quantity: newQuantity,
      };
      fetch(`/items/${itemid}`, {
        body: JSON.stringify(item),
        headers: { 'Content-type': 'application/json' },
        method: 'PATCH',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( () => {
        getTheItemList();
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errorMessages[err.error] || err.error);
        if(err.error === 'sid-missing' || err.error === 'sid-unknown'){
          renderingLogin();
        }else{
          getTheItemList();
        }
      });
    }
  });

  login.addEventListener('click', (e) => {
    if(e.target.classList.contains('submit') ) {
      const usrName = document.querySelector('.username').value;
      const user = {
                      name : usrName,
                    };
      if(user) {
        fetch(`/session/`, {
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then(convertError)
        .then( () => {
          renderingLoading();
          getTheItemList();
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errorMessages[err.error] || err.error);
          renderingLogin();
        });
      }
    }
  });

  addItem.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-button') ) {
      const itemName = document.querySelector('.add-item-name').value;
      const itemQuantity = document.querySelector('.add-item-quantity').value;
      const item = {
                    name: itemName,
                    quantity: itemQuantity,
                  };
      if(item.name) {
        fetch(`/items/`, {
          body: JSON.stringify(item),
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then(convertError)
        .then(() => {
          getTheItemList();
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errorMessages[err.error] || err.error);
          if(err.error === 'sid-missing' || err.error === 'sid-unknown'){
            renderingLogin();
          }else{
            getTheItemList();
          }
        });
      }
    }
  });

  addItem.addEventListener('keyup', function (event) {
    let targetValue = event.target.value;
    let previousToTarget = '';
    let nextToTarget = '';
    let disableFlag = true;
    try{
      previousToTarget = event.target.previousElementSibling.value;
    }catch(error){
      previousToTarget = '';
    }
    try{
      nextToTarget = event.target.nextElementSibling.value;
    }catch(error){
      nextToTarget = '';
    }
    if(targetValue && (previousToTarget || nextToTarget)){
      disableFlag = false;
    }
    document.querySelector('.add-button').disabled = disableFlag;
  });

  fetch('/session/', {
    method: 'GET',
  })
  .catch( () => Promise.reject( { error: 'network-error' }) )
  .then( convertError )
  .then(status => {
    if (status.statusCode == 100) {
      renderingLoading();
      getTheItemList();
      updateStatus('');
    } else {
      renderingLogin();
    }
    updateStatus('');
  })
  .catch( err => {
    updateStatus(errorMessages[err.error] || err.error);
    renderingLogin();
  });

})();

