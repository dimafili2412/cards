import React, { useEffect, useRef } from 'react';
import { Backdrop, ModalWrapper, Title, Body, ButtonsContainer } from './Modal.styled';
import Button from '../Button/Button';

const Modal = ({ title, body, onOk, show, onCancel = () => {}, onClose = () => {} }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        if (onCancel) {
          onCancel();
        }
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, onCancel, onClose]);

  if (!show) {
    return null;
  }

  return (
    <>
      <Backdrop onClick={onCancel ? onCancel : onClose} />
      <ModalWrapper ref={modalRef}>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <ButtonsContainer>
          <Button onClick={onOk ? onOk : onClose}>OK</Button>
          <Button onClick={onCancel ? onCancel : onClose}>Cancel</Button>
        </ButtonsContainer>
      </ModalWrapper>
    </>
  );
};

export default Modal;
