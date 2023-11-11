import { useEffect, useState } from "react";
import type { FC } from "react";
import { Loader } from "@consta/uikit/Loader";
import { Popup } from "../Popup/Popup";
import { TableSort } from "../TableSort/TableSort";
import { DocumentsApiService } from "../../services/DocumentsApiService";
import { ENDPOINTS } from "../../constants/api_endpoints";
import type { IDataRows } from "../../types/data";

const List: FC = () => {
  const [data, setData] = useState<IDataRows[]>([]);
  const areAllSelected = data.every((it) => it.checked);
  const total =
    data.length > 0
      ? data.reduce((acc, curr) => {
          return Number(acc) + Number(curr.quantity);
        }, 0)
      : 0;

  const onChange = (id: string) => {
    setData((prev) =>
      prev.map((it) => ({
        ...it,
        checked: it.id === id ? !it.checked : it.checked,
      }))
    );
  };
  const onChangeAll = () => {
    setData((prev) =>
      prev.map((it) => ({
        ...it,
        checked: !areAllSelected,
      }))
    );
  };
  const cancelHandler = (data: any) => {
    DocumentsApiService.delete(ENDPOINTS.cancel, data);
  };
  useEffect(() => {
    DocumentsApiService.find(ENDPOINTS.documents1).then((value) =>
      setData((prev) =>
        prev.concat(
          value.map((it) => ({
            ...it,
            checked: false,
          }))
        )
      )
    );
    DocumentsApiService.find(ENDPOINTS.documents2).then((value) =>
      setData((prev) =>
        prev.concat(
          value.map((it) => ({
            ...it,
            checked: false,
          }))
        )
      )
    );
  }, []);
  return (
    <div>
      {data.length === 0 ? (
        <Loader size="m" />
      ) : (
        <>
          <Popup data={data} cancelHandler={cancelHandler} />
          <TableSort
            data={data}
            total={total}
            areAllSelected={areAllSelected}
            onChange={onChange}
            onChangeAll={onChangeAll}
          />
        </>
      )}
    </div>
  );
};

export default List;
