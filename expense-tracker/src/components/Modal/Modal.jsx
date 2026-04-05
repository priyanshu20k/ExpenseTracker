import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
const ModalWrapper = ({ isOpen, setIsOpen, children }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const customStyles = {
    content:{
      background: 'rgba(239,239,239,0.85)',
      border: '0',
      borderRadius: '15px',
      transform: 'translateX(-50%) translateY(-50%)',
      width:'95%',
      maxWidth:'585px',
      top:'50%',
      left:'50%',
      height:'fit-content',
      maxHeight:'90vh',
      padding:'2rem'
    }
  } 
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} shouldCloseOnOverlayClick={true} style={customStyles}>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
