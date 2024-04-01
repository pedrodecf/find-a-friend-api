import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ListPetsFromUniqueCityUseCase } from './list-pets-from-unique-city'

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

    await petsRepository.create({
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

    const secondOrg = await orgsRepository.create({
      id: 'org-id-2',
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city: 'Cidade dos Gatos Amarelos',
      phone: '12345678',
      password_hash: 'password',
    })

    await petsRepository.create({
      name: 'Gato 2',
      description: 'Gato Amarelo',
      type: 'CAT',
      age: 'ADULT',
      size: 'SMALL',
      stamina: 'LOW',
      autonomy: 'LOW',
      photos: ['photo1', 'photo2'],
      org_id: secondOrg.id,
      city: secondOrg.city,
    })

    const { pets } = await sut.execute({
      city: org.city,
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
