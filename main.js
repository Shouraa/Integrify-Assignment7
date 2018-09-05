//List of Bought Items
const boughtList = {
  boughts: [],
  toggleBack: function(position) {
    let bought = this.boughts[position];
    bought.completed = false;
    tobuyList.tobuys.push(this.boughts[position]);
    this.boughts.splice(position, 1);
  },
  deleteBought: function(position) {
    this.boughts.splice(position, 1);
  }
};

//List of Items to Buy
const tobuyList = {
  tobuys: [],
  addTobuy: function(tobuyText, tobuyQuantity) {
    this.tobuys.push({
      tobuyText,
      tobuyQuantity,
      completed: false
    });
  },
  deleteTobuy: function(position) {
    this.tobuys.splice(position, 1);
  },
  toggleCompleted: function(position) {
    let tobuy = this.tobuys[position];
    tobuy.completed = true;
    boughtList.boughts.push(this.tobuys[position]);
    this.tobuys.splice(position, 1);
  }
};

//Handlers
const handlers = {
  addTobuy: function() {
    let addTobuyTextInput = document.getElementById("addTobuyTextInput");
    let addTobuyQuantityInput = document.getElementById(
      "addTobuyQuantityInput"
    );
    tobuyList.addTobuy(addTobuyTextInput.value, addTobuyQuantityInput.value);
    addTobuyTextInput.value = "";
    addTobuyQuantityInput.value = "";
    view.displayTobuys();
  },
  deleteTobuy: function(position) {
    tobuyList.deleteTobuy(position);
    view.displayTobuys();
  },
  toggleCompleted: function(position) {
    tobuyList.toggleCompleted(position);
    view.displayTobuys();
    view.displayBoughts();
  },
  deleteBought: function(position) {
    boughtList.deleteBought(position);
    view.displayTobuys();
    view.displayBoughts();
  },
  toggleBack: function(position) {
    boughtList.toggleBack(position);
    view.displayTobuys();
    view.displayBoughts();
  }
};

//Views
const view = {
  displayTobuys: function() {
    let tobuysUl = document.getElementById("tobuysList");
    tobuysUl.innerHTML = "";
    tobuyList.tobuys.forEach(function(tobuy, position) {
      let tobuyLi = document.createElement("li");
      tobuyLi.id = position;
      let itemTitle = document.createElement("div");
      itemTitle.className = "titleBox";
      let itemQuantity = document.createElement("div");
      itemQuantity.className = "quantityBox";
      tobuyLi.appendChild(itemTitle);
      tobuyLi.appendChild(itemQuantity);
      itemTitle.textContent = `${tobuy.tobuyText}`;
      itemQuantity.textContent = `${tobuy.tobuyQuantity}`;
      let buttonBlock = document.createElement("div");
      buttonBlock.id = position;
      buttonBlock.className = "btnBlock";
      buttonBlock.appendChild(this.createDeleteButton());
      buttonBlock.appendChild(this.createToggleButton());
      tobuyLi.appendChild(buttonBlock);
      tobuysUl.appendChild(tobuyLi);
    }, this);
  },
  displayBoughts: function() {
    let boughtsUl = document.getElementById("boughtsList");
    boughtsUl.innerHTML = "";

    boughtList.boughts.forEach(function(bought, position) {
      let boughtLi = document.createElement("li");
      boughtLi.id = position;
      let itemTitle = document.createElement("div");
      itemTitle.className = "titleBox";
      let itemQuantity = document.createElement("div");
      itemQuantity.className = "quantityBox";

      boughtLi.appendChild(itemTitle);
      boughtLi.appendChild(itemQuantity);
      itemTitle.textContent = `${bought.tobuyText}`;
      itemQuantity.textContent = `${bought.tobuyQuantity}`;
      let buttonBlock = document.createElement("div");
      buttonBlock.id = position;
      buttonBlock.className = "btnBlock";
      buttonBlock.appendChild(this.createDeleteButton());
      buttonBlock.appendChild(this.createToggleBackButton());
      boughtLi.appendChild(buttonBlock);
      boughtsUl.appendChild(boughtLi);
    }, this);
  },

  //Creating Buttons
  createDeleteButton: function() {
    let deleteButton = document.createElement("i");
    deleteButton.className = "fa fa-trash";
    deleteButton.id = "delete";
    return deleteButton;
  },
  createToggleButton: function() {
    let toggleButton = document.createElement("i");
    toggleButton.className = "fa fa-check";
    toggleButton.id = "toggle";
    return toggleButton;
  },
  createToggleBackButton: function() {
    let toggleBackButton = document.createElement("i");
    toggleBackButton.className = "fa fa-undo";
    toggleBackButton.id = "toggle";
    return toggleBackButton;
  },

  //Setting up Event Listeners
  setUpEventListeners: function() {
    let tobuysUl = document.getElementById("tobuysList");
    let boughtsUl = document.getElementById("boughtsList");

    const listener = function(event, list) {
      let elementClicked = event.target;
      console.log(elementClicked);
      if (elementClicked.id === "delete") {
        handlers[list === "toBuy" ? "deleteTobuy" : "deleteBought"](
          parseInt(elementClicked.parentNode.id)
        );
      } else if (elementClicked.id === "toggle") {
        handlers[list === "toBuy" ? "toggleCompleted" : "toggleBack"](
          parseInt(elementClicked.parentNode.id)
        );
      }
    };

    tobuysUl.addEventListener("click", function(event) {
      listener(event, "toBuy");
    });

    boughtsUl.addEventListener("click", function(event) {
      listener(event, "bought");
    });
  }
};

view.setUpEventListeners();
