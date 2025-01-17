export { fr };

const fr = {
  workingUsersPage: {
    header: {
      title: 'Administration',
      subtitle: 'Gestion des agents',
    },
    createWorkingUserDrawer: {
      title: 'Créer un agent',
      fields: {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        role: 'Sélectionnez un rôle',
      },
      submit: "Créer l'agent",
      createdWorkingUserPopup: {
        createdWorkingUserConfirmation: "L'agent a bien été créé.",
        passwordIndication:
          'Veuillez noter et lui transmettre le mot de passe temporaire suivant. Ce mot de passe doit être changé dès la première connexion afin d’assurer la sécurité du système.',
        button: "C'est noté",
      },
    },
    table: {
      columnTitles: {
        name: 'Nom',
        email: 'E-mail',
        role: 'Habilitation',
      },
      optionItems: {
        activate: 'Activer',
        deactivate: 'Désactiver',
        delete: 'Supprimer...',
        resetPassword: 'Réinitialiser le mot de passe',
      },
      deleteUserConfirmationPopup: {
        text:
          'Cette action supprimera cet utilisateur. Ses statistiques seront cependant toujours présentes en base de données. Cette action est irréversible, souhaitez-vous continuer ?',
      },
      passwordResetSuccessPopup: {
        passwordResetConfirmation: 'Le mot de passe a bien été réinitialisé',
        passwordIndication:
          'Veuillez noter et lui transmettre son nouveau mot de passe ci-après. Ce mot de passe doit être changé dès la première connexion afin d’assurer la sécurité du système.',
        button: "C'est noté",
      },
      passwordResetConfirmationPopup: {
        text:
          "Cette action supprimera l'ancien mot de passe et vous affichera un nouveau mot de passe que vous devrez transmettre à l'agent.",
      },
      roles: {
        admin: 'Administrateur',
        annotator: 'Annotateur',
        publicator: 'Publicateur',
      },
    },
  },
  business: {
    account: 'Compte',
    adminViews: {
      label: 'Choisir une vue',
      values: {
        admin: 'Vue administrateur',
        annotator: 'Vue annotateur',
        publicator: 'Vue publicateur',
      },
    },
    changePassword: 'Modifier le mot de passe',
    confirmPassword: 'Confirmer le nouveau mot de passe',
    decisionNumberPlaceholder: 'Rechercher...',
    decisionNumberHint: 'Numéro de décision à rechercher',
    documentReviewStatus: {
      none: { iconTooltip: 'Non revue', filter: 'Décisions non revues' },
      read: { iconTooltip: 'Revue', filter: 'Décisions revues' },
      amended: { iconTooltip: 'Revue et modifiée', filter: 'Décisions revues et modifiées' },
    },
    documentStatus: {
      loaded: 'Chargé depuis la base SDER',
      nlpAnnotating: "En cours d'annotation par le moteur NLP",
      free: 'Disponible pour être annoté',
      pending: 'Assigné à un agent',
      saved: 'En cours de traitement par un agent',
      toBePublished: 'Doit être publié',
      done: 'Validé',
      rejected: 'Bloqué',
    },
    errors: {
      noUserIdFound:
        'Une erreur est survenue lors de votre identification. Veuillez vous déconnecter et vous reconnecter.',
      assignDocumentFailed: 'La réassignation du document a échoué. Veuillez recharger la page.',
      deleteHumanTreatmentsByDocumentIdFailed:
        'La suppression des traitements manuels effectués sur ce document a échoué. Veuillez recharger la page.',
      updateDocumentStatusFailed: 'La mise à jour du statut du document a échoué. Veuillez recharger la page.',
      updateTreatmentFailed: 'La mise à jour des annotations pour ce traitement a échoué. Veuillez recharger la page.',
    },
    filters: {
      button: 'Filtrer',
      chips: {
        mustHaveSubAnnotations: 'Avec sous-annotations',
        mustHaveSurAnnotations: 'Avec sur-annotations',
      },
      intervalDate: {
        start: 'Date début',
        end: 'Date fin',
      },
    },
    problemReportType: { bug: 'Bug', annotationProblem: "Problème lié à l'annotation", suggestion: 'Suggestion' },
    newPassword: 'Nouveau mot de passe',
    newPasswordsDontMatch: 'Les nouveaux mots de passe ne correspondent pas',
    newPasswordInstructions:
      'Le mot de passe doit contenir au moins 8 caractères dont 2 minuscules, 2 majuscules, 2 chiffres et 2 caractères spéciaux',
    previousPassword: 'Ancien mot de passe',
    update: 'Mettre à jour',
    wrongPassword: 'Le mot de passe est erroné',
  },
  homePage: {
    anonymisedView: 'Vue anonymisée',
    applyEveryWhere: 'Appliquer à tous',
    askedAnnotations: 'Annotations demandées',
    category: 'Catégorie',
    changeCategory: 'Changer de catégorie',
    close: 'Fermer',
    describeTheProblem: 'Décrivez le problème. Soyez exhaustif.',
    delete: 'Supprimer',
    deletionOption: {
      annotation: 'Annotation seule',
      representative: 'Représentant seul ({count} annot.)',
      entity: "Supprimer toute l'entité",
    },
    documentSelector: {
      publishedDocumentTitle: 'Cette décision sera publiée',
      genericDocumentInfoEntries: {
        annotations: 'Annotations',
        entities: 'Entités',
        linkedEntities: "Liaison d'entités",
        wordCount: 'Mots',
      },
      specificDocumentInfoEntries: {
        decisionNumber: 'N° de décision',
        chamberName: 'Chambre',
      },
      noDocumentLeft: "Il n'y a plus de documents à traiter pour le moment...",
      pleaseRefresh: 'Veuillez rafraîchir la page',
      start: 'Commencer',
      unknownJuridiction: 'Juridiction non précisée',
    },
    identicalOccurrencesSpotted: 'occurence(s) identique(s) détectée(s)',
    link: 'Créer une liaison',
    originalText: 'Texte original',
    problemIsBlocking: `Ce problème m'empêche de terminer l'annotation du document.`,
    problemType: 'Type de problème',
    pseudonymisation: 'Pseudonymisation',
    publishedDocument: 'Cette décision sera publiée',
    redo: 'Rétablir',
    reportProblem: 'Signaler un problème',
    reset: 'Réinitialiser',
    send: 'Envoyer',
    undo: 'Annuler',
    unlink: 'Supprimer la liaison',
    unlinkOption: {
      __one__: 'Cette liaison',
      __all__: 'Toutes les liaisons',
    },
    validate: 'Valider',
  },
  loginPage: {
    login: 'Connexion',
    email: 'E-mail',
    forgottenPassword: "En cas d'oubli de votre mot de passe, veuillez contacter votre administrateur.",
    password: 'Mot de passe',
    pleaseTryAgain: 'Veuillez réessayer.',
    wrongEmailOrPassword: "L'email et/ou le mot de passe sont erronés.",
  },
  errorPage: 'Une erreur est survenue...',
  shared: {
    daysOfWeek: {
      monday: 'L',
      tuesday: 'M',
      wednesday: 'M',
      thursday: 'J',
      friday: 'V',
      saturday: 'S',
      sunday: 'D',
    },
    intervalDate: {
      startDate: 'depuis le {startDate}',
      endDate: "jusqu'au {endDate}",
      both: 'du {startDate} au {endDate}',
      sameDay: 'le {date}',
    },
    back: 'Précédent',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    copyToClipboard: 'Copier dans le presse-papier',
    logout: 'Se déconnecter',
    refresh: 'Rafraîchir',
    moreOptions: "Plus d'options",
    passwordChangedConfirmation: { text: 'Votre mot de passe a été modifié.', button: 'OK' },
    settingsDrawer: {
      displayMode: "Type d'affichage",
      darkMode: 'Mode sombre',
      lightMode: 'Mode lumineux',
      title: 'Réglages',
    },
  },
  loadingPage: 'Veuillez patienter...',
  problemReportsPage: {
    header: {
      title: 'Administration',
      subtitle: 'Alertes',
    },
    table: {
      columnTitles: {
        workingUser: 'Agent',
        date: 'Date',
        number: 'N° décision',
        status: 'Statut',
        text: 'Message',
        type: 'Type',
      },
      optionItems: {
        answerByEmail: 'Répondre par email...',
        deleteProblemReport: "Supprimer l'alerte",
        openDocument: 'Ouvrir la décision...',
        reassignToWorkingUser: "Renvoyer à l'agent",
        validate: 'Valider la décision',
      },
      mailSubject: 'Alerte sur le document {documentNumber}',
    },
  },
  resetPasswordPage: {
    popup:
      "Votre mot de passe n'a pas été mis à jour depuis plus de 6 mois. Pour des raisons de sécurité, il vous est demandé d'en renseigner un nouveau respectant les règles du PSSI.",
  },
  publishableDocumentsPage: {
    title: 'Arrêts P',
    table: {
      columnTitles: {
        number: 'N° décision',
        status: 'Statut',
        importDate: "Date d'import",
      },
      status: {
        notTreated: 'En traitement',
        toBePublished: 'À publier',
        published: 'Publié',
      },
      optionItems: {
        openAnonymizedDocument: 'Ouvrir la décision anonymisée...',
        markAsPublished: 'Marquer comme publiée',
        markAsUnPublished: 'Marquer comme à publier',
      },
    },
  },
  statisticsPage: {
    header: {
      title: 'Administration',
      subtitle: 'Statistiques',
    },
    treatedDecisions: 'Décisions traitées',
    filter: {
      fields: {
        workingUser: 'Agent',
        mustHaveSubAnnotations: 'Avec sous-annotations',
        mustHaveSurAnnotations: 'Avec sur-annotations',
        publicationCategory: 'Diffusion',
        source: 'Base de données source',
      },
    },
  },
  treatedDocumentsPage: {
    header: {
      title: 'Administration',
      subtitle: 'Décisions traitées',
    },
    table: {
      resetDocumentConfirmationPopup: {
        text:
          'Cette action va supprimer toutes les corrections effectuées par les agents et renvoyer la décision dans le flux à traiter.\nÊtes-vous sûr de vouloir effectuer cette opération ?',
      },
      annotationDiffDrawer: {
        title: 'Modifications',
        subtitle: 'Décision n° {documentNumber}, traitée par {userName}',
      },
      filter: {
        exportButton: 'Exporter',
        resultsCount: '{count} décisions affichées',
        chips: {
          mustHaveSurAnnotations: 'Avec sur annotation',
          mustHaveSubAnnotations: 'Avec sous annotation',
          source: 'BDD {source}',
          startDate: '> {startDate}',
          endDate: '< {endDate}',
        },
        fields: {
          workingUser: 'Agent',
          mustHaveSurAnnotations: 'Avec sur annotation',
          mustHaveSubAnnotations: 'Avec sous annotation',
          startDate: 'Date début',
          endDate: 'Date fin',
          source: 'Source',
          publicationCategoryLetter: 'Diffusion',
          documentReviewStatus: 'Statut de revue',
        },
      },
      columnTitles: {
        number: { title: 'N° décision', tooltipText: 'Numéro de la décision' },
        occultationBlock: { title: 'Bloc', tooltipText: "Bloc d'occultation" },
        publicationCategory: { title: 'Dif.', tooltipText: 'Type de diffusion' },
        session: { title: 'Formation', tooltipText: 'Acronyme de la formation' },
        source: { title: 'Source', tooltipText: 'Base de données source' },
        workingUser: { title: 'Agent', tooltipText: 'Agent principal' },
        reviewStatus: { title: 'Relecture', tooltipText: 'Statut de relecture' },
        date: 'Traité le',
        surAnnotationsCount: { title: 'Sur.', tooltipText: 'Nombre de sur-annotations' },
        subAnnotationsSensitiveCount: {
          title: 'Sous. (sens.)',
          tooltipText: 'Nombre de sous-annotations sensibles',
        },
        subAnnotationsNonSensitiveCount: {
          title: 'Sous. (autres)',
          tooltipText: 'Nombre de sous-annotations non sensibles',
        },
        duration: { title: 'Tps', tooltipText: 'Temps de traitement (agent principal)' },
      },
      statistics: {
        computation: {
          total: 'Total',
          average: 'Moyenne',
        },
        fields: {
          annotationsCount: 'Annotations',
          surAnnotationsCount: 'Sur.',
          subAnnotationsSensitiveCount: 'Sous. (sens.)',
          subAnnotationsNonSensitiveCount: 'Sous. (autres)',
          treatmentDuration: 'Temps de traitement',
          wordsCount: 'Mots',
        },
      },
      optionItems: {
        openDocument: 'Ouvrir la décision...',
        displayAnnotationDiff: 'Afficher les modifications',
        resetTheDocument: 'Réinitialiser la décision',
      },
    },
  },
  untreatedDocumentsPage: {
    header: {
      title: 'Administration',
      subtitle: 'Flux de décisions',
    },
    table: {
      assignDocumentConfirmationPopup: {
        text:
          "Cette action supprimera les annotations effectuées au préalable sur ce document, et vous assignera ensuite ce document pour traitement. Si l'utilisateur était en train d'annoter le document, il devra recharger la page. Souhaitez-vous continuer ?",
      },
      columnTitles: {
        number: 'N° décision',
        occultationBlock: { title: 'Bloc', tooltipText: "Bloc d'occultation" },
        publicationCategory: { title: 'Dif.', tooltipText: 'Type de diffusion' },
        session: { title: 'Formation', tooltipText: 'Acronyme de la formation' },
        source: { title: 'Source', tooltipText: 'Base de données source' },
        userName: 'Attribué à',
        status: 'Statut',
        importDate: "Date d'import",
      },
      optionItems: {
        assignToMyself: "M'assigner la décision",
        assignToWorkingUser: {
          label: 'Assigner à un agent',
          description: 'A quel agent souhaitez-vous assigner la décision ?',
          dropdownLabel: "Nom de l'agent",
        },
        freeDocument: 'Libérer la décision',
        openAnonymizedDocument: 'Ouvrir la décision anonymisée...',
      },
      filter: {
        resultsCount: '{count} décisions affichées',
        chips: {
          publicationCategoryLetter: 'Arrêts {publicationCategoryLetter}',
          source: 'BDD {source}',
        },
        fields: {
          publicationCategoryLetter: 'Diffusion',
          source: 'Source',
        },
      },
    },
  },
};
