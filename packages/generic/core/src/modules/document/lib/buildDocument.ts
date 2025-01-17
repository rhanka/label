import { idModule, omitIdType } from '../../id';
import { documentType } from '../documentType';

export { buildDocument };

function buildDocument(
  documentFields: Omit<omitIdType<documentType>, 'status' | 'updateDate' | 'reviewStatus'>,
): documentType {
  return {
    ...documentFields,
    _id: idModule.lib.buildId(),
    reviewStatus: 'none',
    status: 'loaded',
    updateDate: new Date().getTime(),
  };
}
