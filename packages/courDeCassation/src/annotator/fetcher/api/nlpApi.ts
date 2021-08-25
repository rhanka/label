import axios from 'axios';
import { settingsModule } from '@label/core';
import { nlpApiType, nlpAnnotationsType } from './nlpApiType';

export { buildNlpApi };

type nlpRequestParametersType = {
  idDocument: number;
  text: string;
  source?: string;
  meta?: string;
  categories?: string[];
};

function buildNlpApi(nlpApiBaseUrl: string): nlpApiType {
  return {
    async fetchNlpAnnotations(settings, document) {
      const filteredSettings = settingsModule.lib.computeFilteredSettings(
        settings,
        document.decisionMetadata.categoriesToOmit,
        document.decisionMetadata.additionalTermsToAnnotate,
      );
      const nlpRequestParameters: nlpRequestParametersType = {
        idDocument: document.documentNumber,
        text: document.text,
        source: document.source,
        meta: document.metadata !== '' ? document.metadata : undefined,
        categories: settingsModule.lib.getCategories(filteredSettings, [
          'alwaysVisible',
          'annotable',
        ]),
      };

      const response = await axios({
        data: nlpRequestParameters,
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        url: `${nlpApiBaseUrl}/ner`,
      });

      return response.data as nlpAnnotationsType;
    },
  };
}
