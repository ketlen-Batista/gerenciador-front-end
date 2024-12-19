// import React, { ReactNode } from 'react';
// import { Box, Button } from '@mui/material';
// import { colors } from '@src/styles/colors';
// import CircularProgress from '@src/components/CircularProgress';
// import FullScreenDialog from '@src/components/FullScreenDialog';
// interface ModalConfirmCertificateApproveProps {
//   openDialog: boolean;
//   handleClose: () => void;
//   handleConfirm: () => void;
//   textButtonConfirm: string;
//   isLoading?: boolean;
//   text?: string;
//   maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
//   titleModal?: string;
//   colorButtonConfirm?: ReactNode;
//   body?: ReactNode;
// }
// const ModalConfirmCertificateApprove = ({
//   openDialog,
//   handleClose,
//   handleConfirm,
//   textButtonConfirm,
//   isLoading = false,
//   text,
//   maxWidth = 'md',
//   titleModal = '',
//   colorButtonConfirm = colors.success.dark,
//   body,
// }: ModalConfirmCertificateApproveProps) => {
//   return (
//     <FullScreenDialog
//       open={openDialog}
//       onClose={handleClose}
//       maxWidth={maxWidth}
//       closeButtonPosition={'right'}
//       title={titleModal}
//       fullWidth
//       style={{ zIndex: 9999 }}
//       extraFooterComponent={
//         <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
//           <Box color={colors.basic.black}>
//             <Button onClick={handleClose} color="inherit" variant="outlined">
//               Cancelar
//             </Button>
//           </Box>
//           <Box color={colorButtonConfirm as string}>
//             <Button onClick={handleConfirm} color="inherit" variant="outlined">
//               {isLoading ? (
//                 <CircularProgress size="small" color="inherit" />
//               ) : (
//                 textButtonConfirm
//               )}
//             </Button>
//           </Box>
//         </Box>
//       }
//     >
//       <Box
//         display="flex"
//         justifyContent="center"
//         my={5}
//         mx={2}
//         flexDirection="column"
//       >
//         <Box
//           display="flex"
//           fontSize="24px"
//           fontWeight={500}
//           alignItems="center"
//           justifyContent="center"
//           width={'100%'}
//         >
//           {text ?? 'Tem certeza que deseja realizar esta ação?'}
//         </Box>
//         <Box
//           display="flex"
//           fontSize="16px"
//           fontWeight={400}
//           alignItems="center"
//           justifyContent="center"
//           width={'100%'}
//           color={colors.chip.enableBorder}
//         >
//           {'Confira as datas e horários antes de prosseguir:'}
//         </Box>
//         {body ?? null}
//       </Box>
//     </FullScreenDialog>
//   );
// };
// export default ModalConfirmCertificateApprove;
import React, { ReactNode, useMemo } from 'react';

import { Box, Button, CircularProgress } from '@mui/material';
import { colors } from '@src/styles/colors';

import FullScreenDialog from '@src/components/FullScreenDialog';

interface ModalConfirmCertificateApproveProps {
  openDialog: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  textButtonConfirm: string;
  isLoading?: boolean;
  text?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
  titleModal?: string;
  colorButtonConfirm?: string; // Alterado para string para evitar conversões
  body?: ReactNode;
}

const ModalConfirmCertificateApprove = ({
  openDialog,
  handleClose,
  handleConfirm,
  textButtonConfirm,
  isLoading = false,
  text,
  maxWidth = 'md',
  titleModal = '',
  colorButtonConfirm = colors.success.dark,
  body,
}: ModalConfirmCertificateApproveProps) => {
  // Memoizando o conteúdo do body para evitar renderizações desnecessárias
  const memoizedBody = useMemo(() => body, [body]);

  return (
    <FullScreenDialog
      open={openDialog}
      onClose={handleClose}
      maxWidth={maxWidth}
      closeButtonPosition="right"
      title={titleModal}
      fullWidth
      style={{ zIndex: 9999 }}
      extraFooterComponent={
        <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
          <Box color={colors.basic.black}>
            <Button onClick={handleClose} color="inherit" variant="outlined">
              Cancelar
            </Button>
          </Box>

          <Box color={colorButtonConfirm}>
            <Button onClick={handleConfirm} variant="contained">
              {isLoading ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                textButtonConfirm
              )}
            </Button>
          </Box>
        </Box>
      }
    >
      <Box
        display="flex"
        justifyContent="center"
        my={5}
        mx={2}
        flexDirection="column"
      >
        <Box
          display="flex"
          fontSize="24px"
          fontWeight={500}
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          {text ?? 'Tem certeza que deseja realizar esta ação?'}
        </Box>
        <Box
          display="flex"
          fontSize="16px"
          fontWeight={400}
          alignItems="center"
          justifyContent="center"
          width="100%"
          color={colors.chip.enableBorder}
        >
          {'Confira as datas e horários antes de prosseguir:'}
        </Box>
        {memoizedBody ?? null}
      </Box>
    </FullScreenDialog>
  );
};

export default React.memo(ModalConfirmCertificateApprove);
