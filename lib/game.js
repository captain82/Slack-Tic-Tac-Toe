const constants = require('../constants')

class Game {

    constructor(boardSize, player1Id, player2Id) {
        this._boardSize = boardSize;
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        this._curPlayerIsP1 = true;
        this._board = this.initBoard(boardSize);
        this._availableSpots = new Array(boardSize * boardSize).fill(true);
    }

    _initBoard(size) {
        return [...new Array(size)].map((d, row) => {
            return [...new Array(size)].map((d, col) => {
                let position = this._mapCoordstoMove(row, col);
                return constants.boardSymbolMap[position.toString()];
            });
        });
    }

    _mapCoordstoMove(row, col) {
        return (row * this._boardSize) + col + 1;
    }

    _mapMovetoCoords(position) {
        const col = (position - 1) % this._boardSize;
        const row = (position - 1 - col) / this._boardSize;
        return [row, col];
    }

    validMove(position) {
        if (position < 1 || position > this._availableSpots.length) {
            return false;
        }
        return this._availableSpots[position - 1];
    }

    validPlayer(userId) {
        if (userId !== this.player1Id && userId !== this.player2Id) {
            return false;
        } else {
            return true;
        }
    }

    toggleCurrentPlayer() {
        this._curPlayerIsP1 = !this._curPlayerIsP1;
    }

    getCurrentPlayer() {
        if (this._curPlayerIsP1) {
            return this.player1Id;
        } else {
            return this.player2Id;
        }
    }

    getCurrentPlayerSymbol() {
        if (this._curPlayerIsP1) {
            return constants.P1SYMBOL;
        } else {
            return constants.P2SYMBOL;
        }
    }

    addMove(position) {
        const [row, col] = this._mapMovetoCoords(position);
        if (this._curPlayerIsP1) {
            this._board[row][col] = constants.P1SYMBOL;
        } else {
            this._board[row][col] = constants.P2SYMBOL;
        }
        this._availableSpots[position - 1] = false
    }

    isWinner() {
        return this._horizontalWinner() || this._verticalWinner() || this._diagonalWinner();
    }

    isBoardFull() {
        for (let row = 0; row < this._boardSize; row++) {
            for (let col = 0; col < this._boardSize; col++) {
                if (this._board[row][col] !== constants.P1SYMBOL &&
                    this._board[row][col] !== constants.P2SYMBOL) {
                    return false;
                }
            }
        }
        return true;
    }

    _horizontalWinner() {
        for (let row = 0; row < this._boardSize; row++) {
            if (this._board[row][0] === this._board[row][1] &&
                this._board[row][1] === this._board[row][2]) {
                return true;
            }
        }

        return false;
    }

    /**
    * @returns {Boolean}
    */
    _verticalWinner() {
        for (let col = 0; col < this._boardSize; col++) {
            if (this._board[0][col] === this._board[1][col] &&
                this._board[1][col] === this._board[2][col]) {
                return true;
            }
        }

        return false;
    }

    /**
    * @returns {Boolean}
    */
    _diagonalWinner() {
        if (this._board[0][0] === this._board[1][1] &&
            this._board[1][1] === this._board[2][2]) {
            return true;
        } else if (this._board[0][2] === this._board[1][1] &&
            this._board[1][1] === this._board[2][0]) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * @returns {String}
    */
}