import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenerationsService {
  constructor(private prisma: PrismaService) {}

  async listGenerations(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [generations, total] = await Promise.all([
      this.prisma.generation.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { voice: { select: { name: true } } },
      }),
      this.prisma.generation.count({ where: { userId } }),
    ]);

    return {
      data: generations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getGeneration(userId: string, generationId: string) {
    const generation = await this.prisma.generation.findFirst({
      where: { id: generationId, userId },
      include: { voice: { select: { name: true } } },
    });

    if (!generation) {
      throw new NotFoundException('Generation not found');
    }

    return generation;
  }

  async deleteGeneration(userId: string, generationId: string) {
    const generation = await this.prisma.generation.findFirst({
      where: { id: generationId, userId },
    });

    if (!generation) {
      throw new NotFoundException('Generation not found');
    }

    await this.prisma.generation.delete({ where: { id: generationId } });

    return { success: true };
  }
}
