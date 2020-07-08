import React from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

const RatingSuccessDialog = ({ isOpen, nickname, handleRatingSuccess }) => {
  const handleDialogClose = () => {
    handleRatingSuccess();
  };
  return (
    <>
      <Dialog
        open={isOpen}
        // onClose={handleClose} // Dim 영역 클릭시 close 기능
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box style={{ width: '100%', height: 'auto' }}>
          <iframe
            src="https://giphy.com/embed/2yqYbPakQKDFhNZbW9"
            width="100%"
            height="auto"
            frameBorder="0"
            title="success-gif"
            allowFullScreen
          />
        </Box>

        <DialogTitle id="alert-dialog-title">이 정도면 충분해요!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`소중한 평가 감사합니다. 이제 ${nickname}님을 위한 추천 음악을 즐기러 가볼까요?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            size="large"
            onClick={handleDialogClose}
            autoFocus
          >
            홈으로
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RatingSuccessDialog;
