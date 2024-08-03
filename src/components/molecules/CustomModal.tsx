import { Button, Modal } from "antd";
import React from "react";

interface CustomModalProp {
  isOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
}
const CustomModal: React.FC<CustomModalProp> = ({
  isOpen,
  handleCancel,
  handleOk,
  children,
  title,
  isLoading,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            typeof="submit"
            loading={isLoading}
            onClick={handleOk}
          >
            Make Payment
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
