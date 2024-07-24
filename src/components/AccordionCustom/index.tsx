// import React, { CSSProperties, ReactNode } from 'react';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import { makeStyles } from '@mui/styles';
// import withStyles from '@mui/styles/withStyles';
// import { colors } from '@src/styles/colors';
// type MakeStylesProps = {
//   titleExpandedColor?: CSSProperties['color'];
//   arrowsColor?: CSSProperties['color'];
// };
// interface AccordionComponentProps {
//   title: string;
//   children: ReactNode;
//   expanded: string | boolean;
//   panel: string;
//   handleChange: (
//     panel: string,
//   ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
//   titleExpandedColor?: MakeStylesProps['titleExpandedColor'];
//   arrowsColor?: MakeStylesProps['arrowsColor'];
// }
// const Accordion = withStyles({
//   root: {
//     borderBottom: '1px solid rgba(0, 0, 0, .325)',
//     boxShadow: 'none',
//     '&:before': {
//       display: 'none',
//     },
//     '&$expanded': {
//       margin: 'auto',
//     },
//   },
//   expanded: {},
// })(MuiAccordion);
// const useStyles = makeStyles({
//   root: {
//     padding: 0,
//     marginBottom: -1,
//     minHeight: 48,
//     color: colors.basic.black,
//     fontSize: '14px',
//     fontWeight: 500,
//     '&$expanded': {
//       minHeight: 48,
//     },
//     '& .MuiButtonBase-root.MuiIconButton-root .MuiSvgIcon-colorPrimary': {
//       color: ({ arrowsColor }: MakeStylesProps) => arrowsColor,
//     },
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {
//     color: ({ titleExpandedColor }: MakeStylesProps) => titleExpandedColor,
//   },
// });
// const AccordionDetails = withStyles((theme) => ({
//   root: {
//     padding: 0,
//     paddingTop: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
// }))(MuiAccordionDetails);
// const AccordionCustom = ({
//   panel,
//   expanded,
//   handleChange,
//   title,
//   children,
//   titleExpandedColor,
//   arrowsColor = colors.success.dark,
// }: AccordionComponentProps) => {
//   const classes = useStyles({ titleExpandedColor, arrowsColor });
//   return (
//     <Accordion
//       expanded={expanded === panel}
//       onChange={handleChange(panel)}
//       classes={{ root: classes.root, expanded: classes.expanded }}
//     >
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls={`${panel}-content`}
//         id={`${panel}-header`}
//         classes={{
//           root: classes.root,
//           content: classes.content,
//           expanded: classes.expanded,
//         }}
//       >
//         <Typography fontWeight={600}>{title}</Typography>
//       </AccordionSummary>
//       <AccordionDetails classes={{ root: classes.root }}>
//         {children}
//       </AccordionDetails>
//     </Accordion>
//   );
// };
// export default AccordionCustom;
import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import { colors } from '@src/styles/colors';

type MakeStylesProps = {
  titleExpandedColor?: string;
  arrowsColor?: string;
};

interface AccordionComponentProps {
  title: string;
  children: React.ReactNode;
  expanded: string | boolean;
  panel: string;
  handleChange: (
    panel: string,
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  titleExpandedColor?: MakeStylesProps['titleExpandedColor'];
  arrowsColor?: MakeStylesProps['arrowsColor'];
}

const Accordion = withStyles({
  root: {
    borderBottom: `1px solid ${colors.text.disabled}`,
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummaryStyled = withStyles((theme) => ({
  root: {
    marginRight: '15px',
    display: 'flex',
    justifyContent: 'space-around',

    '&$expanded': {
      display: 'flex',
    },
  },
  content: {
    margin: '18px 15px',
    '&$expanded': {
      margin: '18px 15px',
    },
  },
  expanded: {},
}))(AccordionSummary);

const AccordionCustom = ({
  panel,
  expanded,
  handleChange,
  title,
  children,
  titleExpandedColor,
}: AccordionComponentProps) => {
  return (
    <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummaryStyled
        expandIcon={
          <Box>
            <ExpandMoreIcon color="primary" />
          </Box>
        }
        aria-controls={`${panel}-content`}
        id={`${panel}-header`}
      >
        <Typography
          fontWeight={600}
          style={{ color: expanded === panel ? titleExpandedColor : undefined }}
        >
          {title}
        </Typography>
      </AccordionSummaryStyled>
      <MuiAccordionDetails>{children}</MuiAccordionDetails>
    </Accordion>
  );
};

export default AccordionCustom;
