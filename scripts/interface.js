//Selecionando o main para mudanças com inner.html
const pageContent = document.querySelector('main')

//funções para antes de começar o jogo
const PreGameFunctions = {
  newGameAction() {
    ButtonHomePage.showButtonHome()
    pageContent.innerHTML = ''
    pageContent.innerHTML = newGame
  },
  startGame() {
    ModalLoadGame.close()
    ButtonHomePage.showButtonHome()
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

    GameFunctions.selectSquares()
  }
}

//Selecionando o tipo de jogo
const GameMode = {
  versusComputer() {
    localStorage.setItem('nome1', 'Player1')
    localStorage.setItem('nome2', 'Bot')
    localStorage.setItem('score1', scorePlayer1)
    localStorage.setItem('score2', scorePlayer2)
    versusComputer = true
    PreGameFunctions.startGame()
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

// Funções do jogo em si
const GameFunctions = {
  selectSquares() {
    let squares = document.querySelectorAll('.square')

    squares.forEach(square => {
      square.addEventListener('click', GameFunctions.handleClick)
    })
  },

  handleClick(event) {
    let position

    if (!versusComputer || playerTime == 0) {
      position = event.target.id
    } else if (versusComputer && playerTime == 1) {
      position = ComputerPlayer.computerPlay()
    }

    // Descobrindo quem ganhou o jogo para colocar no modal
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
        Modals.openModalEndGame(winner)

        if (playerTime === 0) {
          scorePlayer1 = localStorage.getItem('score1')
          scorePlayer1++
          localStorage.setItem('score1', scorePlayer1)
        } else {
          scorePlayer2 = localStorage.getItem('score2')
          scorePlayer2++
          localStorage.setItem('score2', scorePlayer2)
        }

        Updates.updateScoreBoard()
      }, 300)
    } else if (Verifications.isTie()) {
      //se isTie for true
      setTimeout(() => {
        Modals.openModalEndGameTie()
      }, 20)
    } else {
      //Se isTie e isWin for false
      if (versusComputer && playerTime === 1) {
        setTimeout(GameFunctions.handleClick, 300)
      }
    }

    Updates.updateSquare(position)

    Updates.whoPlays()
  }
}

//Funções utilizadas para updates gerais na pagina
const Updates = {
  updateSquare(position) {
    let square = document.getElementById(position.toString())

    let symbol = board[position]
    //Corrigindo um erro que aparecia ao clicar em um square com simbolo
    if (square != null) {
      square.innerHTML = `<i class='icon-${symbol}'></i>`
    }
  },

  updateSquares() {
    let squares = document.querySelectorAll('.square')

    squares.forEach(square => {
      let position = square.id

      if (versusComputer == false || playerTime === 0) {
        position = square.id
      } else if (versusComputer == true && playerTime === 1) {
        position = ComputerPlayer.computerPlay()
      }

      let symbol = board[position]

      if (symbol != '') {
        square.innerHTML = `<i class='icon-${symbol}'></i>`
      }
    })
  },

  updateScoreBoard() {
    scorePlayer1 = localStorage.getItem('score1')
    scorePlayer2 = localStorage.getItem('score2')

    const scoreboardNumber1 = document.querySelector('.scoreBoardNumber1')
    const scoreboardNumber2 = document.querySelector('.scoreBoardNumber2')

    scoreboardNumber1.innerHTML = ''
    scoreboardNumber1.innerHTML = `${scorePlayer1}`

    scoreboardNumber2.innerHTML = ''
    scoreboardNumber2.innerHTML = `${scorePlayer2}`
  },

  whoPlays() {
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
  },
  updateName1(element) {
    let valor = element.value
    localStorage.setItem('nome1', valor)
  },

  updateName2(element) {
    let valor = element.value
    localStorage.setItem('nome2', valor)
  }
}

//Funções relacionadas a modais abertos na página
const Modals = {
  openModalEndGame(winner) {
    document.querySelector('.modal-endgame-overlay').classList.add('show')

    const text = document.querySelector('.text-modal-endgame')

    text.innerHTML = ` <h2> O Jogo Acabou - O vencedor foi: ${winner} </h2>`
  },

  closeModalEndGame() {
    document.querySelector('.modal-endgame-overlay').classList.remove('show')
  },

  openModalEndGameTie() {
    document.querySelector('.modal-endgame-overlay').classList.add('show')

    const text = document.querySelector('.text-modal-endgame')

    text.innerHTML = ` <h2> O Jogo Acabou - Empate </h2>`
  }
}

//Funções especificias ao modal de LoadGame
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

//Funções para o botão voltar pra home page
const ButtonHomePage = {
  showButtonHome() {
    const buttonHome = document.querySelector('.back-to-home')
    buttonHome.classList.add('show')
  },
  clickButtonHome() {
    document.location.reload()
  }
}
