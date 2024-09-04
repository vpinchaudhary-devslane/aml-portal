import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import MatModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heading?: React.ReactNode;
  className?: string;
};

const Modal: React.FC<Props> = ({
  open,
  onClose,
  children,
  heading,
  className,
}) => (
  <MatModal
    aria-labelledby='transition-modal-title'
    aria-describedby='transition-modal-description'
    open={open}
    onClose={onClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={open}>
      <Box
        className={cx(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 p-8 rounded-lg bg-white',
          className
        )}
      >
        <IconButton className='!absolute right-4 top-4 !p-0' onClick={onClose}>
          <CloseIcon className='!h-[18px] !w-[18px] text-black' />
        </IconButton>
        <div className='flex flex-col gap-3'>
          {heading && <p className='text-2xl font-bold'>{heading}</p>}
          <div>{children}</div>
        </div>
      </Box>
    </Fade>
  </MatModal>
);

export default Modal;
