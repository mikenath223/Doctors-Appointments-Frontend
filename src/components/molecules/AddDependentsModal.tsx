import { Button, Modal } from "antd";
import React from "react";

interface CustomModalProp {
  isOpen: boolean;
  handleCancel: () => void;
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
}
const AddDependentsModal: React.FC<CustomModalProp> = ({
  isOpen,
  handleCancel,
  children,
  title,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={isOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default AddDependentsModal;
