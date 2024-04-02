import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ListPetsFromUniqueCityUseCase } from './list-pets-from-unique-city'
import { makeOrg } from '../../tests/factories/make-org'
import { makePet } from '../../tests/factories/make-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: ListPetsFromUniqueCityUseCase

describe('List Pets From Unique City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new ListPetsFromUniqueCityUseCase(petsRepository)
  })

  it('should be able to list pets from unique city', async () => {
    const firstOrg = await orgsRepository.create(makeOrg({ city: 'Cidade A' }))
    await petsRepository.create(
      makePet({ org_id: firstOrg.id, org_city: firstOrg.city, name: 'Gato 1' }),
    )

    const secondOrg = await orgsRepository.create(makeOrg({ city: 'Cidade B' }))
    await petsRepository.create(
      makePet({
        org_id: secondOrg.id,
        org_city: secondOrg.city,
        name: 'Gato 2',
      }),
    )

    const { pets } = await sut.execute({
      city: firstOrg.city,
    })

    expect(pets.length).toBe(1)
    expect(pets[0].name).toBe('Gato 1')
  })

  it('should not be able to list pets from unique city if city does not exist', async () => {
    await expect(
      sut.execute({
        city: 'Cidade Ainda Não Cadastrada',
      }),
    ).rejects.toThrowError(new ResourceNotFoundError())
  })
}) //
