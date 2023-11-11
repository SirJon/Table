import { useState } from "react";
import type { FC } from "react";
import { Checkbox } from "@consta/uikit/Checkbox";
import { Table } from "@consta/uikit/Table";
import type { SortByProps, TableColumn } from "@consta/uikit/Table";
import { Currency } from "../../types/data";
import type { IDataRows, IDataRowsRender } from "../../types/data";
import { convertToLocalDate } from "../../utils/convertToLocalDate";

interface IPropsTableSort {
  data: IDataRows[];
  total: number;
  areAllSelected: boolean;
  onChangeAll: () => void;
  onChange: (id: string) => void;
}

export const TableSort: FC<IPropsTableSort> = ({
  data,
  total,
  areAllSelected,
  onChangeAll,
  onChange,
}) => {
  const [sortSetting, setSortSetting] =
    useState<SortByProps<IDataRowsRender> | null>({
      sortOrder: "desc",
      sortingBy: "deliveryDate",
    });

  const renderRows: IDataRowsRender[] = [...data].map((it) => ({
    ...it,
    checkbox: (
      <Checkbox
        size="m"
        checked={it.checked}
        onChange={(): void => onChange(it.id)}
      />
    ),
  }));

  const columns: TableColumn<(typeof renderRows)[number]>[] = [
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
      colSpan: (row) => (row.id === "total" ? 4 : 1),
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

  const sortRows: IDataRowsRender[] = [...renderRows]
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

  if (renderRows.length > 0) {
    sortRows.push({
      id: "total",
      checkbox: <></>,
      checked: false,
      currency: Currency.RUB,
      deliveryDate: "",
      name: "Общее количество",
      price: 0,
      quantity: total,
    });
  }
  return (
    <Table
      rows={sortRows}
      columns={columns}
      borderBetweenRows
      onSortBy={setSortSetting}
    />
  );
};
