/*Selecionando o main*/

const pageContent = document.querySelector('main')

//clicando em novo jogo

const newGameAction = function () {
  pageContent.innerHTML = ''
  pageContent.innerHTML = newGame
}

const GameMode = {
  versusComputer() {},
  versusPlayer() {
    const openNewPlayers = document.querySelector('.player-names')
    openNewPlayers.innerHTML = playerNames
  }
}

const startGame = function () {
  const Form = {
    player1: document.querySelector('#player1'),
    player2: document.querySelector('#player2'),

    getValues() {
      return {
        player1: Form.player1.value,
        player2: Form.player2.value
      }
    }
  }

  const { player1, player2 } = Form.getValues()

  const SetStorage = {
    name1: localStorage.setItem('name1', player1),
    name2: localStorage.setItem('name2', player2)
  }
  pageContent.innerHTML = ''
  pageContent.innerHTML = gameWindow
  const namePlayers = document.querySelector('.scoreboard')

  const GetStorage = {
    name1: localStorage.getItem('name1'),
    name2: localStorage.getItem('name2')
  }

  namePlayers.innerHTML = `


  <div class="scoreplayer1">
  <i class="icon-o"></i>
  <p>${GetStorage.name1}: <span>aguarde</span></p>
  </div>
  
  <div class="scoreplayer2">
  <i class="icon-x"></i>
  <p>${GetStorage.name2}: <span>aguarde</span>
    </p>
  </div>
  `

  selectSquares()
}

//clicando em carregar jogo

const ModalLoadGame = {
  open() {
    document.querySelector('.modal-carregar-overlay').classList.add('show')
  },

  close() {
    document.querySelector('.modal-carregar-overlay').classList.remove('show')
  }
}

// Game

let selectSquares = function () {
  let squares = document.querySelectorAll('.square')

  squares.forEach(square => {
    square.addEventListener('click', handleClick)
  })
}

function handleClick(event) {
  let square = event.target
  let position = square.id

  if (handleMove(position)) {
    setTimeout(() => {
      alert(' O Jogo Acabou - O Vencedor foi ' + playerTime)
    }, 10)
  }
  updateSquare(position)
}

function updateSquare(position) {
  let square = document.getElementById(position.toString())
  let symbol = board[position]
  square.innerHTML = `<i class='icon-${symbol}'></i>`
}

function updateSquares() {
  let squares = document.querySelectorAll('.square')

  squares.forEach(square => {
    let position = square.id
    let symbol = board[position]

    if (symbol != '') {
      square.innerHTML = `<i class='icon-${symbol}'></i>`
    }
  })
}
