import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const user = await prisma.org.create({ data })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
