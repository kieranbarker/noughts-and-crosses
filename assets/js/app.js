;(function () {

  "use strict";

  //
  // Variables
  //

  // Create the Reef component
  var app = new Reef("#app", {
    data: {
      currentTurn: true, // true for X; false for O
      squares: ["", "", "", "", "", "", "", "", ""],
      winner: null
    },
    template: template
  });


  //
  // Functions
  //

  /**
   * Create a message that shows the winner
   * @param   {Object} props The current state/data
   * @returns {String} An HTML string
   */
  function createWinHTML (props) {

    return (
      "<h2>🎉 The winner is " + props.winner + "! 🎉</h2>" +
      "<button type='button' data-reset>Play Again</button>"
    );

  }

  /**
   * Check whether or not a square is claimed
   * @param   {String} square The square
   * @returns {Boolean}       True if claimed; false otherwise
   */
  function isClaimed (square) {
    return square !== "";
  }

  /**
   * Create a "it's a tie" message
   * @returns {String} An HTML string
   */
  function createTieHTML () {

    return (
      "<h2>It's a tie!</h2>" +
      "<button type='button' data-reset>Play Again</button>"
    );

  }

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
    html += (
      "<td><button type='button' data-square='" + index + "'" + (square ? "disabled" : "") + ">" +
        square +
      "</button></td>"
    );

    // If end of row, close </tr>
    if ((index + 1) % 3 === 0) {
      html += "</tr>"
    }

    // Return the HTML string
    return html;

  }

  function createBoardHTML (props) {

    return (
      "<p>Current turn: " + (props.currentTurn ? "X" : "O") + "</p>" +
      "<table>" +
        props.squares.map(createSquare).join("") +
      "</table>"
    );

  }

  /**
   * Update the UI based on the current state/data
   * @param   {Object} props The state/data
   * @returns {String}       An HTML string for the template
   */
  function template (props) {

    // If there's a winner, show who it is
    if (props.winner) return createWinHTML(props);

    // If every square is claimed, show that it's a tie
    if (props.squares.every(isClaimed)) return createTieHTML();

    // Show the board for normal play
    return createBoardHTML(props);

  }

  /**
   * Take the current player's turn
   * @param {Object} event The Event object
   */
  function takeTurn (event) {

    // Get the index of the clicked square
    var index = event.target.getAttribute("data-square");
    if (!index) return;

    // Get an immutable clone of the current state
    var data = app.getData();

    // Claim the square
    data.squares[index] = data.currentTurn ? "x" : "o";

    // Change current player
    data.currentTurn = !data.currentTurn;

    // Update the state
    app.setData(data);

  }


  //
  // Inits & Event Listeners
  //

  // Initialize the app
  Reef.debug(true);
  console.log(app);
  app.render();

  // Take turns when squares are clicked
  document.body.addEventListener("click", takeTurn);

})();