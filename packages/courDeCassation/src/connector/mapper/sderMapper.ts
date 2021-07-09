import { decisionType } from 'sder';
import {
  documentType,
  documentModule,
  idModule,
  timeOperator,
} from '@label/core';

export { sderMapper };

const sderMapper = { mapCourtDecisionToDocument };

function mapCourtDecisionToDocument(
  sderCourtDecision: decisionType,
): documentType {
  const title = computeTitleFromParsedCourtDecision({
    number: sderCourtDecision.sourceId,
    chamber: sderCourtDecision.chamberName,
    juridiction: sderCourtDecision.jurisdictionName,
    date: sderCourtDecision.dateDecision
      ? new Date(sderCourtDecision.dateDecision)
      : undefined,
  });

  const chamberName = convertChamberIntoReadableChamberName(
    sderCourtDecision.chamberName,
  );

  const juridiction = computeJuridiction(
    sderCourtDecision.jurisdictionName,
    sderCourtDecision.chamberName,
  );

  const publicationCategory = computePublicationCategory(sderCourtDecision.pubCategory, sderCourtDecision.publication)

  const priority = computePriority(
    sderCourtDecision.sourceName,
    publicationCategory,
  );

  const criticity = computeCriticity();

  return documentModule.lib.buildDocument({
    creationDate: new Date().getTime(),
    criticity,
    decisionMetadata: {
      additionalTermsToAnnotate: sderCourtDecision.occultation?.additionalTerms || '',
      boundDecisionDocumentNumbers: sderCourtDecision.decatt || [],
      categoriesToOmit: sderCourtDecision.occultation?.categoriesToOmit || [],
      chamberName,
      juridiction,
    },
    documentNumber: sderCourtDecision.sourceId,
    externalId: idModule.lib.convertToString(sderCourtDecision._id),
    metadata: '',
    priority,
    publicationCategory,
    source: sderCourtDecision.sourceName,
    title,
    text: sderCourtDecision.originalText,
  });
}

function computeJuridiction(jurisdictionName?: string, chamber?: string) {
  if (
    (!!jurisdictionName &&
      jurisdictionName.toLowerCase() === 'cour de cassation') ||
    (!!chamber && (chamber.match(/CIV\.[1-3]/) || chamber === 'SOC'))
  ) {
    return 'Cour de cassation';
  }
  return '';
}

function computeTitleFromParsedCourtDecision({
  number,
  chamber,
  juridiction,
  date,
}: {
  number?: number;
  chamber?: string;
  juridiction?: string;
  date?: Date;
}) {
  const readableNumber = `Décision n°${number}`;
  const readableChamber = convertChamberIntoReadableChamberName(chamber);
  const readableDate = convertRawDateIntoReadableDate(date);
  const title = [
    readableNumber,
    juridiction,
    readableChamber && `Chambre ${readableChamber.toLowerCase()}`,
    readableDate,
  ]
    .filter(Boolean)
    .join(' · ');
  return title;
}

function computeCriticity() {
  return 1;
}

function computePublicationCategory(pubCategory: string | undefined, publication: string[] | undefined) {
  const publicationCategory: string[] = [];
  if(!!pubCategory) {
    publicationCategory.push(pubCategory);
  }
  if(!!publication) {
    publicationCategory.push(...publication)
  }
  return publicationCategory
}

function convertRawDateIntoReadableDate(rawDate: Date | undefined) {
  if (!rawDate) {
    return undefined;
  }
  if (isNaN(rawDate.getTime())) {
    return undefined;
  }
  return timeOperator.convertTimestampToReadableDate(rawDate.getTime());
}

function convertChamberIntoReadableChamberName(chamber: string | undefined) {
  if (!chamber) {
    return '';
  }
  if (chamber && chamber.match(/CIV\.[1-3]/)) {
    return 'Civile';
  } else if (chamber === 'SOC') {
    return 'Sociale';
  }
  return '';
}

function computePriority(
  source: string,
  publicationCategory: string[],
): documentType['priority'] {
  if (
    documentModule.lib.publicationHandler.mustBePublished(publicationCategory)
  ) {
    return 'high';
  }
  switch (source) {
    case 'jurinet':
      return 'medium';
    default:
      return 'low';
  }
}
