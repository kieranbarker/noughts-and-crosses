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

  // Get an immutable clone of the initial data
  // (for resetting the board later on)
  var data = app.getData();


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
   * Check if this is a winning combination of squares
   * @param   {Object} data        The current state/data
   * @param   {Array}  combination The combination of square indices
   * @returns {Boolean}            True if winning combination; false otherwise
   */
  function isWinningCombination (data, combination) {

    // Get the squares for this combination
    var squares = [data.squares[combination[0]], data.squares[combination[1]], data.squares[combination[2]]];

    // Make sure all squares have the same value
    var allSameValue = (squares[0] === squares[1]) && (squares[0] === squares[2]);

    // Return true if squares are all claimed and all same value
    return squares.every(isClaimed) && allSameValue;

  }

  /**
   * Check whether or not there's a winner
   * @param   {Object} data The current state/data
   * @returns {Boolean}     True if there's a winner; false otherwise
   */
  function isWinner (data) {

    // Winning combinations of square indices
    var possibleWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Get the winning combination
    var win = possibleWins.filter(function (combination) {
      return isWinningCombination(data, combination);
    });

    // Return true if there is a winning combination
    return win.length > 0;

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

    // If there's a winner, end the game
    if (isWinner(data)) {
      data.winner = data.currentTurn ? "X" : "O";
      return app.setData(data);
    }

    // Change current player
    data.currentTurn = !data.currentTurn;

    // Update the state
    app.setData(data);

  }

  /**
   * Reset the board to its initial state
   * @param {Object} event The Event object 
   */
  function resetBoard (event) {

    // Bail if anything other than "Play Again" was clicked
    if (!event.target.hasAttribute("data-reset")) return;

    // Reset the data
    app.setData(data);

  }

  /**
   * Handle click events
   * @param {Object} event The Event object 
   */
  function clickHandler (event) {

    // Take turns when squares are clicked
    takeTurn(event);

    // Reset the board when "Play Again" is clicked
    resetBoard(event);

  }


  //
  // Inits & Event Listeners
  //

  // Initialize the app
  app.render();

  // Handle click events
  document.body.addEventListener("click", clickHandler);

})();