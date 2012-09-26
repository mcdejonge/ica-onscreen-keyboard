Installation
------------

Just place the css, js and img directories sowhere in the root of your website
directory.

Usage
-----

Simple example: create an HTML element to hold the keyboard and an input element
where the keyboard output should be sent. Then call the create method of the 
icaOnscreenKeyboard object, like so:

    var keyboardWrapper = document.getElementById("keyboard-wrapper");
    var inputElement = document.getElementById("searchterm");
    icaOnscreenKeyboard.create(keyboardWrapper, inputElement);

The result of this example is an on screen alphanumeric keyboard that appears in 
the html item with id "keyboard-wrapper". Its output is directed to the input 
element with id "searchterm".

If you want to use a number pad instead of an alphanumeric keyboard, supply
a third parameter to the icaOnscreenKeyboard.create method, namely 'numeric'.

Advanced usage
--------------

* Keyboards are laid out in arrays in which every item is a row of keys. A row
of keys is an array of objects with one or more of the following attributes:
    - **buttonId** : a unique id for the button
    - **buttonValue** : the value that is sent to the input element when the button
   is pressed
    - **buttonValueShift** : the value that is sent to the input element when the
   button is pressed while the shift key is active
    - **showShiftValue** : if true, the value of the buttonValueShift attribute is
   displayed on the button while the shift key is active
    - **buttonCommand** : a function that is executed when the button is pressed. 
It takes takes three parameters: keyboardElement (the keyboard HTML object 
itself), inputElement (the input element the keyboard is attached to and 
inputValue (the current value of the inputElement). A buttonCommand method 
should return the new value of the inputElement (this allows you to create 
things like backspace buttons).
* You can assign a different input element to the onscreen keyboard on the fly.
For this use the setInputElement method of the icaOnscreenKeyboard object. This
method takes as its parameter the input element to which the output of the
keyboard should be directed.
* You can overrule what happens when a specific button is pressed. To do this,
locate the button in the keyboard config you want to work with. Then set its
buttonCommand method (see above). 
* It is possible to define additional keyboard layouts. For this, add a new array
of keyboard row definitions to the attribute 'config' of the 
icaOnscreenKeyboard object. The name of this array is the name you must supply as
the third parameter to the create method.
* If you supply a non-false fourth parameter to the create method of the
icaOnscreenKeyboard object, arrow key navigation will be activated, whereby users can
navigate to keys they want to press using arrow keys (we needed this functionality for
an application that ran on a TV screen without a full keyboard). 


