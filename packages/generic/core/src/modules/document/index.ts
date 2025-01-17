import { documentGenerator } from './generator';
import { documentModel, documentType, fetchedDocumentModel, fetchedDocumentType } from './documentType';
import {
  buildDocument,
  comparator,
  countWords,
  extractAdditionalAnnotationTerms,
  getNextStatus,
  publicationHandler,
} from './lib';

export { documentModule };

export type { documentType, fetchedDocumentType };

const documentModule = {
  fetchedModel: fetchedDocumentModel,
  model: documentModel,
  generator: documentGenerator,
  lib: { buildDocument, comparator, countWords, extractAdditionalAnnotationTerms, getNextStatus, publicationHandler },
};
