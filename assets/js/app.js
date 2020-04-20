;(function () {

  "use strict";

  //
  // Variables
  //

  // Create the Reef component
  var app = new Reef("#app", {
    data: {
      currentTurn: true, // true for X; false for O
      squares: ["", "", "", "", "", "", "", "", ""]
    },
    template: function (props) {
      return (
        "<table>" +
          props.squares.map(createSquare).join("") +
        "</table>"
      );
    }
  });


  //
  // Functions
  //

  /**
   * 
   * @param   {String} square The value of the square ("", "x", or "o")
   * @param   {Number} index  The index of the square
   * @returns {String}        An HTML string for the square
   */
  function createSquare (square, index) {

    // Store the HTML string
    var html = "";

    // If start of row, open <tr>
    if (index % 3 === 0) {
      html += "<tr>"
    }

    // Add square
    html += "<td><button type='button' data-square='" + index + "'>" + square + "</button></td>";

    // If end of row, close </tr>
    if ((index + 1) % 3 === 0) {
      html += "</tr>"
    }

    // Return the HTML string
    return html;

  }


  //
  // Inits & Event Listeners
  //

  // Initialize the app
  Reef.debug(true);
  console.log(app);
  app.render();

})();