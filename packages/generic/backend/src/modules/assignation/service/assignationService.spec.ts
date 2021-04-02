import {
  assignationModule,
  idModule,
  problemReportModule,
  treatmentModule,
} from '@label/core';
import { buildProblemReportRepository } from '../../problemReport';
import { buildTreatmentRepository } from '../../treatment';
import { buildAssignationRepository } from '../repository';
import { assignationService } from './assignationService';

describe('assignationService', () => {
  describe('assertDocumentIsAssignatedToUser', () => {
    it('should throw one error', async () => {
      const assignationRepository = buildAssignationRepository();
      const userId = idModule.lib.buildId();
      const documentId = idModule.lib.buildId();
      const otherDocumentId = idModule.lib.buildId();
      const assignation = assignationModule.generator.generate({
        userId,
        documentId,
      });
      await assignationRepository.insert(assignation);

      const failingAssertion = () =>
        assignationService.assertDocumentIsAssignatedToUser({
          documentId: otherDocumentId,
          userId,
        });

      await assignationService.assertDocumentIsAssignatedToUser({
        documentId,
        userId,
      });
      expect(failingAssertion()).rejects.toThrowError();
    });
  });

  describe('deleteAssignationsByDocumentId', () => {
    it('should delete treatments and assignations', async () => {
      const assignationRepository = buildAssignationRepository();
      const problemReportRepository = buildProblemReportRepository();
      const treatmentRepository = buildTreatmentRepository();
      const documentId = idModule.lib.buildId();
      const treatment = treatmentModule.generator.generate();
      const assignation = assignationModule.generator.generate({
        treatmentId: treatment._id,
        documentId,
      });
      const problemReport = problemReportModule.generator.generate({
        assignationId: assignation._id,
      });
      await assignationRepository.insert(assignation);
      await problemReportRepository.insert(problemReport);
      await treatmentRepository.insert(treatment);

      await assignationService.deleteAssignationsByDocumentId(documentId);

      const assignations = await assignationRepository.findAll();
      const problemReports = await problemReportRepository.findAll();
      const treatments = await treatmentRepository.findAll();
      expect(assignations).toEqual([]);
      expect(problemReports).toEqual([]);
      expect(treatments).toEqual([]);
    });
  });

  describe('fetchAssignationId', () => {
    const assignationRepository = buildAssignationRepository();

    const userId = idModule.lib.buildId();
    const documentId = idModule.lib.buildId();

    it('should fetch the assignation id corresponding to the given user id and document id', async () => {
      const assignation = assignationModule.generator.generate({
        userId,
        documentId,
      });
      await assignationRepository.insert(assignation);

      const assignationId = await assignationService.fetchAssignationId({
        userId,
        documentId,
      });

      expect(assignationId).toEqual(assignation._id);
    });
    it('should return undefined if no assignation exists for the given user id and document id', async () => {
      const assignationId = await assignationService.fetchAssignationId({
        userId,
        documentId,
      });

      expect(assignationId).toEqual(undefined);
    });
  });

  describe('fetchDocumentIdsAssignatedToUserId', () => {
    const assignationRepository = buildAssignationRepository();

    const userId1 = idModule.lib.buildId();
    const userId2 = idModule.lib.buildId();

    it('should fetch all the document id assignated to the given userId', async () => {
      const assignements = ([
        { userId: userId1 },
        { userId: userId1 },
        { userId: userId2 },
      ] as const).map(assignationModule.generator.generate);
      await Promise.all(assignements.map(assignationRepository.insert));

      const documentIdAssignatedToUserId = await assignationService.fetchDocumentIdsAssignatedToUserId(
        userId1,
      );

      expect(documentIdAssignatedToUserId).toEqual([
        assignements[0].documentId,
        assignements[1].documentId,
      ]);
    });
    it('should return an empty array if there is no document id assignated to the given userId', async () => {
      const assignements = ([{ userId: userId1 }] as const).map(
        assignationModule.generator.generate,
      );
      await Promise.all(assignements.map(assignationRepository.insert));

      const documentIdAssignatedToUserId = await assignationService.fetchDocumentIdsAssignatedToUserId(
        userId2,
      );

      expect(documentIdAssignatedToUserId).toEqual([]);
    });
  });

  describe('findOrCreateByDocumentIdAndUserId', () => {
    const userId = idModule.lib.buildId();
    const documentId = idModule.lib.buildId();

    it('should find the corresponding assignation', async () => {
      const assignationRepository = buildAssignationRepository();
      const assignation = assignationModule.generator.generate({
        documentId,
        userId,
      });
      await assignationRepository.insert(assignation);

      await assignationService.findOrCreateByDocumentIdAndUserId({
        documentId,
        userId,
      });

      const assignations = await assignationRepository.findAll();
      expect(assignations).toEqual([assignation]);
    });

    it('should create the corresponding assignation', async () => {
      const assignationRepository = buildAssignationRepository();

      await assignationService.findOrCreateByDocumentIdAndUserId({
        documentId,
        userId,
      });

      const assignations = await assignationRepository.findAll();
      expect(assignations.length).toEqual(1);
      expect(
        idModule.lib.equalId(assignations[0].documentId, documentId),
      ).toBeTruthy();
      expect(idModule.lib.equalId(assignations[0].userId, userId)).toBeTruthy();
    });
  });
});
