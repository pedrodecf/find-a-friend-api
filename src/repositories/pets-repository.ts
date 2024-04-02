import { Pet, Prisma } from '@prisma/client'

export interface SearchPetsParams {
  city: string
  type?: string
  age?: string
  size?: string
  stamina?: string
  autonomy?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(city: string): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  searchPets(params: SearchPetsParams): Promise<Pet[] | null>
}
