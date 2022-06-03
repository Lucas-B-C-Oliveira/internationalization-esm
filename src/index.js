
import database from './../database.json'
import Person from './person.js'

import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ":q"
const MINIMUM_LENGTH = 30

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process finished!')
      return
    }


    /// "2 Bike 2 2000-03-04 2002-05-04"
    /// ['2', 'bike', '2', '2000-03-04', '2002-05-04']

    const EMPTY_SPACE = ' '
    const organizedData = answer.split(EMPTY_SPACE)

    if (MINIMUM_LENGTH > answer.length || organizedData.length < 5) {
      console.log('Não há dados suficientes para preencher a tabela')
      return mainLoop()
    }


    const person = Person.generateInstanceFromString(answer)
    console.log('person', person.formatted(DEFAULT_LANG))

    return mainLoop()

  } catch (error) {
    console.error('DEU RUIM**', error)
    return mainLoop()
  }
}

await mainLoop()
