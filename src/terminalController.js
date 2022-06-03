
import readline from 'readline' /// Para obtermos o input do usuário via terminal
import Person from './person.js'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'



export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}

  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin) /// Adiciona um listener no terminal para o sistema receber os comandos
    this.terminal = readline.createInterface({
      input: process.stdin, /// stdin é o terminal propriamente dito
      output: process.stdout /// terminal tbm
    })

    this.initializeTable(database, language)

  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), data)

    this.print = console.draft(table)
    this.data = data

  }

  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") }, ///chalk irá imprimir na tela o que está entre parenteses na cor de nome da função, no caso cyan
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
      ]
    }

  }
}