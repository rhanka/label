import { apiSchema, idModule } from '@label/core';
import { settingsLoader } from '../lib/settingsLoader';
import { annotationReportService } from '../modules/annotationReport';
import { assignationService } from '../modules/assignation';
import { documentService } from '../modules/document';
import { monitoringEntryService } from '../modules/monitoringEntry';
import { problemReportService } from '../modules/problemReport';
import { statisticService } from '../modules/statistic';
import { treatmentService } from '../modules/treatment';
import { userService } from '../modules/user';
import { buildAuthenticatedController } from './buildAuthenticatedController';
import { controllersFromSchemaType } from './controllerType';

export { controllers };

const controllers: controllersFromSchemaType<typeof apiSchema> = {
  get: {
    aggregatedStatistics: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { ressourceFilter } }) => {
        const settings = settingsLoader.getSettings();

        return statisticService.fetchAggregatedStatisticsAccordingToFilter(
          {
            ...ressourceFilter,
            userId:
              ressourceFilter.userId !== undefined
                ? idModule.lib.buildId(ressourceFilter.userId)
                : undefined,
          },
          settings,
        );
      },
    }),

    annotationsDiffDetails: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { documentId } }) =>
        treatmentService.fetchAnnotationsDiffDetailsForDocument(
          idModule.lib.buildId(documentId),
        ),
    }),

    annotationReport: buildAuthenticatedController({
      permissions: ['admin', 'annotator'],
      controllerWithUser: async (_, { args: { documentId } }) =>
        annotationReportService.fetchAnnotationReportOfDocument(
          idModule.lib.buildId(documentId),
        ),
    }),

    annotations: buildAuthenticatedController({
      permissions: ['admin', 'annotator'],
      controllerWithUser: async (_, { args: { documentId } }) =>
        treatmentService.fetchAnnotationsOfDocument(
          idModule.lib.buildId(documentId),
        ),
    }),

    async anonymizedDocumentText({ args: { documentId } }) {
      return documentService.fetchAnonymizedDocumentText(
        idModule.lib.buildId(documentId),
      );
    },

    availableStatisticFilters: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async () =>
        statisticService.fetchAvailableStatisticFilters(),
    }),

    document: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { documentId } }) =>
        documentService.fetchDocument(idModule.lib.buildId(documentId)),
    }),

    documentsForUser: buildAuthenticatedController({
      permissions: ['admin', 'annotator'],
      controllerWithUser: async (user, { args: { documentsMaxCount } }) =>
        documentService.fetchDocumentsForUser(user._id, documentsMaxCount),
    }),

    problemReportsWithDetails: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async () =>
        problemReportService.fetchProblemReportsWithDetails(),
    }),

    settings: buildAuthenticatedController({
      permissions: ['admin', 'annotator'],
      controllerWithUser: async () => ({
        json: JSON.stringify(settingsLoader.getSettings()),
      }),
    }),

    publishableDocuments: buildAuthenticatedController({
      permissions: ['admin', 'publicator'],
      controllerWithUser: async () =>
        documentService.fetchPublishableDocuments(),
    }),

    treatedDocuments: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async () => {
        const settings = settingsLoader.getSettings();
        return documentService.fetchTreatedDocuments(settings);
      },
    }),

    untreatedDocuments: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async () => documentService.fetchUntreatedDocuments(),
    }),

    workingUsers: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async () => userService.fetchWorkingUsers(),
    }),
  },

  post: {
    assignDocumentToUser: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { documentId, userId } }) => {
        await documentService.assertDocumentStatus({
          documentId: idModule.lib.buildId(documentId),
          status: 'free',
        });
        await assignationService.createAssignation({
          documentId: idModule.lib.buildId(documentId),
          userId: idModule.lib.buildId(userId),
        });
        return documentService.updateDocumentStatus(
          idModule.lib.buildId(documentId),
          'saved',
        );
      },
    }),

    createUser: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: (_, { args: { name, email, role } }) => {
        return userService.createUser({
          name,
          email,
          role,
        });
      },
    }),

    changePassword: buildAuthenticatedController({
      permissions: ['admin', 'annotator', 'publicator'],
      controllerWithUser: async (
        user,
        { args: { previousPassword, newPassword } },
      ) => userService.changePassword({ user, previousPassword, newPassword }),
    }),

    deleteProblemReport: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { problemReportId } }) =>
        problemReportService.deleteProblemReportById(
          idModule.lib.buildId(problemReportId),
        ),
    }),

    deleteHumanTreatmentsForDocument: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { documentId } }) => {
        await assignationService.deleteAssignationsByDocumentId(
          idModule.lib.buildId(documentId),
        );
        await documentService.updateDocumentStatus(
          idModule.lib.buildId(documentId),
          'free',
        );
        await documentService.updateDocumentReviewStatus(
          idModule.lib.buildId(documentId),
          'none',
        );
      },
    }),

    async login({ args: { email, password } }) {
      const {
        _id,
        email: userEmail,
        name,
        role,
        token,
        passwordTimeValidityStatus,
      } = await userService.login({
        email,
        password,
      });
      return {
        email: userEmail,
        name,
        role,
        token,
        _id,
        passwordTimeValidityStatus,
      };
    },

    monitoringEntries: buildAuthenticatedController({
      permissions: ['admin', 'annotator'],
      controllerWithUser: async (user, { args: { newMonitoringEntries } }) => {
        const monitoringEntries = newMonitoringEntries.map(
          (newMonitoringEntry) => ({
            ...newMonitoringEntry,
            documentId: idModule.lib.buildId(newMonitoringEntry.documentId),
            _id: idModule.lib.buildId(newMonitoringEntry._id),
            userId: user._id,
          }),
        );
        await monitoringEntryService.createMany(monitoringEntries);
      },
    }),

    problemReport: buildAuthenticatedController({
      permissions: ['admin', 'annotator'],
      controllerWithUser: async (
        user,
        { args: { documentId, problemText, problemType } },
      ) => {
        await problemReportService.createProblemReport({
          userId: user._id,
          documentId: idModule.lib.buildId(documentId),
          problemText,
          problemType,
        });
      },
    }),

    resetPassword: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { userId } }) =>
        userService.resetPassword(idModule.lib.buildId(userId)),
    }),

    setDeletionDateForUser: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { userId } }) =>
        userService.setDeletionDateForUser(idModule.lib.buildId(userId)),
    }),

    setIsActivatedForUser: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { userId, isActivated } }) =>
        userService.setIsActivatedForUser({
          userId: idModule.lib.buildId(userId),
          isActivated,
        }),
    }),

    updateAssignationDocumentStatus: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { assignationId, status } }) => {
        return assignationService.updateAssignationDocumentStatus(
          idModule.lib.buildId(assignationId),
          status,
        );
      },
    }),

    updateDocumentReviewStatus: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (_, { args: { documentId, reviewStatus } }) => {
        await documentService.updateDocumentReviewStatus(
          idModule.lib.buildId(documentId),
          reviewStatus,
        );
      },
    }),

    updateDocumentStatus: buildAuthenticatedController({
      permissions: ['admin', 'annotator', 'publicator'],
      controllerWithUser: async (user, { args: { documentId, status } }) => {
        if (user.role !== 'admin' && user.role !== 'publicator') {
          await assignationService.assertDocumentIsAssignatedToUser({
            documentId: idModule.lib.buildId(documentId),
            userId: user._id,
          });
        }
        return documentService.updateDocumentStatus(
          idModule.lib.buildId(documentId),
          status,
        );
      },
    }),

    updatePublishableDocumentStatus: buildAuthenticatedController({
      permissions: ['admin', 'publicator'],
      controllerWithUser: async (_, { args: { documentId, status } }) => {
        await documentService.assertDocumentIsPublishable(
          idModule.lib.buildId(documentId),
        );
        return documentService.updateDocumentStatus(
          idModule.lib.buildId(documentId),
          status,
        );
      },
    }),

    updateProblemReportHasBeenRead: buildAuthenticatedController({
      permissions: ['admin'],
      controllerWithUser: async (
        _,
        { args: { problemReportId, hasBeenRead } },
      ) => {
        await problemReportService.updateHasBeenRead(
          idModule.lib.buildId(problemReportId),
          hasBeenRead,
        );
      },
    }),

    updateTreatment: buildAuthenticatedController({
      permissions: ['admin', 'annotator'],
      controllerWithUser: async (
        user,
        { args: { annotationsDiff, documentId } },
      ) => {
        const settings = settingsLoader.getSettings();
        return treatmentService.updateTreatment(
          {
            annotationsDiff,
            documentId: idModule.lib.buildId(documentId),
            userId: user._id,
          },
          settings,
        );
      },
    }),
  },
};
