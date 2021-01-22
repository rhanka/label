import {
  annotationType,
  annotationModule,
  documentType,
  annotationReportType,
  annotationReportModule,
} from '@label/core';
import { nlpAnnotationsType } from '../api';

export { nlpMapper };

const nlpMapper = {
  mapNlpAnnotationsToAnnotations,
  mapNlpAnnotationstoReport,
};

function mapNlpAnnotationsToAnnotations(
  nlpAnnotations: nlpAnnotationsType,
): annotationType[] {
  return nlpAnnotations.entities.map(nlpAnnotation =>
    annotationModule.lib.buildAnnotation({
      category: nlpAnnotation.label,
      start: nlpAnnotation.start,
      text: nlpAnnotation.text,
    }),
  );
}

function mapNlpAnnotationstoReport(
  nlpAnnotations: nlpAnnotationsType,
  document: documentType,
): annotationReportType {
  return annotationReportModule.lib.buildAnnotationReport({
    checkList: nlpAnnotations.checklist,
    checkNeeded: nlpAnnotations.check_needed,
    documentId: document._id,
  });
}