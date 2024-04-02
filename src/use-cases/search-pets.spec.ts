import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { makeOrg } from '../../tests/factories/make-org'
import { makePet } from '../../tests/factories/make-pet'
import { SearchPetsUseCase } from './search-pets'
import { NoResultsFoundError } from './errors/no-results-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to list pets by city', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_city: org.city, org_id: org.id }))
    await petsRepository.create(makePet({ org_city: org.city, org_id: org.id }))

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)
    expect(pets[0].city).toBe(org.city)
  })

  it('should be able to list pets by size', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, size: 'SMALL' }),
    )
    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, size: 'LARGE' }),
    )

    const { pets } = await sut.execute({ city: org.city, size: 'SMALL' })

    expect(pets).toHaveLength(1)
    expect(pets[0].size).toEqual('SMALL')
  })

  it('should be able to list pets by type', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, type: 'DOG' }),
    )
    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, type: 'CAT' }),
    )

    const { pets } = await sut.execute({ city: org.city, type: 'CAT' })

    expect(pets).toHaveLength(1)
    expect(pets[0].type).toEqual('CAT')
  })

  it('should be able to list pets by age', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, age: 'BABY' }),
    )
    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, age: 'ADULT' }),
    )

    const { pets } = await sut.execute({ city: org.city, age: 'ADULT' })

    expect(pets).toHaveLength(1)
    expect(pets[0].age).toEqual('ADULT')
  })

  it('should be able to list pets by stamina', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, stamina: 'LOW' }),
    )
    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, stamina: 'MEDIUM' }),
    )

    const { pets } = await sut.execute({ city: org.city, stamina: 'LOW' })

    expect(pets).toHaveLength(1)
    expect(pets[0].stamina).toEqual('LOW')
  })

  it('should be able to list pets by autonomy', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, autonomy: 'OTHER' }),
    )
    await petsRepository.create(
      makePet({ org_city: org.city, org_id: org.id, autonomy: 'HIGH' }),
    )

    const { pets } = await sut.execute({ city: org.city, autonomy: 'HIGH' })

    expect(pets).toHaveLength(1)
    expect(pets[0].autonomy).toEqual('HIGH')
  })

  it('should be able to list pets by two params', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({
        org_city: org.city,
        org_id: org.id,
        autonomy: 'HIGH',
        age: 'ADULT',
      }),
    )

    await petsRepository.create(
      makePet({
        org_city: org.city,
        org_id: org.id,
        autonomy: 'LOW',
        age: 'ADULT',
      }),
    )

    const { pets } = await sut.execute({
      city: org.city,
      autonomy: 'HIGH',
      age: 'ADULT',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].age).toEqual('ADULT')
  })
}) //
