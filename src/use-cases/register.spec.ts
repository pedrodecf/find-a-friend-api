import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register a new org', async () => {
    const { org } = await sut.execute({
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city_name: 'City',
      phone: '12345678',
      password: 'password',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org).toEqual(expect.objectContaining({ org_name: 'Org Name' }))
    expect(org).toEqual(expect.objectContaining({ city_name: 'City' }))
  })

  it('should not be able to register a new org with the same email', async () => {
    const email = 'test@email.com'

    await sut.execute({
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email,
      cep: '12345678',
      city_name: 'City',
      phone: '12345678',
      password: 'password',
    })

    await expect(() =>
      sut.execute({
        org_name: 'Org Name',
        owner_name: 'Owner Name',
        email,
        cep: '12345678',
        city_name: 'City',
        phone: '12345678',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash org password', async () => {
    const { org } = await sut.execute({
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city_name: 'City',
      phone: '12345678',
      password: 'password',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
}) //
