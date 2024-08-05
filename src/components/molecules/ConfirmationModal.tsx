import { Button, Modal } from "antd";

interface ConfirmationModalProp {
  isOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
}
const ConfirmationModal: React.FC<ConfirmationModalProp> = ({
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
            className="bg-green-600 hover:!bg-green-700"
            loading={isLoading}
            onClick={handleOk}
          >
            Confirm
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default ConfirmationModal;
