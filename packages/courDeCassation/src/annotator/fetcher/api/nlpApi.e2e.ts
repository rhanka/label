import { documentModule, settingsModule } from '@label/core';
import { buildNlpApi } from './nlpApi';

describe('nlpApi', () => {
  const nlpApi = buildNlpApi('http://127.0.0.1:8081');
  it('should fetch the annotations of a given document', async () => {
    const settings = settingsModule.lib.buildSettings({
      personnePhysiquePrenom: {},
      personnePhysiqueNom: {},
      adresse: {},
    });
    const document = documentModule.generator.generate({
      source: 'jurinet',
      text: 'François Dubois est Français. Il habite avenue des champs Élysée.',
    });

    const nlpAnnotation = await nlpApi.fetchNlpAnnotations(settings, document);

    expect(nlpAnnotation.entities).toEqual([
      {
        text: 'François',
        start: 0,
        end: 8,
        label: 'personnePhysiquePrenom',
        source: 'NER model',
      },
      {
        text: 'Dubois',
        start: 9,
        end: 15,
        label: 'personnePhysiqueNom',
        source: 'NER model',
      },
      {
        text: 'avenue des champs Élysée',
        start: 40,
        end: 64,
        label: 'adresse',
        source: 'NER model',
      },
    ]);
  });

  it('should not fetch the annotations of unwanted category of a given document', async () => {
    const settings = settingsModule.lib.buildSettings({
      adresse: {},
    });
    const document = documentModule.generator.generate({
      source: 'jurinet',
      text: 'François Dubois est Français. Il habite avenue des champs Élysée.',
    });

    const nlpAnnotation = await nlpApi.fetchNlpAnnotations(settings, document);

    expect(nlpAnnotation.entities).toEqual([
      {
        text: 'avenue des champs Élysée',
        start: 40,
        end: 64,
        label: 'adresse',
        source: 'NER model',
      },
    ]);
  });
});
