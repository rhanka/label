import { createContext, useContext, useState } from 'react';
import { fetchedAnnotationType } from '@label/core';

export { DocumentViewerModeHandlerContext, useDocumentViewerModeHandler, useDocumentViewerModeHandlerContext };

export type { viewerModeType };

type viewerModeType =
  | { kind: 'annotation'; isAnonymized: boolean }
  | { kind: 'occurrence'; entityId: fetchedAnnotationType['entityId']; isAnonymized: boolean }
  | { kind: 'resize'; annotation: fetchedAnnotationType };

type documentViewerModeHandlerType = {
  isAnonymizedView: () => boolean;
  resetViewerMode: () => void;
  setResizeMode: (annotation: fetchedAnnotationType) => void;
  setOccurrenceMode: (entityId: fetchedAnnotationType['entityId']) => void;
  setViewerMode: (documentViewerMode: viewerModeType) => void;
  switchAnonymizedView: () => void;
  documentViewerMode: viewerModeType;
};

const DEFAULT_VIEWER_MODE: viewerModeType = { kind: 'annotation', isAnonymized: false };

const DocumentViewerModeHandlerContext = createContext<documentViewerModeHandlerType>({
  isAnonymizedView: () => false,
  resetViewerMode: () => null,
  setOccurrenceMode: () => null,
  setResizeMode: () => null,
  setViewerMode: () => null,
  switchAnonymizedView: () => null,
  documentViewerMode: DEFAULT_VIEWER_MODE,
});

function useDocumentViewerModeHandler() {
  return useContext(DocumentViewerModeHandlerContext);
}

function useDocumentViewerModeHandlerContext(): documentViewerModeHandlerType {
  const [documentViewerMode, setViewerMode] = useState<viewerModeType>(DEFAULT_VIEWER_MODE);
  return buildDocumentViewerModeHandlerContext(documentViewerMode, setViewerMode);
}

function buildDocumentViewerModeHandlerContext(
  documentViewerMode: viewerModeType,
  setViewerMode: (documentViewerMode: viewerModeType) => void,
): documentViewerModeHandlerType {
  return {
    isAnonymizedView,
    setOccurrenceMode,
    setResizeMode,
    switchAnonymizedView,
    setViewerMode,
    documentViewerMode,
    resetViewerMode,
  };

  function resetViewerMode() {
    setViewerMode(DEFAULT_VIEWER_MODE);
  }

  function isAnonymizedView() {
    switch (documentViewerMode.kind) {
      case 'annotation':
      case 'occurrence':
        return documentViewerMode.isAnonymized;
      case 'resize':
        return false;
    }
  }

  function setOccurrenceMode(entityId: fetchedAnnotationType['entityId']) {
    switch (documentViewerMode.kind) {
      case 'annotation':
      case 'occurrence':
        setViewerMode({ kind: 'occurrence', entityId, isAnonymized: documentViewerMode.isAnonymized });
    }
  }

  function setResizeMode(annotation: fetchedAnnotationType) {
    switch (documentViewerMode.kind) {
      case 'annotation':
      case 'occurrence':
        !documentViewerMode.isAnonymized && setViewerMode({ kind: 'resize', annotation });
    }
  }

  function switchAnonymizedView() {
    switch (documentViewerMode.kind) {
      case 'annotation':
      case 'occurrence':
        setViewerMode({ kind: 'annotation', isAnonymized: !documentViewerMode.isAnonymized });
    }
  }
}
