/*Selecionando o main*/

const pageContent = document.querySelector('main')

//clicando em novo jogo

function newGameAction() {
  pageContent.innerHTML = ''
  pageContent.innerHTML = newGame
}

//Selecionando o modo de jogo

const GameMode = {
  versusComputer() {
    localStorage.setItem('nome1', 'Player1')
    localStorage.setItem('nome2', 'Bot')
    localStorage.setItem('score1', scorePlayer1)
    localStorage.setItem('score2', scorePlayer2)
    versusComputer = true
    startGame()
  },
  versusPlayer() {
    const openNewPlayers = document.querySelector('.player-names')
    openNewPlayers.innerHTML = playerNames
    localStorage.setItem('nome1', 'Player1')
    localStorage.setItem('nome2', 'Player2')
    localStorage.setItem('score1', scorePlayer1)
    localStorage.setItem('score2', scorePlayer2)
    versusComputer = false
  }
}

//Pegando os nomes do input

function updateName1(element) {
  let valor = element.value
  localStorage.setItem('nome1', valor)
}

function updateName2(element) {
  let valor = element.value
  localStorage.setItem('nome2', valor)
}

//Começando o jogo

function startGame() {
  ModalLoadGame.close()
  pageContent.innerHTML = ''
  pageContent.innerHTML = gameWindow

  const namePlayers = document.querySelector('.scoreboard')

  const PlayerNames = {
    name1: localStorage.getItem('nome1'),
    name2: localStorage.getItem('nome2')
  }

  const PlayerScores = {
    score1: localStorage.getItem('score1'),
    score2: localStorage.getItem('score2')
  }

  namePlayers.innerHTML = `


          <div class="scoreplayer1">
          <i class="icon-o"></i>
          <p>${PlayerNames.name1}: <span class="scoreBoardNumber1">${PlayerScores.score1}</span></p>
          </div>
          
          <div class="scoreplayer2">
          <i class="icon-x"></i>
          <p>${PlayerNames.name2}: <span class="scoreBoardNumber2">${PlayerScores.score2}</span>
            </p>
          </div>
          `

  selectSquares()
}

//clicando em carregar jogo

const ModalLoadGame = {
  open() {
    document.querySelector('.modal-carregar-overlay').classList.add('show')

    const loadName1 = localStorage.getItem('nome1')
    const loadName2 = localStorage.getItem('nome2')
    if (loadName2 == 'Bot') {
      versusComputer = true
    }
    const loadScore1 = localStorage.getItem('score1')
    const loadScore2 = localStorage.getItem('score2')
    const textLoadGame = document.querySelector('.text-load-game')
    textLoadGame.innerHTML = `${loadName1} (${loadScore1}) x (${loadScore2}) ${loadName2}`
  },

  close() {
    document.querySelector('.modal-carregar-overlay').classList.remove('show')
  }
}

// Game

function selectSquares() {
  let squares = document.querySelectorAll('.square')

  squares.forEach(square => {
    square.addEventListener('click', handleClick)
  })
}

function handleClick(event) {
  let position

  if (versusComputer === false || playerTime === 0) {
    position = event.target.id
  } else if (versusComputer === true && playerTime === 1) {
    position = computerPlay()
  }

  // Vendo que ganhou o jogo para colocar no modal
  let winner

  if (playerTime === 0) {
    winner = localStorage.getItem('nome1')
  } else {
    winner = localStorage.getItem('nome2')
  }

  //Executando função se o computador for o primeiro a jogar:

  if (handleMove(position)) {
    setTimeout(() => {
      //se isWin for true
      openModalEndGame(winner)

      if (playerTime === 0) {
        scorePlayer1 = localStorage.getItem('score1')
        scorePlayer1++
        localStorage.setItem('score1', scorePlayer1)
      } else {
        scorePlayer2 = localStorage.getItem('score2')
        scorePlayer2++
        localStorage.setItem('score2', scorePlayer2)
      }

      updateScoreBoard()
    }, 300)
  } else if (isTie()) {
    //se isTie for true
    setTimeout(() => {
      openModalEndGameTie()
    }, 20)
  } else {
    //Se isTie e isWin for false
    if (versusComputer && playerTime === 1) {
      setTimeout(handleClick, 300)
    }
  }

  updateSquare(position)

  whoPlays()
}

function updateSquare(position) {
  let square = document.getElementById(position.toString())

  let symbol = board[position]
  //Corrigindo um erro que aparecia ao clicar em um square com simbolo
  if (square != null) {
    square.innerHTML = `<i class='icon-${symbol}'></i>`
  }
}

function updateSquares() {
  let squares = document.querySelectorAll('.square')

  squares.forEach(square => {
    let position = square.id

    if (versusComputer == false || playerTime === 0) {
      position = square.id
    } else if (versusComputer == true && playerTime === 1) {
      position = computerPlay()
    }

    let symbol = board[position]

    if (symbol != '') {
      square.innerHTML = `<i class='icon-${symbol}'></i>`
    }
  })
}

// Atualizando Placar

function updateScoreBoard() {
  scorePlayer1 = localStorage.getItem('score1')
  scorePlayer2 = localStorage.getItem('score2')

  const scoreboardNumber1 = document.querySelector('.scoreBoardNumber1')
  const scoreboardNumber2 = document.querySelector('.scoreBoardNumber2')

  scoreboardNumber1.innerHTML = ''
  scoreboardNumber1.innerHTML = `${scorePlayer1}`

  scoreboardNumber2.innerHTML = ''
  scoreboardNumber2.innerHTML = `${scorePlayer2}`
}

//Restart e fim de jogos

function openModalEndGame(winner) {
  document.querySelector('.modal-endgame-overlay').classList.add('show')

  const text = document.querySelector('.text-modal-endgame')

  text.innerHTML = ` <h2> O Jogo Acabou - O vencedor foi: ${winner} </h2>`
}

function closeModalEndGame() {
  document.querySelector('.modal-endgame-overlay').classList.remove('show')
}

function openModalEndGameTie() {
  document.querySelector('.modal-endgame-overlay').classList.add('show')

  const text = document.querySelector('.text-modal-endgame')

  text.innerHTML = ` <h2> O Jogo Acabou - Empate </h2>`
}

function whoPlays() {
  let playerTurn
  let notPlayerTurn

  if (playerTime === 0) {
    playerTurn = document.querySelector('.scoreplayer1')
    playerTurn.style.borderLeft = '0.2px solid var(--yellow)'
    notPlayerTurn = document.querySelector('.scoreplayer2')
    notPlayerTurn.style.borderLeft = 'none'
  } else {
    playerTurn = document.querySelector('.scoreplayer2')
    playerTurn.style.borderLeft = '0.2px solid var(--yellow)'
    notPlayerTurn = document.querySelector('.scoreplayer1')
    notPlayerTurn.style.borderLeft = 'none'
  }
}
