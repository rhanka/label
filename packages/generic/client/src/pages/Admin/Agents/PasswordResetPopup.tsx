import React from 'react';
import { ButtonWithIcon, PopUp, Text } from '../../../components';
import { customThemeType, useCustomTheme } from '../../../styles';
import { wordings } from '../../../wordings';

export { PasswordResetPopup };

function PasswordResetPopup(props: { password: string; onClose: () => void }) {
  const theme = useCustomTheme();
  const styles = buildStyles(theme);

  return (
    <PopUp>
      <div style={styles.textContainer}>
        <Text>{wordings.agentsPage.table.passwordResetPopup.passwordResetConfirmation}</Text>
        <br />
        <Text>{wordings.agentsPage.table.passwordResetPopup.passwordIndication}</Text>
      </div>
      <div style={styles.passwordContainer}>
        <Text variant="h1">{props.password}</Text>
      </div>
      <div style={styles.buttonContainer}>
        <ButtonWithIcon
          onClick={props.onClose}
          iconName="edit"
          text={wordings.agentsPage.table.passwordResetPopup.button}
          color="primary"
        />
      </div>
    </PopUp>
  );
}

function buildStyles(theme: customThemeType) {
  return {
    textContainer: { marginBottom: theme.spacing * 9 },
    passwordContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing * 8,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  };
}
