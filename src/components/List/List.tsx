import { useEffect, useState } from "react";
import type { FC } from "react";
import { Checkbox } from "@consta/uikit/Checkbox";
import { SortByProps, Table, TableColumn } from "@consta/uikit/Table";

import { convertToLocalDate } from "../../utils/convertToLocalDate";

import { DocumentsApiService } from "../../services/DocumentsApiService";

import { ENDPOINTS } from "../../constants/api_endpoints";

import type { IDataRows } from "../../types/data";

const List: FC = () => {
  const [rows, setRows] = useState<IDataRows[]>([]);
  const areAllSelected = rows.every((it) => it.checked);

  const columns: TableColumn<(typeof rows)[number]>[] = [
    {
      title: (
        <Checkbox
          size="m"
          checked={areAllSelected}
          onChange={(): void => onChangeAll()}
        />
      ),
      accessor: "checkbox",
      width: 60,
    },
    {
      title: "Название",
      accessor: "name",
      sortable: true,
    },
    {
      title: "Количество",
      accessor: "quantity",
      sortable: true,
      width: 150,
    },
    {
      title: "Дата доставки",
      accessor: "deliveryDate",
      sortable: true,
    },
    {
      title: "Цена",
      accessor: "price",
      sortable: true,
    },
    {
      title: "Валюта",
      accessor: "currency",
      sortable: true,
    },
  ];
  const onChange = (id: string) => {
    setRows((prev) =>
      prev.map((it) => ({
        ...it,
        checked: it.id === id ? !it.checked : it.checked,
      }))
    );
  };
  const onChangeAll = () => {
    setRows((prev) =>
      prev.map((it) => ({
        ...it,
        checked: !areAllSelected,
      }))
    );
  };
  useEffect(() => {
    DocumentsApiService.find(ENDPOINTS.documents1).then((value) =>
      setRows((prev) =>
        prev.concat(
          value.map((it) => ({
            ...it,
            checked: false,
            checkbox: (
              <Checkbox
                size="m"
                checked={false}
                onChange={(): void => onChange(it.id)}
              />
            ),
          }))
        )
      )
    );
    DocumentsApiService.find(ENDPOINTS.documents2).then((value) =>
      setRows((prev) =>
        prev.concat(
          value.map((it) => ({
            ...it,
            checked: false,
            checkbox: (
              <Checkbox
                size="m"
                checked={false}
                onChange={(): void => onChange(it.id)}
              />
            ),
          }))
        )
      )
    );
  }, []);
  function TableSort() {
    const [sortSetting, setSortSetting] =
      useState<SortByProps<IDataRows> | null>(null);

    const sortRows: IDataRows[] = [...rows]
      .sort((a, b) => {
        if (sortSetting?.sortingBy === "name") {
          return (
            (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) *
            (sortSetting.sortOrder === "asc" ? 1 : -1)
          );
        }
        if (sortSetting?.sortingBy === "quantity") {
          const [firstQuantity, secondQuantity] =
            sortSetting.sortOrder === "asc"
              ? [a.quantity, b.quantity]
              : [b.quantity, a.quantity];
          return firstQuantity.valueOf() - secondQuantity.valueOf();
        }
        if (sortSetting?.sortingBy === "deliveryDate") {
          const [firstDate, secondDate] =
            sortSetting.sortOrder === "asc"
              ? [a.deliveryDate, b.deliveryDate]
              : [b.deliveryDate, a.deliveryDate];
          return new Date(firstDate).valueOf() - new Date(secondDate).valueOf();
        }
        if (sortSetting?.sortingBy === "price") {
          const [firstPrice, secondPrice] =
            sortSetting.sortOrder === "asc"
              ? [a.price, b.price]
              : [b.price, a.price];
          return firstPrice.valueOf() - secondPrice.valueOf();
        }
        if (sortSetting?.sortingBy === "currency") {
          return (
            (a.currency.toLowerCase() > b.currency.toLowerCase() ? 1 : -1) *
            (sortSetting.sortOrder === "asc" ? 1 : -1)
          );
        }
        return 0;
      })
      .map((item) => ({
        ...item,
        id: item.id.valueOf(),
        deliveryDate: convertToLocalDate(item.deliveryDate.toString()),
      }));

    return (
      <Table rows={sortRows} columns={columns} onSortBy={setSortSetting} />
    );
  }
  return <div>{rows.length === 0 ? "Loading..." : <TableSort />}</div>;
};

export default List;
