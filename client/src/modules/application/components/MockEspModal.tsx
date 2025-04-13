import { Modal } from "antd";
import { FC } from "react";
import mockEsp from "@/assets/esp-mock.webp";

interface MockEspModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const MockEspModal: FC<MockEspModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={null}
      className="overflow-hidden"
    >
      <div className="relative w-[470px] min-w-[470px]">
        <img src={mockEsp} alt="mock-esp" className="w-[470px] min-w-[470px]" />
        <div
          className="absolute right-0 top-0 z-10 h-[20px] w-[20px] cursor-pointer"
          onClick={onClose}
        />
        <div
          className="absolute bottom-[64px] right-[10px] z-10 h-[27px] w-[150px] cursor-pointer"
          onClick={onClose}
        />
        <div
          className="absolute bottom-[64px] right-[160px] z-10 h-[27px] w-[150px] cursor-pointer"
          onClick={onSubmit}
        />
      </div>
    </Modal>
  );
};
