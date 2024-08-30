export class MeasuresNotFoundError extends Error {
  constructor() {
    super('Nenhuma leitura encontrada')
  }
}
