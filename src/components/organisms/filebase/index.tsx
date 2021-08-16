import CardFile from "@Src/components/cardfile";
import DragDrogComponent from "@Src/components/dragdrop";
import GraficComponent from "@Src/components/grafics";
import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import XLSX from "xlsx";
interface FileBaseProps {}

const series = [
  {
    name: "John",
    data: [1, 1, 1, 1],
  },
  {
    name: "Jane",
    data: [5],
  },
  {
    name: "James",
    data: [1],
  },
  { name: "James", data: [1] },
];

const printFile = (file: File, colunms: string[]) => {
  console.log('entro');
  // return true
  const reader = new FileReader();
  // return true
  let filterFile = false;
  // return true
  reader.onload = (e: any) => {
    // return true
    const bufferArray = e.target.result;
    // return true
    const wb = XLSX.read(bufferArray, { type: "buffer" });
    // return true
    const wsname = wb.SheetNames[0];
    // return true
    const ws = wb.Sheets[wsname];
    // return true
    const data: any = XLSX.utils.sheet_to_json(ws, { header: 1 })[0];
    // return true
    const colunmsfilter = colunms.filter((e) => !data.includes(e));
    console.log('llego aqui ');
    return true
    console.log(data);
  };
  // return false;
};



const FileBaseComponent: FC<FileBaseProps> = (Props) => {
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const [filterFiles, setFilterFiles] = useState<any[]>([]);
  useEffect(() => {
      setFilterFiles(uploadFiles.map((x)=> printFile(x,['Desde*','Hasta*','Subcódigo*','P/N*','MD from (ft)','MD to (ft)'])))
  }, [uploadFiles])
  // <button
  //   type="submit"
  //   onClick={async () => {
  //       console.log("mi archivo", uploadFiles);
  //       console.log('hola');
  //       // try {
  //       //   const form = new FormData();
  //       //   form.append("filename", uploadFiles);
  //       //   const response = await axios({
  //       //     method: "POST",
  //       //     url: "http://localhost:4000/filebase",
  //       //     data: form,
  //       //   });
  //       //   console.log(response.data);
  //       // } catch (error) {
  //       //   console.error(error);
  //       // }
  //   }}
  // ></button>;

  // console.log(
  //   "filter",
  //   uploadFiles?.map((x) => printFile(x, params))
  // );
  // useEffect(() => {
  //   const params = [
  //     "Desde*",
  //     "Hasta*",
  //     "Subcódigo*",
  //     "P/N*",
  //     "MD from (ft)",
  //     "MD to (ft)",
  //   ];
  //   const filter = uploadFiles.map((x) => printFile(x, params));
  // }, [uploadFiles]);

  return (
    <>
    {
      console.log('datasetfilter',filterFiles)
    }
      <DragDrogComponent
        uploadFiles={uploadFiles}
        setUploadFiles={setUploadFiles}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          flexWrap: "nowrap",
        }}
      >
        {uploadFiles.map((e) => (
          <CardFile text={e.name} />
        ))}
      </div>
      /* <button
            type="submit"
            onClick={async () => {
                console.log("mi archivo", uploadFiles);
                try {
                  const form = new FormData();
                  uploadFiles.map((file)=>{
                    // console.log('intento',file)
                    form.append('filename', file);
                  })      
                  for (var value of form.values()) {
                    console.log('form',form.values);
                    console.log('data',value);
                 }              
                  const response = await axios({
                    method: "POST",
                    url: "http://localhost:4000/filebase",
                    data: form,
                    responseType: 'blob', //important
                  }).then((response)=>{
                    const url = window.URL.createObjectURL(response.data);//, {  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'filebase.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    console.log(response.data);
                  })

                } catch (error) {
                  console.error(error);
                }
            }}
          >
            Enviar
          </button>
      <GraficComponent series={series} />
    </>
  );
};

export default FileBaseComponent;
