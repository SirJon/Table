import { useState } from "react";
import type { FC } from "react";
import { Modal } from "@consta/uikit/Modal";
import { Button } from "@consta/uikit/Button";
import type { IDataRows } from "../../types/data";
import "./Popup.scss";

interface IPropsPopup {
  data: IDataRows[];
  cancelHandler: (data: any) => void;
}

export const Popup: FC<IPropsPopup> = ({ data, cancelHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkedData = data.filter((it) => it.checked);
  return (
    <div>
      <Button
        size="m"
        view="primary"
        label="Анулировать"
        width="default"
        disabled={checkedData.length === 0}
        onClick={() => {
          checkedData.length === 0 ? null : setIsModalOpen(true);
        }}
      />
      <Modal
        className="modal"
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
        <div className="modal__content">
          <p className="modal__text">
            Вы уверены что хотите аннулировать{" "}
            {checkedData.length === 1 ? " товар" : " товары"}:{" "}
            {checkedData.map((it) => it.name).join(", ")}?
          </p>
          <div className="modal__buttons">
            <Button
              size="m"
              view="primary"
              label="Применить"
              width="default"
              onClick={() => {
                cancelHandler(checkedData.map((it) => it.id));
                setIsModalOpen(false);
              }}
            />
            <Button
              size="m"
              view="primary"
              label="Отклонить"
              width="default"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
