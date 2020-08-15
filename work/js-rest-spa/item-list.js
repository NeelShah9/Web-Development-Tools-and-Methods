const items = {};

const counter = () =>  {
  let count = 9;
  return () => {
    count += 1;
    return count;
  };
};

const nextItemId = counter();

function getItemById(itemId){
  if(items[itemId]) {
    return items[itemId];
  } else {
    return null;
  }
}

function getItems(){
  return items;
}

function addItem(item){
  const itemId = nextItemId();
  if(!item.name) {
    return 400;
  }
  if(!item.quantity){
      item.quantity = 0;
  }
  for(eachItem in items){
    if(items[eachItem].name === item.name) {
      return 409;
    }
  };
  items[itemId] = item;
  return {itemid: itemId, name: item.name, quantity: item.quantity};
}

function updateTheItem(itemId, item){
  if(!itemId) {
    return 400;
  }
  if(!items[itemId]) {
    return 409;
  }
  items[itemId].quantity = item.quantity;
  return {itemid: itemId, name: items[itemId].name, quantity: items[itemId].quantity};
}

function deleteTheItem(itemId){
  if(!itemId) {
    return 400;
  }
  if(!items[itemId]) {
    return 409;
  }
  delete items[itemId];
}

const addfunctions = {
  getItemById,
  getItems,
  addItem,
  updateTheItem,
  deleteTheItem
}

module.exports = addfunctions;