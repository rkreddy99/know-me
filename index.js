const readlineSync = require('readline-sync')
const fs = require('fs')
const chalk = require('chalk')

const highScore = parseInt(fs.readFileSync('./highScore.txt',{encoding:'utf8', flag:'r'}))
score = 0
levelZeroQues = 4
var questionAns = [
  {
    q:"What is my name?",
    a:"Rama Krishna Reddy"
  },
  {
    q:"Where do I live?",
    a:"Hyderabad"
  },
  {
    q:"Who is my favorite hero?",
    a:"Prabhas",
  },
  {
    q:"What is my favorite dish?",
    a:"Chicken Biryani"
  },
  {
    q:"What do I aspire to become?",
    a:"Software Developer"
  },
  {
    q:"What am I currently preparing for?",
    a:"neog level1 camp"
  },
  {
    q:"What is my favorite place?",
    a:"Village",
  },
]

function welcome(){
  var name = readlineSync.question("Hello there! What's your name?\n")
  console.log(`\nHey ${name}, Welcome to RK's quiz show!!!`)
  console.log("\n-----*******-----")
  console.log(chalk.bold("Here are the RULES:"))
  console.log("\n - There will be two rounds.")
  console.log("\n - You should have atleast 3 marks at the end of first round to qualify for second.")
  console.log("\n - If you answer correctly you will receive one point.")
  console.log("\n - If it is wrong one mark will be DEDUCTED.") 
  console.log("\n - If you don't know the answer and don't want to get the marks deducted write IDK.")
  console.log("-----*******-----\n")
}

function playRound(question, answer) {
  var ans = readlineSync.question(question+"\n")
  if (ans.toLowerCase() === answer.toLowerCase()) {
    score += 1
    console.log(chalk.green("right! 😄"))
  } else if (ans.toLowerCase() !== "idk"){
    score -= 1
    console.log(chalk.red("wrong! 😔"))
  } else if (ans.toLowerCase() === "idk"){
    console.log(chalk.orange("no answer given! 😐"))
  }
  console.log("Your score is :", score)
  console.log("-----*******-----\n")
}

// welcome the player
welcome()

// start the game
console.log(chalk.yellow("ROUND 1"))
for (let i=0; i<questionAns.length; i++) {
  playRound(questionAns[i].q, questionAns[i].a)
  if (i==levelZeroQues-1) {
    if (score<3){
      console.log("As your score is less than 3 you can't be promoted for next level! 🤕")
      break
    } else {
      console.log("Congrats! You are up for next level 😁")
      console.log(chalk.yellow("ROUND 2"))
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