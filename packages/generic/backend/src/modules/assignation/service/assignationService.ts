import {
  assignationModule,
  assignationType,
  idModule,
  idType,
} from '@label/core';
import { groupBy } from 'lodash';
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

  async fetchDocumentIdAssignatedToUserId(userId: idType) {
    const assignationRepository = buildAssignationRepository();
    const assignations = await assignationRepository.findAllByUserId(userId);

    const someSavedAssignation = assignations.find(
      (assignation) => assignation.status === 'saved',
    );
    const somePendingAssignation = assignations.find(
      (assignation) => assignation.status === 'pending',
    );

    return (
      someSavedAssignation?.documentId || somePendingAssignation?.documentId
    );
  },

  async fetchAllAssignatedDocumentIds() {
    const assignationRepository = buildAssignationRepository();
    const assignations = await assignationRepository.findAll();

    return assignations.map((assignation) => assignation.documentId);
  },

  // UNUSED, SHOULD MAYBE BE DELETED
  async fetchDocumentIdsAssignatedByUserId(): Promise<{
    [userId: string]: idType[];
  }> {
    const assignationRepository = buildAssignationRepository();
    const assignations = await assignationRepository.findAll();
    const assignationsGroupedByUser = groupBy(
      assignations,
      (assignation) => assignation.userId,
    );

    const documentIdsAssignatedByUser: { [userId: string]: idType[] } = {};
    Object.entries(assignationsGroupedByUser).forEach(
      ([userId, assignations]) =>
        (documentIdsAssignatedByUser[userId] = assignations.map(
          (assignation) => assignation.documentId,
        )),
    );

    return documentIdsAssignatedByUser;
  },

  async createAssignation({
    userId,
    documentId,
  }: {
    userId: idType;
    documentId: idType;
  }) {
    const assignationRepository = buildAssignationRepository();
    const assignation = assignationModule.lib.buildAssignation({
      userId,
      documentId,
      status: 'pending',
    });
    return assignationRepository.insert(assignation);
  },

  async updateStatus(
    userId: idType,
    documentId: idType,
    status: assignationType['status'],
  ) {
    const assignationRepository = buildAssignationRepository();
    await assignationRepository.updateStatus(userId, documentId, status);
  },
};
