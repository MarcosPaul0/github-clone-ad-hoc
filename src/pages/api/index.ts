// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { licenses, users } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../services/prisma";
import { GetRepositoriesDto } from "../../types/getRepositoriesDto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let ownerFound: users | null = null;
    let licenseFound: licenses | null = null;

    const { filters, attributes, sort } = req.body as GetRepositoriesDto;

    if (filters?.ownerLogin) {
      ownerFound = await prisma.users.findFirst({
        where: {
          login: filters.ownerLogin,
        },
      });

      if (!ownerFound) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }
    }

    if (filters?.licenseKey) {
      licenseFound = await prisma.licenses.findFirst({
        where: {
          key: filters.licenseKey,
        },
      });

      if (!licenseFound) {
        return res.status(404).json({
          message: "Licença não encontrada",
        });
      }
    }

    const orderBy = {} as any;
    if (sort?.order) {
      orderBy[sort.type] = sort.order;
    }

    const result = await prisma.repositories.findMany({
      include: {
        licenses: !!attributes.licenses,
        code_frequency: !!attributes.codeFrequency,
        collaborators: !!attributes.collaborators,
        users: !!attributes.users,
      },
      where: {
        name: filters?.repositoryName && filters.repositoryName,
        owner_id: ownerFound ? ownerFound.id : undefined,
        license_id: licenseFound ? licenseFound.id : undefined,
        language: filters?.language && filters.language,
        has_issues: filters?.hasIssues && filters.hasIssues,
        is_template: filters?.isTemplate && filters.isTemplate,
        size: {
          gte: filters?.minSize && filters.minSize,
          lte: filters?.maxSize && filters.maxSize,
        },
        forks_count: {
          gte: filters?.forksMinCount && filters.forksMinCount,
          lte: filters?.forksMaxCount && filters.forksMaxCount,
        },
        created_at: {
          gte:
            filters?.creationStart &&
            filters?.creationStart,
          lte:
            filters?.creationEnd &&
            filters.creationEnd,
        },
        updated_at: {
          gte:
            filters?.updateStart && filters.updateStart,
          lte:
            filters?.updateEnd &&
            filters.updateEnd,
        },
        pushed_at: {
          gte:
            filters?.pushedStart && filters.pushedStart,
          lte:
            filters?.pushedEnd &&
            filters.pushedEnd,
        },
      },
      orderBy,
    });

    if (!result) {
      return res.status(404).json({
        message: 'Repositório(s) não encontrado(s)',
      });
    }

    return res.status(200).json({
      result,
      count: result.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno do servidor",
      error,
    });
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}
