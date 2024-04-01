import { Prisma, Pet, Autonomy, Stamina, Size, Age, Type } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id || 'pet-id',
      name: data.name,
      description: data.description,
      type: data.type as Type,
      age: data.age as Age,
      size: data.size as Size,
      stamina: data.stamina as Stamina,
      autonomy: data.autonomy as Autonomy,
      photos: data.photos as string[],
      org_id: data.org_id,
      city: data.city,
      created_at: new Date(),
      adopted_at: null,
    }

    this.pets.push(pet)

    return pet
  }

  async findByCity(city: string) {
    const pets = this.pets.filter((pet) => pet.city === city)

    return pets.length ? pets : null
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    return pet || null
  }
}
