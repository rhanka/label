import { idType } from '../id';
import { buildModel, buildType } from '../modelType';

export { ressourceFilterModel };

export type { ressourceFilterType };

const ressourceFilterModel = buildModel({
  kind: 'object',
  content: {
    source: {
      kind: 'or',
      content: [
        { kind: 'primitive', content: 'string' },
        { kind: 'primitive', content: 'undefined' },
      ],
    },
    userId: {
      kind: 'or',
      content: [
        { kind: 'custom', content: 'id' },
        { kind: 'primitive', content: 'undefined' },
      ],
    },
  },
} as const);

type ressourceFilterType = buildType<typeof ressourceFilterModel, { id: idType }>;
