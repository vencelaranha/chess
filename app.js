var board = null;
var game = new Chess();

function onDragStart(source, piece, position, orientation) {
    // Do not pick up pieces if the game is over
    if (game.game_over()) return false;

    // Only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    // See if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for simplicity
    });

    // Illegal move
    if (move === null) return 'snapback';

    // Log the move
    console.log(game.history());

    // Check for checkmate or draw
    if (game.in_checkmate()) {
        alert('Checkmate!');
    } else if (game.in_draw()) {
        alert('Draw!');
    }
}

function onSnapEnd() {
    board.position(game.fen());
}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

board = Chessboard('board', config);
