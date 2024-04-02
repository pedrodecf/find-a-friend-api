import {
  Prisma,
  Pet,
  Autonomy,
  Stamina,
  Size,
  Age,
  Type,
  $Enums,
} from '@prisma/client'
import { PetsRepository, SearchPetsParams } from '../pets-repository'

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

  async searchPets(params: SearchPetsParams) {
    const pets = this.pets
      .filter((pet) => pet.city === params.city)
      .filter((pet) => (params.type ? pet.type === params.type : true))
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) => (params.stamina ? pet.stamina === params.stamina : true))
      .filter((pet) =>
        params.autonomy ? pet.autonomy === params.autonomy : true,
      )

    return pets.length ? pets : null
  }
}
