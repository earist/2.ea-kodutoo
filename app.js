/* TYPER */

let leaderboard
const TYPER = function () {
  if (TYPER.instance_) {
    return TYPER.instance_
  }
  TYPER.instance_ = this

  this.WIDTH = window.innerWidth
  this.HEIGHT = window.innerHeight
  this.canvas = null
  this.ctx = null

  this.words = []
  this.word = null
  this.wordMinLength = 5
  this.guessedWords = 0
  this.score = 0
  this.lives = 10
  this.timeLeft = timeValue
  this.time = this.timeLeft

  // this.init()
}

window.TYPER = TYPER

TYPER.prototype = {
  init: function () {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.ctx = this.canvas.getContext('2d')

    this.canvas.style.width = this.WIDTH + 'px'
    this.canvas.style.height = this.HEIGHT + 'px'

    this.canvas.width = this.WIDTH * 2
    this.canvas.height = this.HEIGHT * 2

    this.loadWords()

    // this.registerServiceWorker()
  },

  loadWords: function () {
    const xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.status === 0)) {
        const response = xmlhttp.responseText
        const wordsFromFile = response.split('\n')

        TYPER.instance_.words = structureArrayByWordLength(wordsFromFile)

        TYPER.instance_.start()
      }
    }

    xmlhttp.open('GET', './lemmad2013.txt', true)
    xmlhttp.send()
  },

  start: function () {
    this.generateWord()
    this.word.Draw()
    window.addEventListener('keypress', this.keyPressed.bind(this))
    gameTimer()
  },

  generateWord: function () {
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]
    console.log(timeValue)
    this.word = new Word(wordFromArray, this.canvas, this.ctx)
  },

  keyPressed: function (event) {
    const letter = String.fromCharCode(event.which)
    console.log(this.lives)

    if (letter === this.word.left.charAt(0)) {
      this.word.removeFirstLetter()
      this.score += 2

      if (this.word.left.length === 0) {
        this.guessedWords += 1
        if (this.guessedWords % 5 === 0) {
          this.score += 25
        }

        this.generateWord()
      }

      this.word.Draw()
    } else {
      this.lives -= 1
      this.score -= 1
      console.log(this.lives)

      if (this.lives === 0) {
        console.log('elud said otsa')
        endGame()
      }
    }
  }
}
/* Day-night */
function changeMode () {
  var body = document.getElementById('body')
  var currentClass = body.className
  body.className = currentClass === 'dark-mode' ? 'light-mode' : 'dark-mode'
  console.log(currentClass)
}

/* WORD */
const Word = function (word, canvas, ctx) {
  this.word = word
  this.left = this.word
  this.canvas = canvas
  this.ctx = ctx
}

Word.prototype = {
  Draw: function () {
    console.log('siin2')
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.textAlign = 'center'
    this.ctx.font = '140px Courier'
    this.ctx.fillStyle = '#BF7F7F'
    this.ctx.fillText(this.left, this.canvas.width / 2, this.canvas.height / 2)

    this.ctx.textAlign = 'right'
    this.ctx.font = '80px Courier'
    this.ctx.fillText('Skoor: ' + TYPER.instance_.score, this.canvas.width - 500, 100)

    this.drawTimer()
  },

  drawTimer: function () {
    this.ctx.clearRect(this.canvas.width - 450, 0, 450, this.canvas.height)
    this.ctx.textAlign = 'right'
    this.ctx.font = '80px Courier'
    this.ctx.fillText('Aeg: ' + TYPER.instance_.time, this.canvas.width - 50, 100)
  },

  removeFirstLetter: function () {
    this.left = this.left.slice(1)
  }

}

/* HELPERS */

function structureArrayByWordLength (words) {
  let tempArray = []

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length
    if (tempArray[wordLength] === undefined)tempArray[wordLength] = []

    tempArray[wordLength].push(words[i])
  }

  return tempArray
}

function gameTimer () {
  (function timer1 () {
    if (TYPER.instance_.time >= 0) {
      TYPER.instance_.word.drawTimer()
      TYPER.instance_.time -= 1
      setTimeout(timer1, 1000)
    } else {
      endGame()
    }
  })()
}

function endGame () {
  if (typeof (Storage) !== 'undefined') {
    let playersArr = localStorage.getItem('playersArr')
    let player = new Object()
    player.name = name
    player.score = TYPER.instance_.score < 0 ? 0 : TYPER.instance_.score
    if (playersArr === null) {
      playersArr = new Array()
      playersArr.push(player)
      console.log(playersArr)
      localStorage.setItem('playersArr', JSON.stringify(playersArr))
    } else {
      playersArr = JSON.parse(playersArr)
      playersArr.push(player)
      localStorage.setItem('playersArr', JSON.stringify(playersArr))
    }
  }

  window.location.reload()
  // MÄNGU LÕPP
}

/* START & NIMI  */
let name = ''
function startGameEasy () {
  if (document.querySelector('#nameField').value !== '') {
    name = document.querySelector('#nameField').value
    document.querySelector('body').innerHTML = '<canvas></canvas><button type="button" class="btn" name="night_mode" onclick="changeMode()" title="Switch mode">Day/night mode</button>'
    this.timeValue = 100
    console.log(timeValue)
    const typer = new TYPER()
    window.typer = typer
    typer.init()
  } else {
    alert('Palun sisesta mängimiseks oma nimi.')
  }
}

function startGameMedium () {
  if (document.querySelector('#nameField').value !== '') {
    name = document.querySelector('#nameField').value
    document.querySelector('body').innerHTML = '<canvas></canvas><button type="button" class="btn" name="night_mode" onclick="changeMode()" title="Switch mode">Day/night mode</button>'
    this.timeValue = 70
    const typer = new TYPER()
    window.typer = typer
    typer.init()
  } else {
    alert('Palun sisesta mängimiseks oma nimi.')
  }
}

function startGameHard () {
  if (document.querySelector('#nameField').value !== '') {
    name = document.querySelector('#nameField').value
    document.querySelector('body').innerHTML = '<canvas></canvas><button type="button" class="btn" name="night_mode" onclick="changeMode()" title="Switch mode">Day/night mode</button>'
    this.timeValue = 50
    const typer = new TYPER()
    window.typer = typer
    typer.init()
  } else {
    alert('Palun sisesta mängimiseks oma nimi.')
  }
}

function showHighScores () {
  let leaderboard = document.getElementById('leaderboard')
  leaderboard.classList.toggle('hidden')
}

/* HEADER efect */

document.addEventListener('DOMContentLoaded', function (event) {
  // array with texts to type in typewriter
  var dataText = ['SÕNAMÄNG']

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter (text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
      document.querySelector('h1').innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>'

      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback)
      }, 100)
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback === 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700)
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation (i) {
    if (typeof dataText[i] === 'undefined') {
      setTimeout(function () {
        StartTextAnimation(0)
      }, 20000)
    }
    // check if dataText[i] exists
    if (i < dataText.length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function () {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1)
      })
    }
  }

  function initScore () {
    if (typeof (Storage) !== 'undefined') {
      let playersArr = localStorage.getItem('playersArr')

      if (playersArr === null) {
        leaderboard.innerHTML = 'Ühtegi kirjet pole!'
      } else {
        playersArr = JSON.parse(playersArr)
        for (let item of playersArr) {
          leaderboard.innerHTML += '<tr>' +
										'<td>' + item.name + '</td>' +
										'<td>' + item.score + '</td>' +
									  '</tr>'
        }
      }
    } else {
      leaderboard.innerHTML = 'Teie lehitseja ei toeta skoori!'
    }
  }

  // start the text animation
  initScore()
  StartTextAnimation(0)
})
