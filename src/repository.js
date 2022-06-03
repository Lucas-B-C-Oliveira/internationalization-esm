import { writeFile, readFile } from 'fs/promises'

export const save = async (data) => {
  //! Não tem __filename, __dirname nem require

  const { pathname: databaseFile } = new URL('./../database.json', import.meta.url)
  const currentData = JSON.parse((await readFile(pathname)))
  currentData.push(data)

  await writeFile(databaseFile, JSON.stringify(currentData))

}