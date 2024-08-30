export class MeasureAlreadyExistsError extends Error {
  constructor() {
    super('Leitura do mês já realizada')
  }
}
