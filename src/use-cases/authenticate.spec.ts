import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city: 'City',
      phone: '12345678',
      password_hash: await hash('password', 6),
    })

    const { org } = await sut.execute({
      email: 'test@email.com',
      password: 'password',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city: 'City',
      phone: '12345678',
      password_hash: await hash('password', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      org_name: 'Org Name',
      owner_name: 'Owner Name',
      email: 'test@email.com',
      cep: '12345678',
      city: 'City',
      phone: '12345678',
      password_hash: await hash('password', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'wrong@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
}) //
