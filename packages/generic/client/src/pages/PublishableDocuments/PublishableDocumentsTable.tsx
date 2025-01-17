import React from 'react';
import { useHistory } from 'react-router';
import { apiRouteOutType, documentModule, documentType, idModule, timeOperator } from '@label/core';
import { PaginatedTable, tableRowFieldType } from '../../components';
import { wordings } from '../../wordings';
import { apiCaller } from '../../api';
import { routes } from '../routes';

export { PublishableDocumentsTable };

function PublishableDocumentsTable(props: {
  publishableDocuments: apiRouteOutType<'get', 'publishableDocuments'>;
  refetch: () => void;
}) {
  const history = useHistory();
  const fields = buildPublishableDocumentsFields();
  const styles = buildStyles();

  return (
    <div style={styles.container}>
      <PaginatedTable fields={fields} data={props.publishableDocuments} buildOptionItems={buildOptionItems} />
    </div>
  );

  function buildOptionItems(publishableDocument: apiRouteOutType<'get', 'publishableDocuments'>[number]) {
    const openAnonymizedDocumentOptionItem = {
      kind: 'text' as const,
      text: wordings.publishableDocumentsPage.table.optionItems.openAnonymizedDocument,
      onClick: () => {
        history.push(routes.ANONYMIZED_DOCUMENT.getPath(idModule.lib.convertToString(publishableDocument._id)));
        return;
      },
    };

    switch (publishableDocument.status) {
      case 'toBePublished':
        return [
          openAnonymizedDocumentOptionItem,
          {
            kind: 'text' as const,
            text: wordings.publishableDocumentsPage.table.optionItems.markAsPublished,
            onClick: async () => {
              await apiCaller.post<'updatePublishableDocumentStatus'>('updatePublishableDocumentStatus', {
                documentId: publishableDocument._id,
                status: documentModule.lib.getNextStatus({
                  status: publishableDocument.status,
                  publicationCategory: publishableDocument.publicationCategory,
                }) as 'done' | 'toBePublished',
              });
              props.refetch();
            },
          },
        ];
      case 'done':
        return [
          openAnonymizedDocumentOptionItem,
          {
            kind: 'text' as const,
            text: wordings.publishableDocumentsPage.table.optionItems.markAsUnPublished,
            onClick: async () => {
              await apiCaller.post<'updatePublishableDocumentStatus'>('updatePublishableDocumentStatus', {
                documentId: publishableDocument._id,
                status: 'toBePublished',
              });
              props.refetch();
            },
          },
        ];
      default:
        return [];
    }
  }
}

function buildPublishableDocumentsFields() {
  const publishableDocumentsFields: Array<tableRowFieldType<apiRouteOutType<'get', 'publishableDocuments'>[number]>> = [
    {
      id: 'documentNumber',
      title: wordings.publishableDocumentsPage.table.columnTitles.number,
      canBeSorted: true,
      extractor: (publishableDocument) => JSON.stringify(publishableDocument.documentNumber),
      width: 10,
    },
    {
      id: 'status',
      title: wordings.publishableDocumentsPage.table.columnTitles.status,
      canBeSorted: true,
      extractor: (publishableDocument) => computeStatusWording(publishableDocument.status),
      width: 10,
    },
    {
      id: 'creationDate',
      title: wordings.publishableDocumentsPage.table.columnTitles.importDate,
      canBeSorted: true,
      extractor: (publishableDocument) =>
        timeOperator.convertTimestampToReadableDate(publishableDocument.creationDate, true),
      getSortingValue: (publishableDocument) => publishableDocument.creationDate,
      width: 10,
    },
  ];
  return publishableDocumentsFields;
}

function computeStatusWording(status: documentType['status']) {
  switch (status) {
    case 'done':
      return wordings.publishableDocumentsPage.table.status.published;
    case 'toBePublished':
      return wordings.publishableDocumentsPage.table.status.toBePublished;
    default:
      return wordings.publishableDocumentsPage.table.status.notTreated;
  }
}

function buildStyles() {
  return {
    container: {
      height: '100%',
    },
  };
}
