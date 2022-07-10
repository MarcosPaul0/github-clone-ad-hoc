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

    if (filters?.ownerLogin && filters?.ownerLogin != null) {
      ownerFound = await prisma.users.findFirst({
        where: {
          login: {
            contains: filters.ownerLogin,
          },
        },
      });

      if (!ownerFound) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }
    }

    if (filters?.licenseKey && filters?.licenseKey != null) {
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
    if (sort?.order && sort?.order != null) {
      orderBy[sort.type] = sort.order;
    }

    const size = {} as any;
    if (filters?.minSize) {
      size['gte'] = filters.minSize;
    }
    if (filters?.maxSize) {
      size['lte'] = filters.maxSize
    }

    const forks_count = {} as any;
    if (filters?.forksMinCount) {
      forks_count['gte'] = filters.forksMinCount;
    }
    if (filters?.forksMaxCount) {
      forks_count['lte'] = filters.forksMaxCount
    }

    // const collaborators_count = {} as any;
    // if (filters?.collaboratorsMinCount && filters?.collaboratorsMinCount != null) {
    //   collaborators_count['gte'] = filters.collaboratorsMinCount;
    // }
    // if (filters?.collaboratorsMaxCount && filters?.collaboratorsMaxCount != null) {
    //   collaborators_count['lte'] = filters.collaboratorsMaxCount
    // }

    const created_at = {} as any;
    if (filters?.creationStart && filters?.creationStart != null) {
      created_at['gte'] = new Date(filters.creationStart);
    }
    if (filters?.creationEnd && filters?.creationEnd != null) {
      created_at['lte'] = new Date(filters.creationEnd);
    }

    const updated_at = {} as any;
    if (filters?.updateStart && filters?.updateStart != null) {
      updated_at['gte'] = new Date(filters.updateStart);
    }
    if (filters?.updateEnd && filters?.updateEnd != null) {
      updated_at['lte'] = new Date(filters.updateEnd);
    }

    const pushed_at = {} as any;
    if (filters?.pushedStart && filters?.pushedStart != null) {
      pushed_at['gte'] = new Date(filters.pushedStart);
    }
    if (filters?.pushedEnd && filters?.pushedEnd != null) {
      pushed_at['lte'] = new Date(filters.pushedEnd);
    }

    const allRepository = await prisma.repositories.findMany({
      include: {
        licenses: !!attributes.licenses,
        code_frequency: !!attributes.codeFrequency,
        collaborators: !!attributes.collaborators,
        users: !!attributes.users,
      },
      where: {
        name: filters?.repositoryName ? filters.repositoryName : undefined,
        owner_id: ownerFound ? ownerFound.id : undefined,
        license_id: licenseFound ? licenseFound.id : undefined,
        language: filters?.language ? filters.language : undefined,
        has_issues: filters?.hasIssues ? filters.hasIssues : undefined,
        is_template: filters?.isTemplate ? filters.isTemplate : undefined,
        size,
        forks_count,
        created_at,
        updated_at,
        pushed_at,
      },

      orderBy,
    });

    if (!allRepository) {
      return res.status(404).json({
        message: 'Repositório(s) não encontrado(s)',
      });
    }

    const page = req.query.page ? +req.query.page : 1;

    const result = allRepository.slice((page - 1) * 14, page * 14).map(repository => {
      const {
        licenses,
        users,
        collaborators,
        code_frequency,
        ...rest
      } = repository;

      const owner = users;
      const license = licenses;

      if (code_frequency?.length > 0) {
        const codeFrequency = code_frequency.reduce((prev, curr) => {
          return {
            additions: prev.additions + curr.additions,
            deletions: prev.deletions + curr.deletions,
          }
        }, {
          additions: 0,
          deletions: 0,
        });
  
        return {
          owner,
          license,
          collaborators,
          codeFrequency,
          ...rest,
        }
      }

      return {
        owner,
        license,
        collaborators,
        codeFrequency: {
          additions: 0,
          deletions: 0,
        },
        ...rest,
      }
    });

    const stats = allRepository.reduce((prev: any, curr) => {
      const aggregated = prev;

      aggregated.totalSize += curr.size;
      aggregated.totalForks += curr.forks_count;
      aggregated.totalIssues += curr.open_issues_count;

      if (!aggregated.languages[curr.language]) {
        aggregated.languages[curr.language] = 1;
      } else {
        aggregated.languages[curr.language] += 1;
      }

      if (curr.licenses) {
        const license = curr.licenses.key.toLocaleUpperCase()

        if (!aggregated.licenses[license]) {
          aggregated.licenses[license] = 1;
        } else {
          aggregated.licenses[license] += 1;
        }
      }

      if (curr.collaborators?.length > 0) {
        if (!aggregated['totalCollaborators']) {
          aggregated['totalCollaborators'] = curr.collaborators.length;
        } else {
          aggregated['totalCollaborators'] += curr.collaborators.length;
        }
      }

      return aggregated;
    }, {
      totalSize: 0,
      totalForks: 0,
      totalIssues: 0,
      languages: {},
      licenses: {},
    });

    return res.status(200).json({
      result: result,
      stats: {
        ...stats,
        totalRepositories: allRepository.length,
      }
    });
  } catch (error) {
    console.log(error);

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
