import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { RegisterAPetUseCase } from './register-a-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeOrg } from '../../tests/factories/make-org'
import { makePet } from '../../tests/factories/make-pet'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterAPetUseCase

describe('Register a Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterAPetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to register a new pet', async () => {
    const org = await orgsRepository.create(makeOrg())

    const { pet } = await sut.execute(
      makePet({ org_id: org.id, org_city: org.city }),
    )

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.city).toEqual(org.city)
    expect(pet.org_id).toEqual(org.id)
  })

  it('should not be able to register a new pet without being bound a org', async () => {
    await expect(() =>
      sut.execute(makePet({ org_id: 'non-existing-org-id' })),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
}) //
