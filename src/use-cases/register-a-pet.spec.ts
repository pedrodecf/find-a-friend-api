import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { RegisterAPetUseCase } from './register-a-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
    const org = await orgsRepository.create({
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city: 'City',
      phone: '12345678',
      password_hash: 'password',
    })

    const { pet } = await sut.execute({
      name: 'Pet Name',
      description: 'Pet Description',
      type: 'DOG',
      age: 'ADULT',
      size: 'MEDIUM',
      stamina: 'MEDIUM',
      autonomy: 'MEDIUM',
      photos: ['photo1', 'photo2'],
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.city).toEqual(org.city)
  })

  it('should not be able to register a new pet without being bound a org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Pet Name',
        description: 'Pet Description',
        type: 'DOG',
        age: 'ADULT',
        size: 'MEDIUM',
        stamina: 'MEDIUM',
        autonomy: 'MEDIUM',
        photos: ['photo1', 'photo2'],
        org_id: 'inexistent-org-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
}) //
