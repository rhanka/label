#!/bin/sh

cd packages/courDeCassation
echo "Init a fresh test Db"
RUN_MODE=LOCAL node dist/scripts/initializeTestDb.js  -e environments/localEnvironment.json -s settings/settings.json
echo "Import the documents from SDER database"
RUN_MODE=LOCAL node dist/crons/importAllDocumentsFromSder.js  -e environments/localEnvironment.json -s settings/settings.json
echo "Annotate all the documents with the NLP engine"
RUN_MODE=LOCAL node dist/crons/annotateDocumentsWithoutAnnotationsWithNlp.js  -e environments/localEnvironment.json -s settings/settings.json
cd ../../
