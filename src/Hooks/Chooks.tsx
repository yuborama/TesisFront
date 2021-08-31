import { resolve } from "path";
import { useEffect, useState } from "react";
import XLSX from "xlsx";

export const verifiFile = (file: File, colunms: string[]) => {
  return new Promise<boolean>((resolve, x) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data: any = XLSX.utils.sheet_to_json(ws, { header: 1 })[0];
      const colunmsfilter = colunms.find((e) => !data.includes(e));
      resolve(colunmsfilter ? false : true);
    };
    reader.readAsArrayBuffer(file);
  });
};

export const color = [
  "#1f77b4",
  "#aec7e8",
  "#ff7f0e",
  "#ffbb78",
  "#2ca02c",
  "#98df8a",
  "#d62728",
  "#ff9896",
  "#9467bd",
  "#c5b0d5",
  "#8c564b",
  "#c49c94",
  "#e377c2",
  "#f7b6d2",
  "#7f7f7f",
  "#c7c7c7",
  "#bcbd22",
  "#dbdb8d",
  "#17becf",
  "#9edae5",
];
