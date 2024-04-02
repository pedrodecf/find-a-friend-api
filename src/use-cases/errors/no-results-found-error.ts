export class NoResultsFoundError extends Error {
  constructor() {
    super('Nenhum resultado para sua busca foi encontrado.')
  }
}
