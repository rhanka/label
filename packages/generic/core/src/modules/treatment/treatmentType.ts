import { annotationsDiffModule } from '../annotationsDiff';
import { idType } from '../id';
import { buildModel, buildType } from '../modelType';

export { treatmentModel };

export type { treatmentType };

const treatmentModel = buildModel({
  kind: 'object',
  content: {
    _id: { kind: 'custom', content: 'id' },
    addedAnnotationsCount: {
      kind: 'object',
      content: {
        sensitive: { kind: 'primitive', content: 'number' },
        other: { kind: 'primitive', content: 'number' },
      },
    },
    annotationsDiff: annotationsDiffModule.model,
    deletedAnnotationsCount: {
      kind: 'object',
      content: {
        anonymised: { kind: 'primitive', content: 'number' },
        other: { kind: 'primitive', content: 'number' },
      },
    },
    documentId: { kind: 'custom', content: 'id' },
    duration: { kind: 'primitive', content: 'number' },
    lastUpdateDate: { kind: 'primitive', content: 'number' },
    modifiedAnnotationsCount: {
      kind: 'object',
      content: {
        nonAnonymisedToSensitive: { kind: 'primitive', content: 'number' },
        anonymisedToNonAnonymised: { kind: 'primitive', content: 'number' },
        other: { kind: 'primitive', content: 'number' },
      },
    },
    order: { kind: 'primitive', content: 'number' },
    resizedBiggerAnnotationsCount: {
      kind: 'object',
      content: {
        sensitive: { kind: 'primitive', content: 'number' },
        other: { kind: 'primitive', content: 'number' },
      },
    },
    resizedSmallerAnnotationsCount: {
      kind: 'object',
      content: {
        anonymised: { kind: 'primitive', content: 'number' },
        other: { kind: 'primitive', content: 'number' },
      },
    },
    source: {
      kind: 'constant',
      content: ['annotator', 'admin', 'NLP', 'postProcess', 'supplementaryAnnotations'] as const,
    },
  },
} as const);

type treatmentType = buildType<typeof treatmentModel, { id: idType }>;
