import { Pet, Prisma } from '@prisma/client'

export interface SearchPetsParams {
  city: string
  type?: 'DOG' | 'CAT' | 'BIRD' | 'RODENT' | 'REPTILE' | 'OTHER'
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR' | 'OTHER'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE' | 'OTHER'
  stamina?: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
  autonomy?: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(city: string): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  searchPets(params: SearchPetsParams): Promise<Pet[] | null>
}
