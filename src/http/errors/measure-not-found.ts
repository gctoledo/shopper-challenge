export class MeasureNotFoundError extends Error {
  constructor() {
    super('Leitura do mês já realizada')
  }
}
