import React from 'react';
import { Modal } from 'semantic-ui-react';
import { AddEntryForm, NewEntry } from './AddEntryForm';

interface ModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  onSubmit: (values: NewEntry) => Promise<void>;
}

const AddEntryModal: React.FC<ModalProps> = ({
  modalOpen,
  closeModal,
  onSubmit
}) => {
  if (modalOpen) {
    return (
      <Modal open={modalOpen} onClose={closeModal} closeIcon>
        <Modal.Header>Add new entry</Modal.Header>
        <Modal.Content>
          <AddEntryForm onCancel={closeModal} onSubmit={onSubmit} />
        </Modal.Content>
      </Modal>
    );
  }
  return <div>MODAL CLOZED</div>;
};

export default AddEntryModal;
