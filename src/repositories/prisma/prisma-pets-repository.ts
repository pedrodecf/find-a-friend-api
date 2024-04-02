import { Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsParams } from '../pets-repository'
import { prisma } from '../../lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchPets(params: SearchPetsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        city: params.city,
        type: params.type,
        size: params.size,
        stamina: params.stamina,
        autonomy: params.autonomy,
      },
    })

    return pets
  }
}
