import React, { CSSProperties, ReactElement } from 'react';
import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, makeStyles } from '@material-ui/core';

export { Accordion };

function Accordion(props: {
  headerStyle?: CSSProperties;
  header: ReactElement;
  body: ReactElement;
  onChange: (expanded: boolean) => void;
  style?: CSSProperties;
}): ReactElement {
  const accordionHeaderClasses = buildAccordionHeaderClasses();

  return (
    <MuiAccordion onChange={(_event, expanded) => props.onChange(expanded)} style={props.style}>
      <AccordionSummary
        classes={{
          content: accordionHeaderClasses.content,
          expanded: accordionHeaderClasses.expanded,
        }}
        style={props.headerStyle}
      >
        {props.header}
      </AccordionSummary>
      <AccordionDetails>{props.body}</AccordionDetails>
    </MuiAccordion>
  );
}

function buildAccordionHeaderClasses() {
  return makeStyles({
    content: {
      margin: 0,
      '&$expanded': {
        margin: '0',
      },
    },
    expanded: {},
  })();
}
