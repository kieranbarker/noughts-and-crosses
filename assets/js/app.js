;(function () {

  "use strict";

  //
  // Variables
  //

  // Create the Reef component
  var app = new Reef("#app", {
    template: createBoard
  });


  //
  // Functions
  //

  /**
   * Create a square
   * @returns {String} An HTML string
   */
  function createSquare () {
    return (
      "<td>" +
        "<button type='button'></button>" +
      "</td>"
    );
  }

  /**
   * Create a row of three squares
   * @returns {String} An HTML string
   */
  function createRow () {
    var html = "<tr>";
    for (var i = 1; i <= 3; i++) {
      html += createSquare();
    }
    html += "</tr>";
    return html;
  }

  /**
   * Create three rows of three squares
   * @returns {String} An HTML string
   */
  function createBoard () {
    var html = "<table>";
    for (var i = 1; i <= 3; i++) {
      html += createRow();
    }
    html += "</table>";
    return html;
  }


  //
  // Inits & Event Listeners
  //

  // Initialize the app
  app.render();

})();