import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { makeOrg } from '../../tests/factories/make-org'
import { makePet } from '../../tests/factories/make-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const org = await orgsRepository.create(makeOrg())

    const newPet = await petsRepository.create(makePet({ org_id: org.id }))

    const { pet } = await sut.execute({
      id: newPet.id,
    })

    expect(pet).toEqual(newPet)
  })

  it('should not be able to get pet details', async () => {
    await expect(() =>
      sut.execute({
        id: 'ineixsting-pet-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
}) //
