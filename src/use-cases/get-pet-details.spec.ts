import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ListPetsFromUniqueCityUseCase } from './list-pets-from-unique-city'
import { GetPetDetailsUseCase } from './get-pet-details'

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
    const org = await orgsRepository.create({
      id: 'org-id-1',
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city: 'Cidade dos Gatos',
      phone: '12345678',
      password_hash: 'password',
    })

    const newPet = await petsRepository.create({
      name: 'Gato 1',
      description: 'Gato Laranja',
      type: 'CAT',
      age: 'ADULT',
      size: 'SMALL',
      stamina: 'LOW',
      autonomy: 'LOW',
      photos: ['photo1', 'photo2'],
      org_id: org.id,
      city: org.city,
    })

    const { pet } = await sut.execute({
      id: newPet.id,
    })

    expect(pet).toEqual(newPet)
  })
}) //
