/**
 * Create an on screen keyboard and attach it to an input field.
 *
 * v. 1.1 : now comes with optional arrow key navigation.
 */
var icaOnscreenKeyboard = new Object();

icaOnscreenKeyboard.config = new Object();
icaOnscreenKeyboard.config.default = [
  // top row
  [
    { buttonValue : '`',
      buttonValueShift : '~',
      showShiftValue : true,
      buttonId : 'backtick_tilde'},
    { buttonValue : '1',
      buttonValueShift : '!',
      showShiftValue : true,
      buttonId : 'one_bang'},
    { buttonValue : '2',
      buttonValueShift : '@',
      showShiftValue : true,
      buttonId : 'two_at'},
    { buttonValue : '3',
      buttonValueShift : '#',
      showShiftValue : true,
      buttonId : 'three_hash'},
    { buttonValue : '4',
      buttonValueShift : '$',
      showShiftValue : true,
      buttonId : 'four_dollar'},
    { buttonValue : '5',
      buttonValueShift : '%',
      showShiftValue : true,
      buttonId : 'five_percent'},
    { buttonValue : '6',
      buttonValueShift : '^',
      showShiftValue : true,
      buttonId : 'six_caret'},
    { buttonValue : '7',
      buttonValueShift : '&',
      showShiftValue : true,
      buttonId : 'seven_ampersand'},
    { buttonValue : '8',
      buttonValueShift : '*',
      showShiftValue : true,
      buttonId : '8_asterisk'},
    { buttonValue : '9',
      buttonValueShift : '(',
      showShiftValue : true,
      buttonId : '9_paren'},
    { buttonValue : '0',
      buttonValueShift : ')',
      showShiftValue : true,
      buttonId : 'zero_paren'},
    { buttonValue : '-',
      buttonValueShift : '_',
      showShiftValue : true,
      buttonId : 'minus_underscore'},
    { buttonValue : '=',
      buttonValueShift : '+',
      showShiftValue : true,
      buttonId : 'equals_plus'},
    { buttonValue : '<-',
      buttonCommand: function(keyboardElement, inputElement, inputValue) {
                 if(! inputValue.length) {
                   return '';
                 };
                 if(inputValue.length == 1) {
                   return '';
                 };
                 inputValue = inputValue.substring(0, inputValue.length - 1);
                 return inputValue;
               },
      buttonId : 'backspace'},
  ],

  // the second row
  [
    { buttonValue : 'TAB',
      buttonCommand: function(keyboardElement, inputElement, inputValue) {
                 return inputValue + "\t";
               },
      buttonId : 'tab'},
    { buttonValue : 'q',
      buttonValueShift : 'Q',
      buttonId : 'q'},
    { buttonValue : 'w',
      buttonValueShift : 'W',
      buttonId : 'w'},
    { buttonValue : 'e',
      buttonValueShift : 'E',
      buttonId : 'e'},
    { buttonValue : 'r',
      buttonValueShift : 'R',
      buttonId : 'r'},
    { buttonValue : 't',
      buttonValueShift : 'T',
      buttonId : 't'},
    { buttonValue : 'y',
      buttonValueShift : 'Y',
      buttonId : 'y'},
    { buttonValue : 'u',
      buttonValueShift : 'U',
      buttonId : 'u'},
    { buttonValue : 'i',
      buttonValueShift : 'I',
      buttonId : 'i'},
    { buttonValue : 'o',
      buttonValueShift : 'O',
      buttonId : 'o'},
    { buttonValue : 'p',
      buttonValueShift : 'P',
      buttonId : 'p'},
    { buttonValue : '[',
      buttonValueShift : '{',
      showShiftValue : true,
      buttonId : 'bracket_left'},
    { buttonValue : ']',
      buttonValueShift : '}',
      showShiftValue : true,
      buttonId : 'bracket_right'},
    { buttonValue : '\\',
      buttonValueShift : '|',
      showShiftValue : true,
      buttonId : 'backslash_pipe'},
  ],
  // third row
  [
    { buttonValue : 'Caps lock',
      buttonCommand : function(keyboardElement, inputElement, inputValue) {
                        var shiftStatus = $(keyboardElement).attr('icaOnscreenShiftStatus') * 1; // attributes are saved as strings
                        icaOnscreenKeyboard.toggleShiftStatus(keyboardElement);
                        // remember, this is the status BEFORE the toggle
                        if(shiftStatus) {
                          $(keyboardElement).attr('icaOnscreenCapslockStatus', 0);
                          $(keyboardElement).removeClass('ica-onscreen-keyboard-capslock-active');
                        }
                        else {
                          $(keyboardElement).attr('icaOnscreenCapslockStatus', 1);
                          $(keyboardElement).addClass('ica-onscreen-keyboard-capslock-active');
                        };
                  return inputValue;
                },
      buttonId : 'capslock'},
    { buttonValue : 'a',
      buttonValueShift : 'A',
      buttonId : 'a'},
    { buttonValue : 's',
      buttonValueShift : 'S',
      buttonId : 's'},
    { buttonValue : 'd',
      buttonValueShift : 'D',
      buttonId : 'd'},
    { buttonValue : 'f',
      buttonValueShift : 'F',
      buttonId : 'f'},
    { buttonValue : 'g',
      buttonValueShift : 'G',
      buttonId : 'g'},
    { buttonValue : 'h',
      buttonValueShift : 'H',
      buttonId : 'h'},
    { buttonValue : 'j',
      buttonValueShift : 'J',
      buttonId : 'j'},
    { buttonValue : 'k',
      buttonValueShift : 'K',
      buttonId : 'k'},
    { buttonValue : 'l',
      buttonValueShift : 'l',
      buttonId : 'l'},
    { buttonValue : ';',
      buttonValueShift : ':',
      showShiftValue : true,
      buttonId : 'semicolon_colon'},
    { buttonValue : "'",
      buttonValueShift : '"',
      showShiftValue : true,
      buttonId : 'apostrophe_quotes'},
    { buttonValue : 'Return',
      buttonCommand : function(keyboardElement, inputElement, inputValue) {
                  return inputValue + "\n";
                },

      buttonId : 'return'},
  ],
  // fourth row (bottom)
  [
    { buttonValue : 'Shift',
      buttonCommand : function(keyboardElement, inputElement, inputValue) {
                  icaOnscreenKeyboard.toggleShiftStatus(keyboardElement);
                  return inputValue;
                },
      buttonId : 'left_shift'},
    { buttonValue : 'z',
      buttonValueShift : 'Z',
      buttonId : 'z'},
    { buttonValue : 'x',
      buttonValueShift : 'X',
      buttonId : 'x'},
    { buttonValue : 'c',
      buttonValueShift : 'C',
      buttonId : 'c'},
    { buttonValue : 'v',
      buttonValueShift : 'V',
      buttonId : 'v'},
    { buttonValue : 'b',
      buttonValueShift : 'B',
      buttonId : 'b'},
    { buttonValue : 'n',
      buttonValueShift : 'N',
      buttonId : 'n'},
    { buttonValue : 'm',
      buttonValueShift : 'M',
      buttonId : 'm'},

    { buttonValue : ',',
      buttonValueShift : '<',
      showShiftValue : true,
      buttonId : 'comma_lessthan'},
    { buttonValue : '.',
      buttonValueShift : '>',
      showShiftValue : true,
      buttonId : 'period_greaterthan'},
    { buttonValue : '/',
      buttonValueShift : '?',
      showShiftValue : true,
      buttonId : 'slash_questionmark'},
    { buttonValue : 'Shift',
      buttonCommand : function(keyboardElement, inputElement, inputValue) {
                  icaOnscreenKeyboard.toggleShiftStatus(keyboardElement);
                  return inputValue;
                },
      buttonId : 'right_shift'},
  ],
  // fifth row (spacebar)
  [
    { buttonValue : ' ',
      buttonId : 'space',
    }
  ]
];

icaOnscreenKeyboard.config.numeric = [
  [
    { buttonValue : '7',
      buttonId : 'numeric_7'},
    { buttonValue : '8',
      buttonId : 'numeric_8'},
    { buttonValue : '9',
      buttonId : 'numeric_9'},
  ],
  [
    { buttonValue : '4',
      buttonId : 'numeric_4'},
    { buttonValue : '5',
      buttonId : 'numeric_5'},
    { buttonValue : '6',
      buttonId : 'numeric_6'},
  ],
  [
    { buttonValue : '1',
      buttonId : 'numeric_1'},
    { buttonValue : '2',
      buttonId : 'numeric_2'},
    { buttonValue : '3',
      buttonId : 'numeric_3'},
  ],
  [
    { buttonValue : '<-',
      buttonId : 'numeric_backspace',
      buttonCommand: function(keyboardElement, inputElement, inputValue) {
                 if(! inputValue.length) {
                   return '';
                 };
                 if(inputValue.length == 1) {
                   return '';
                 };
                 inputValue = inputValue.substring(0, inputValue.length - 1);
                 return inputValue;
               },

    },
    { buttonValue : '.',
      buttonId : 'numeric_decimal'},
    { buttonValue : '0',
      buttonId : 'numeric_0'},
  ],


];

icaOnscreenKeyboard.config.numeric_no_decimal = [
  [
    { buttonValue : '7',
      buttonId : 'numeric_7'},
    { buttonValue : '8',
      buttonId : 'numeric_8'},
    { buttonValue : '9',
      buttonId : 'numeric_9'},
  ],
  [
    { buttonValue : '4',
      buttonId : 'numeric_4'},
    { buttonValue : '5',
      buttonId : 'numeric_5'},
    { buttonValue : '6',
      buttonId : 'numeric_6'},
  ],
  [
    { buttonValue : '1',
      buttonId : 'numeric_1'},
    { buttonValue : '2',
      buttonId : 'numeric_2'},
    { buttonValue : '3',
      buttonId : 'numeric_3'},
  ],
  [
    { buttonValue : '<-',
      buttonId : 'numeric_backspace',
      buttonCommand: function(keyboardElement, inputElement, inputValue) {
                 if(! inputValue.length) {
                   return '';
                 };
                 if(inputValue.length == 1) {
                   return '';
                 };
                 inputValue = inputValue.substring(0, inputValue.length - 1);
                 return inputValue;
               },

    },
    { buttonValue : '0',
      buttonId : 'numeric_0'},
    { buttonValue : '00',
      buttonId : 'numeric_00'},
  ],


];


// Presumably there is only one keyboard per page, so this works
icaOnscreenKeyboard.inputElement = null;

icaOnscreenKeyboard.setInputElement = function(inputElement) {
  icaOnscreenKeyboard.inputElement = inputElement;
};

icaOnscreenKeyboard.getInputElement = function() {
  return icaOnscreenKeyboard.inputElement;
};



icaOnscreenKeyboard.create = function(keyboardWrapper, inputElement, keyboardType, arrowNavigation) {
  if(! keyboardWrapper ) {
    return false;
  };

  if(inputElement) {
    icaOnscreenKeyboard.setInputElement(inputElement);
  };

  var keyboardTypeString = 'default';
  var keyboardConfig = icaOnscreenKeyboard.config.default;
  if(keyboardType) {
    if(icaOnscreenKeyboard.config[keyboardType]) {
      keyboardConfig = icaOnscreenKeyboard.config[keyboardType];
      keyboardTypeString = keyboardType;
    }
    else {
      keyboardConfig = keyboardType;
    };
  };

  var keyboardId = $(keyboardWrapper).attr('id');
  if(! keyboardId ) {
    keyboardId = 'ica_onscreen_keyboard_' + Math.floor(Math.random() * 100) + '_' + new Date().getTime();
  };
  for(rowNum = 0; rowNum < keyboardConfig.length ; rowNum++) {
    row = keyboardConfig[rowNum];
    rowId = keyboardId + '_' + rowNum;
    var rowElement = document.createElement("div");
    $(rowElement).addClass("ica-onscreen-keyboard-row");
    $(rowElement).addClass("ica-onscreen-keyboard-row-" + rowNum);

    var numButtonsOnRow = row.length;
    for(var buttonNum = 0; buttonNum < numButtonsOnRow ; buttonNum++) {
      var buttonConfig = row[buttonNum];
      $(rowElement).append(icaOnscreenKeyboard.createButton(keyboardWrapper, rowElement, buttonConfig));
    };
    $(keyboardWrapper).append(rowElement);
    $(keyboardWrapper).addClass('ica-onscreen-keyboard-keyboard-wrapper');
    $(keyboardWrapper).addClass('ica-onscreen-keyboard-keyboard-type-' + keyboardTypeString);
  };

  if(arrowNavigation) {
    icaOnscreenKeyboard.arrowNavigation.init()
  }


}

icaOnscreenKeyboard.createButton = function (keyboardWrapper, rowElement, buttonConfig) {
  var buttonId = buttonConfig.buttonId;
  var buttonValue = buttonConfig.buttonValue;
  var buttonValueShift = buttonConfig.buttonValueShift;
  var showShiftValue = buttonConfig.showShiftValue;
  var buttonCommand = buttonConfig.buttonCommand;

  var buttonElement = document.createElement("div");
  $(buttonElement).addClass("ica-onscreen-keyboard-button");
  $(buttonElement).addClass("ica-onscreen-keyboard-button-" + buttonId);

  if(buttonCommand) {
    $(buttonElement).click(function(event){
        var inputValue = '';
        var inputElement = icaOnscreenKeyboard.getInputElement();
        if(inputElement) {
          inputValue = $(inputElement).val();
          inputValue = buttonCommand(keyboardWrapper, inputElement, inputValue);
          $(inputElement).val(inputValue);
        };
      });
  }
  // not a button with a custom command.
  else {
    $(buttonElement).click(function(){
        var shiftStatus = $(keyboardWrapper).attr('icaOnscreenShiftStatus') * 1; // attributes are saved as strings
        var capsLockStatus = $(keyboardWrapper).attr('icaOnscreenCapslockStatus') * 1;

        var inputElement = icaOnscreenKeyboard.getInputElement();

        if(inputElement){
          inputElement = $(inputElement);
          if(shiftStatus) {
            inputElement.val(inputElement.val() + buttonValueShift);
          }
          else {
            inputElement.val(inputElement.val() + buttonValue);
          };
        };
        if(shiftStatus && (! capsLockStatus)) { // don't do this unnecessarily
          icaOnscreenKeyboard.toggleShiftStatus(keyboardWrapper);
        };

      });

  };

  $(buttonElement).attr('buttonValue', buttonValue);
  if(buttonValueShift != undefined) {
    $(buttonElement).attr('buttonValueShift', buttonValueShift);
  };

  var buttonInnerElement = document.createElement("div");
  $(buttonInnerElement).addClass("ica-onscreen-keyboard-button-inner");
  $(buttonInnerElement).addClass("ica-onscreen-keyboard-button-inner-" + buttonId);

  if((buttonValueShift == undefined) || (showShiftValue == undefined)) {
    $(buttonInnerElement).append("<div class=\"ica-onscreen-keyboard-button-display-full\">" + buttonValue + "</div>");
  }
  else {
    $(buttonInnerElement).append("<div class=\"ica-onscreen-keyboard-button-display-top\">" + buttonValueShift + "</div>");
    $(buttonInnerElement).append("<div class=\"ica-onscreen-keyboard-button-display-bottom\">" + buttonValue + "</div>");
  };

  $(buttonElement).append(buttonInnerElement);


  return buttonElement;

}


icaOnscreenKeyboard.toggleShiftStatus = function(keyboardWrapper) {
  var shiftStatus = false;
  if($(keyboardWrapper).attr('icaOnscreenShiftStatus')) {
    shiftStatus = $(keyboardWrapper).attr('icaOnscreenShiftStatus') * 1;
    // * 1 because jquery saves all values as a string
  };

  $(keyboardWrapper).find('.ica-onscreen-keyboard-button').each(function() {
      var buttonElement = $(this);
      var buttonValue = buttonElement.attr('buttonValue');
      var buttonValueShift = buttonElement.attr('buttonValueShift');
      if((! shiftStatus) && (buttonValueShift != undefined)) {
        buttonElement.find('.ica-onscreen-keyboard-button-display-full').each(function() {
          this.innerHTML = buttonValueShift;
          });
        buttonElement.find('.ica-onscreen-keyboard-button-display-top').each(function() {
          this.innerHTML = buttonValue;
          });
        buttonElement.find('.ica-onscreen-keyboard-button-display-bottom').each(function() {
          this.innerHTML = buttonValueShift;
          });

      };
      if(shiftStatus && (buttonValueShift != undefined)) {
        buttonElement.find('.ica-onscreen-keyboard-button-display-full').each(function() {
          this.innerHTML = buttonValue;
          });
        buttonElement.find('.ica-onscreen-keyboard-button-display-top').each(function() {
          this.innerHTML = buttonValueShift;
          });
        buttonElement.find('.ica-onscreen-keyboard-button-display-bottom').each(function() {
          this.innerHTML = buttonValue;
          });
      };

    });


  if(shiftStatus) {
    shiftStatus = $(keyboardWrapper).attr('icaOnscreenShiftStatus', 0);
  }
  else {
    shiftStatus = $(keyboardWrapper).attr('icaOnscreenShiftStatus', 1);
  };
}

icaOnscreenKeyboard.arrowNavigation = {

  // For a normal PC keyboard:
  keymap: {
    'left' : 37,
    'up' : 38,
    'right' : 39,
    'down' : 40,
    'return' : 13,
  },

  keymapReverse: {
  },

  // Move the current selection left, right, up or down
  moveSelection: function(direction) {

      var currentItem = $('.ica-onscreen-keyboard-button-active')[0];
      if(! currentItem) {
        return;
      }

      // Place all items into a simple grid.
      var grid = {};
      $('.ica-onscreen-keyboard-button').each(function(){
        var position = $(this).offset();
        if(! grid[position.top]) {
          grid[position.top] = {top: position.top, items: []};
        }
        grid[position.top].items[grid[position.top].items.length] = {top: position.top, left: position.left, item: this};
      });

      // Now create a sorted grid and attach information on grid position to
      // every item in the grid.
      sortedGrid = [];
      for(rowId in grid) {
        sortedGrid[sortedGrid.length] = grid[rowId];
      }
      grid = sortedGrid;
      grid.sort(function(a, b){
        return a.top - b.top;
      });
      var numRows = grid.length;
      for(var i = 0; i < numRows; i++) {
        grid[i].items.sort(function(a, b){
          return a.left - b.left;
        });
        var numItems = grid[i].items.length;
        for(var j = 0; j < numItems; j++) {
          $(grid[i].items[j].item).attr({'icaOnscreenKeyboardGridRow': i, 'icaOnscreenKeyboardGridColumn': j});
        }
      }

      var currentRow = $(currentItem).attr('icaOnscreenKeyboardGridRow') * 1;
      var currentColumn = $(currentItem).attr('icaOnscreenKeyboardGridColumn') * 1;

      var newRow = currentRow;
      var newColumn = currentColumn;
      if(direction == 'left') {
        newColumn = newColumn - 1;
      }
      if(direction == 'right') {
        newColumn = newColumn + 1;
      }
      if(direction == 'up') {
        newRow = newRow - 1;
      }
      if(direction == 'down') {
        newRow = newRow + 1;
      }
      if(newRow < 0) {
        newRow = 0;
      }
      if(newRow > numRows - 1) {
        newRow = numRows - 1;
      }
      if(newColumn < 0) {
        newColumn = 0;
      }
      if(newColumn > grid[newRow].items.length - 1) {
        newColumn = grid[newRow].items.length - 1;
      }

      var newItem = currentItem;
      var newRowRow = grid[newRow];
      if(grid[newRow]) {
        if(grid[newRow].items[newColumn]) {
          newItem = grid[newRow].items[newColumn].item;
        }
        else {
          newItem = grid[newRow].items[grid[newRow].items.length].item;
        }
      }

      $(currentItem).removeClass('ica-onscreen-keyboard-button-active');
      $(newItem).addClass('ica-onscreen-keyboard-button-active');





    },


  captureKeyboardInputListener: function(event) {
    var symbolicKeyCode = icaOnscreenKeyboard.arrowNavigation.keymapReverse[event.which];
    if(! symbolicKeyCode) {
      return;
    }
    event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();

    if(symbolicKeyCode == 'return') {
      var activeButton = $('.ica-onscreen-keyboard-button-active')[0];
      if(! activeButton) {
        return;
      }
      $(activeButton).trigger('click');
      return;
    }

    icaOnscreenKeyboard.arrowNavigation.moveSelection(symbolicKeyCode);

  },

  init: function() {

    // A reverse keymap makes for easier code elsewhere.
    for(symbolicKeycode in icaOnscreenKeyboard.arrowNavigation.keymap) {
      var realKeyCode = icaOnscreenKeyboard.arrowNavigation.keymap[symbolicKeycode];
      icaOnscreenKeyboard.arrowNavigation.keymapReverse[realKeyCode] = symbolicKeycode;
    }

    $(document).keydown(icaOnscreenKeyboard.arrowNavigation.captureKeyboardInputListener);
    if(! $('.ica-onscreen-keyboard-button-active')[0]){
      $('.ica-onscreen-keyboard-button-return').addClass('ica-onscreen-keyboard-button-active');
    };
  }
}
