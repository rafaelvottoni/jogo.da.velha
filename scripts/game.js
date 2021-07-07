// iniciar minhas variáveis
let board = ['', '', '', '', '', '', '', '', '']
let playerTime = 0
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

    gameOver = isWin()

    if (gameOver == false) {
      playerTime = playerTime == 0 ? 1 : 0
    }
  }

  return gameOver
}

function isWin() {
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
}

function isTie() {
  if (gameOver || tie) {
    return
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i] == '' || gameOver) {
      return false
    }
  }

  tie = true
  return true
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', '']
  playerTime = getRandom(0, 1) //Para variar quem começa jogando
  simbols = ['o', 'x']
  tie = false
  gameOver = false

  restart()
  closeModalEndGame()
  console.log('Estou aqui')
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// computer player

function computerPlay() {
  let position = getRandom(0, 8)

  while (isWin() === false && board[position] !== '') {
    position = getRandom(0, 8)
  }

  return position
}
