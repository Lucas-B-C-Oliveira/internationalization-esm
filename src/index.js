import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline' /// Para obtermos o input do usuário via terminal

import database from './../database.json'
import Person from './person.js' /// no ECMAScript modules, obrigatoriamente precisamos passar a extensão do arquivo, quando estamos trabahlando com vários tipos de extensão, se estiver trabalhando só com arquivos js, não precisa passar a extensão nos imports 

DraftLog(console).addLineListener(process.stdin) /// Adiciona um listener no terminal para o sistema receber os comandos
const DEFAULT_LANG = 'pt-BR'

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") }, ///chalk irá imprimir na tela o que está entre parenteses na cor de nome da função, no caso cyan
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
    { field: "from", name: chalk.cyan("From") },
    { field: "to", name: chalk.cyan("To") },
  ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG))) /// Inicializando o chalkTable com as configurações e o database
const print = console.draft(table) /// inicializando o console.draft -> draft Substitui a instância global do console, na linha 7 instanciamos o DraftLog e ele injetou o draft pra gente

const terminal = readline.createInterface({
  input: process.stdin, /// stdin é o terminal propriamente dito
  output: process.stdout /// terminal tbm
})

// terminal.question('Qual é o seu nome?', msg => {
//   console.log('msg', msg.toString())
// })



