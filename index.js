const readlineSync = require('readline-sync')
const fs = require('fs')
const chalk = require('chalk')

const highScore = parseInt(fs.readFileSync('./highScore.txt',{encoding:'utf8', flag:'r'}))
score = 0
levelZeroQues = 5
levelOneQues = 3
levelTwoQues = 2
const quesAns = [{
q: "Harry Potter's parents",
a: "Hermoine and Ron",
b: "Voldemort and Lata",
c: "John and Louise",
d: "James and Lilly",
ans: "d"
},
{
q: "Name of Draco's dad",
a: "Lucius",
b: "Snape",
c: "Voldemort",
d: "Harry",
ans: "a"
},
{
q: "Name Ron's brother",
a: "Arthur",
b: "Tommy",
c: "John",
d: "George",
ans: "d"
},
{
q: "Name of Harry Potter's owl.",
a: "Hedwig",
b: "Hagrid",
c: "Buckbeak",
d: "Molly",
ans: "a"
},
{
q: "Which platform at Kings Cross Station do Hogwarts' pupils use to access the Hogwarts Express?",
a: "8 1/4",
b: "8 3/4",
c: "9 1/4",
d: "9 3/4",
ans: "d"
},
{
q: "Pick odd one out.",
a: "Godric",
b: "Helga",
c: "Rowena",
d: "Aragog",
ans: "d"
},
{
q: "Spell to open a door.",
a: "Alohomora",
b: "Opondormus",
c: "Doorokulos",
d: "Expecto oponum",
ans: "a"
},
{
q: "Harry Potter's first crush",
a: "Chang",
b: "Ching",
c: "Chong",
d: "Cheng",
ans: "a"
},
{
q: "Total number of Harry Potter books published.",
a: "7",
b: "8",
c: "10",
d: "11",
ans: "d"
},
{
q: "What is the most frequently used word in the Harry Potter books? One word answer.",
ans: "Harry",
},
]

function welcome(){
  var name = readlineSync.question("Hello there! What's your name?\n")
  console.log(`Hey ${name}, Welcome to PotterHead quiz show!!!`)
  console.log(chalk.bold("Here are the RULES:"))
  console.log("There will be 3 rounds. You should have atleast 3 marks at the end of first round to qualify for second and 6 at end of 2nd round to qualify for 3rd round")
  console.log("If you answer correctly you will receive one point, if it is wrong one mark will be DEDUCTED. If you don't know the answer and don't want to get the marks deducted write IDK.")
  console.log("-----*******-----\n")
}

function playRound(e) {
  console.log(`Q: ${e.q}\n`)
  if (e.a)
  {
    console.log(`a: ${e.a}\n`)
    console.log(`b: ${e.b}\n`)
    console.log(`c: ${e.c}\n`)
    console.log(`d: ${e.d}\n`)
  }
  var ans = readlineSync.question("Ans: ")
  if (ans.toLowerCase() === e.ans.toLowerCase()) {
    score += 1
    console.log(chalk.green("right! 😄"))
  } else if (ans.toLowerCase() !== "idk"){
    score -= 1
    console.log(chalk.red("wrong! 😔"))
  } else if (ans.toLowerCase() === "idk"){
    console.log(chalk.blue("no answer given! 😐"))
  }
  console.log("Your score is :", score)
  console.log("-----*******-----\n")
}

// welcome the player
welcome()

// start the game
console.log(chalk.yellow("ROUND 1"))
for (let i=0; i<quesAns.length; i++) {
  playRound(quesAns[i])
  if (i==levelZeroQues-1) {
    if (score<3){
      console.log("As your score is less than 3 you can't be promoted for next level! 🤕\n")
      break
    } else {
      console.log("Congrats! You are up for next level 😁\n")
      console.log(chalk.yellow("ROUND 2\n"))
    }
  }
  if (i==levelZeroQues+levelOneQues-1) {
    if (score<6){
      console.log("As your score is less than 6 you can't be promoted for next level! 🤕\n")
      break
    } else {
      console.log("Congrats! You are up for next level 😁\n")
      console.log(chalk.yellow("ROUND 3\n"))
    }
  }
}

// Congratulate the winner
console.log("Your final score is",score)
if (score > highScore) {
  console.log('Yay! You have beat the previous high score of', highScore, "🥳")
  fs.writeFileSync("./highScore.txt", score)
} else if (score === highScore) {
  console.log("You have equalled with the high score! Great. 🥳")
}