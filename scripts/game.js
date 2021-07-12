// iniciar minhas variáveis
let board = ['', '', '', '', '', '', '', '', '']
let playerTime = 0
let firstPlayer = 0
let symbols = ['o', 'x']
let gameOver = false
let tie = false

let versusComputer = false

let scorePlayer1 = 0

let scorePlayer2 = 0

let winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function handleMove(position) {
  if (gameOver || tie) {
    return
  }

  if (board[position] == '') {
    board[position] = symbols[playerTime]

    gameOver = Verifications.isWin()

    if (gameOver == false) {
      playerTime = playerTime == 0 ? 1 : 0
    }
  }

  return gameOver
}

//Verificações de empate e vitoria
const Verifications = {
  isWin() {
    for (let i = 0; i < winStates.length; i++) {
      let seq = winStates[i]

      let pos1 = seq[0]
      let pos2 = seq[1]
      let pos3 = seq[2]

      if (
        board[pos1] == board[pos2] &&
        board[pos1] == board[pos3] &&
        board[pos1] != ''
      ) {
        return true
      }
    }

    return false
  },

  isTie() {
    if (tie) {
      return
    }

    for (let i = 0; i < board.length; i++) {
      if (board[i] == '' || gameOver) {
        return false
      }
    }

    return true
  }
}

//Funções para resetar o jogo
const Restart = {
  resetGame() {
    board = ['', '', '', '', '', '', '', '', '']

    firstPlayer = firstPlayer == 0 ? 1 : 0 //o primeiro player será alternado

    playerTime = firstPlayer

    simbols = ['o', 'x']
    tie = false
    gameOver = false

    Updates.whoPlays()

    Restart.restart()

    Modals.closeModalEndGame()

    // Para o computador jogar caso seja o player1:
    if (versusComputer && playerTime === 1) {
      setTimeout(GameFunctions.handleClick, 500)
    }
  },

  restart() {
    let squares = document.querySelectorAll('.square')

    squares.forEach(square => {
      let position = square.id
      let symbol = ' '

      square.innerHTML = `<div class='icon-${symbol}'></div>`
    })
  }
}

//Funções para o computador jogar
const ComputerPlayer = {
  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  },

  computerPlay() {
    let position = ComputerPlayer.getRandom(0, 8)

    while (
      Verifications.isWin() == false &&
      Verifications.isTie() == false &&
      board[position] !== ''
    ) {
      position = ComputerPlayer.getRandom(0, 8)
    }

    return position
  }
}
