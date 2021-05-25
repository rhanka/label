import {
  annotationType,
  annotationsDiffModule,
  documentType,
  treatmentModule,
  treatmentType,
  idModule,
} from '@label/core';
import { buildTreatmentRepository } from '../repository';

export { createTreatment };

async function createTreatment({
  documentId,
  previousAnnotations,
  nextAnnotations,
  source,
}: {
  documentId: documentType['_id'];
  previousAnnotations: annotationType[];
  nextAnnotations: annotationType[];
  source: treatmentType['source'];
}): Promise<treatmentType['_id']> {
  const treatmentRepository = buildTreatmentRepository();
  const previousTreatments = await treatmentRepository.findAllByDocumentId(
    documentId,
  );
  const sortedTreatments = treatmentModule.lib.sortInConsistentOrder(
    previousTreatments,
  );
  const order =
    sortedTreatments.length > 0
      ? sortedTreatments[sortedTreatments.length - 1].order + 1
      : 0;
  const treatment = treatmentModule.lib.build({
    annotationsDiff: annotationsDiffModule.lib.computeAnnotationsDiff(
      previousAnnotations,
      nextAnnotations,
    ),
    documentId,
    order,
    source,
  });

  if (
    !treatmentModule.lib.areAnnotationsConsistent(sortedTreatments, treatment)
  ) {
    throw new Error(
      `Could not create treatment for documentId ${idModule.lib.convertToString(
        documentId,
      )}: inconsistent annotations`,
    );
  }

  await treatmentRepository.insert(treatment);

  return treatment._id;
}
