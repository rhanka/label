import { annotationModule } from '../../modules/annotation';
import { documentModule } from '../../modules/document';
import { settingsModule } from '../../modules/settings';
import { buildAnonymizer } from './buildAnonymizer';

describe('buildAnonymizer', () => {
  const settings = settingsModule.lib.buildSettings({
    firstName: { anonymization: '[FIRST_NAME %d]' },
  });
  const anonymizer = buildAnonymizer(settings);
  const annotations = [
    { category: 'firstName', text: 'Benoit', start: 0 },
    { category: 'firstName', text: 'Nicolas', start: 29 },
    { category: 'firstName', text: 'Romain', start: 61 },
  ].map(annotationModule.generator.generate);
  const text = 'Benoit is software engineer. Nicolas is a software engineer. Romain is a designer.';

  describe('anonymizeDocument', () => {
    it('should anonymize a document', () => {
      const document = documentModule.generator.generate({
        text,
      });

      const anonymizedDocument = anonymizer.anonymizeDocument(document, annotations);

      expect(anonymizedDocument.text).toEqual(
        '[FIRST_NAME 1] is software engineer. [FIRST_NAME 2] is a software engineer. [FIRST_NAME 3] is a designer.',
      );
    });
  });

  describe('anonymize', () => {
    it('should anonymize a text with the given settings', () => {
      const anonymizedTexts = annotations.map(anonymizer.anonymize);

      expect(anonymizedTexts[0]).toEqual('[FIRST_NAME 1]');
    });
    it('should anonymize a second text with the given settings', () => {
      const anonymizedTexts = annotations.map(anonymizer.anonymize);

      expect(anonymizedTexts[1]).toEqual('[FIRST_NAME 2]');
    });
    it('should loop over the anonymization text if not enough are provided in the settings', () => {
      const anonymizedTexts = annotations.map(anonymizer.anonymize);

      expect(anonymizedTexts[2]).toEqual('[FIRST_NAME 3]');
    });
    it('should anonymize a text with a default string if the category is not in the settings', () => {
      const annotation = annotationModule.generator.generate({
        category: 'age',
        text: '25',
      });

      const anonymizedText = anonymizer.anonymize(annotation);

      expect(anonymizedText).toEqual('XXX');
    });
    it('should not anonymize a text if the category is set to not anonymized in the setting', () => {
      const anonymizerWithNoAnomization = buildAnonymizer(
        settingsModule.lib.buildSettings({
          professional: { isAnonymized: false },
        }),
      );
      const annotation = annotationModule.generator.generate({
        category: 'professional',
        text: 'Leon',
      });

      const anonymizedText = anonymizerWithNoAnomization.anonymize(annotation);

      expect(anonymizedText).toEqual('Leon');
    });
  });
});
