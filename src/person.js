export default class Person {
  constructor({ id, vehicles, kmTraveled, from, to }) {

    this.id = id
    this.vehicles = vehicles
    this.kmTraveled = kmTraveled
    this.from = from
    this.to = to

  }

  formatted(language) {

    const mapDate = (date) => {
      const [year, month, day] = date.split('-').map(Number)

      return new Date(year, (month - 1), day) ///as Datas no JS começam no zero, por isso o month-1
    }

    return {
      id: Number(this.id),
      vehicles: new Intl /// Intl funciona o browser também, não é só no NodeJS | Intl é a api de internacionalização
        .ListFormat(language, { style: "long", type: "conjunction" }) /// estilo da nossa lista será uma lista de conjuntos, temos 3 itens, ele irá imprimir: Carro, Bicileta e Caminhão. O 'e', irá mudar de acordo com o idioma passado
        .format(this.vehicles),
      kmTraveled: new Intl
        .NumberFormat(language, { style: "unit", unit: "kilometer" })
        .format(this.kmTraveled),
      from: new Intl
        .DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric" })
        .format(mapDate(this.from)),
      to: new Intl
        .DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric" })
        .format(mapDate(this.to)),

    }
  }

  static generateInstanceFromString(text) {
    const EMPTY_SPACE = ' '
    const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)
    const person = new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(',')
    })

    return person
  }

}