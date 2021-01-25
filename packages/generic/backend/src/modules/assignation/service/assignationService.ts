import {
  assignationModule,
  assignationType,
  documentType,
  idModule,
  idType,
} from '@label/core';
import { documentService } from '../../document';
import { treatmentService } from '../../treatment';
import { buildAssignationRepository } from '../repository';

export { assignationService };

const assignationService = {
  async fetchAssignationId({
    userId,
    documentId,
  }: {
    userId: idType;
    documentId: idType;
  }) {
    const assignationRepository = buildAssignationRepository();
    const assignations = await assignationRepository.findAllByUserId(userId);
    const assignation = assignations.find((assignation) =>
      idModule.lib.equalId(assignation.documentId, documentId),
    );

    return assignation?._id;
  },

  async fetchDocumentIdsAssignatedToUserId(userId: idType) {
    const assignationRepository = buildAssignationRepository();
    const assignations = await assignationRepository.findAllByUserId(userId);

    return assignations.map((assignation) => assignation.documentId);
  },

  async fetchAllAssignatedDocumentIds() {
    const assignationRepository = buildAssignationRepository();
    const assignations = await assignationRepository.findAll();

    return assignations.map((assignation) => assignation.documentId);
  },

  async updateAssignationDocumentStatus(
    assignationId: assignationType['_id'],
    status: documentType['status'],
  ) {
    const assignationRepository = buildAssignationRepository();
    const assignation = await assignationRepository.findById(assignationId);
    await documentService.updateDocumentStatus(assignation.documentId, status);
  },
  async createAssignation({
    userId,
    documentId,
  }: {
    userId: idType;
    documentId: idType;
  }) {
    const assignationRepository = buildAssignationRepository();
    const treatmentId = await treatmentService.createEmptyTreatment(documentId);

    const assignation = assignationModule.lib.buildAssignation({
      userId,
      documentId,
      treatmentId,
    });
    return assignationRepository.insert(assignation);
  },
};
