const newGame = ` 

<div class="container">
<header>
  <h1 class="logo">Jogo da Velh<i class="icon-hash"></i></h1>
</header>

<div class="buttons">
<button class="button computer" onclick="GameMode.versusComputer()">vs Computador</button>
<button class="button player" onclick="GameMode.versusPlayer()">vs Jogador</button>
</div>

<div class="player-names"></div>`

const playerNames = `

<div class="form">
    <input
      type="text"
      oninput="updateName1(this)"
      id="player1"
      name="player1"
      placeholder="Nome do Jogador 1"
      >
  
    <input
      type="text"
      oninput="updateName2(this)"
      id="player2"
      name="player2"
      placeholder="Nome do Jogador 2"
      
    />
    <button class="button" onclick="startGame()">Start</button>
    
  </div>
`

const gameWindow = `
<div class="container-grid">
<div class="stage">
  <div>
    <div class="square square0" id="0">
      
    </div>
    <div class="square square1" id="1">
      
    </div>
    <div class="square square2" id="2">
      
    </div>
  </div>
  <div>
    <div class="square square3" id="3">
      
    </div>
    <div class="square square4" id="4">
     
    </div>
    <div class="square square5" id="5">
      
    </div>
  </div>
  <div>
    <div class="square square6" id="6">
      
    </div>
    <div class="square square7" id="7">
      
    </div>
    <div class="square square8" id="8">
     
    </div>
  </div>
</div>
<div class="scoreboard">
  

</div>
</div>
`
