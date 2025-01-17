import { uniq } from 'lodash';
import { documentType, idModule } from '@label/core';
import {
  buildFakeRepositoryBuilder,
  projectFakeObjects,
  updateFakeCollection,
} from '../../../repository';
import { customDocumentRepositoryType } from './customDocumentRepositoryType';

export { buildFakeDocumentRepository };

const buildFakeDocumentRepository = buildFakeRepositoryBuilder<
  documentType,
  customDocumentRepositoryType
>({
  collectionName: 'documents',
  buildCustomFakeRepository: (collection) => ({
    async countNotIn(idsNotToSearchIn) {
      return collection.filter(
        (document) =>
          !idsNotToSearchIn.some((id) =>
            idModule.lib.equalId(document._id, id),
          ),
      ).length;
    },

    async findAllPublicationCategories() {
      let publicationCategories: string[] = [];
      collection.forEach(
        (document) =>
          (publicationCategories = uniq(
            publicationCategories.concat(document.publicationCategory),
          )),
      );

      return publicationCategories;
    },

    async findAllByPublicationCategoryLettersProjection(
      publicationCategoryLetters,
      projections,
    ) {
      return collection
        .filter((document) =>
          publicationCategoryLetters.some((publicationCategoryLetter) =>
            document.publicationCategory.includes(publicationCategoryLetter),
          ),
        )
        .map((document) => projectFakeObjects(document, projections));
    },

    async findAllByStatus(status) {
      return collection.filter((document) => status.includes(document.status));
    },

    async findAllByStatusProjection(status, projections) {
      return collection
        .filter((document) => status.includes(document.status))
        .map((document) => projectFakeObjects(document, projections));
    },

    async findOneByStatusAndPriorityNotIn(
      { status, priority },
      idsNotToSearchIn,
    ) {
      const document = await collection.find(
        (document) =>
          document.status === status &&
          document.priority === priority &&
          !idsNotToSearchIn.some((id) =>
            idModule.lib.equalId(document._id, id),
          ),
      );
      return document || undefined;
    },

    async findOneByStatusAndPriorityAmong(
      { status, priority },
      idsToSearchInFirst,
    ) {
      const freeDocument = collection.find(
        (document) =>
          document.priority === priority &&
          document.status === status &&
          idsToSearchInFirst.some((id) =>
            idModule.lib.equalId(document._id, id),
          ),
      );
      return freeDocument;
    },

    async updateStatusById(_id, status) {
      updateFakeCollection(
        collection,
        collection.map((document) =>
          idModule.lib.equalId(_id, document._id)
            ? {
                ...document,
                status,
                updateDate: new Date().getTime(),
              }
            : document,
        ),
      );
      const updatedDocument = collection.find((document) =>
        idModule.lib.equalId(_id, document._id),
      );

      return updatedDocument;
    },
    async updateOneStatusByIdAndStatus(filter, update) {
      updateFakeCollection(
        collection,
        collection.map((document) =>
          idModule.lib.equalId(filter._id, document._id) &&
          document.status === filter.status
            ? {
                ...document,
                status: update.status,
                updateDate: new Date().getTime(),
              }
            : document,
        ),
      );

      const updatedDocument = collection.find((document) =>
        idModule.lib.equalId(filter._id, document._id),
      );

      return updatedDocument;
    },
  }),
});
