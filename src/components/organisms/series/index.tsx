import CardFile from "@Src/components/cardfile";
import DragDrogComponent from "@Src/components/dragdrop";
import GraficComponent from "@Src/components/grafics";
import { API_URL } from "@Src/config";
import axios, { AxiosResponse } from "axios";
import React, { FC, useState } from "react";
interface SeriesProps {}

const series = [
  { subcodigo: "123", data: [1, 2, 3] },
  { subcodigo: "234", data: [1, 2, 3] },
  { subcodigo: "345", data: [1, 2, 3] },
  { subcodigo: "456", data: [1, 2, 3] },
  { subcodigo: "567", data: [1, 2, 3] },
  { subcodigo: "678", data: [1, 2, 3] },
  { subcodigo: "789", data: [1, 2, 3] },
  { subcodigo: "890", data: [1, 2, 3] },
  { subcodigo: "901", data: [1, 2, 3] },
  { subcodigo: "1012", data: [1, 2, 3] },
  { subcodigo: "1113", data: [1, 2, 3] },
];

const name = ["base", "pozo adasdasdadasdasdasd", "your news"];

const SeriesComponent: FC<SeriesProps> = (Props) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
//   const [name, setName] = useState<string[]>([]);
//   const [series, setSeries] = useState<{ subcodigo: string; data: number[] }[]>(
//     []
//   );
  return (
    <>
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
        {uploadFiles.map((e, im) => (
          <CardFile
            key={`cardList${im}`}
            close={() => setUploadFiles(uploadFiles.filter((_, i) => i != im))}
            text={e.name}
          />
        ))}
      </div>
      <button
        type="submit"
        onClick={async () => {
          try {
            const form = new FormData();
            uploadFiles.map((file) => {
              form.append("filename", file);
            });
            const response = await axios({
              method: "POST",
              url: `${API_URL}/file`,
              data: form,
              
            }).then((response) => {
              console.log(response);
            //   let responseSeries:{ subcodigo: string; data: Object[] }[]
            //   response.map((obj, i) =>
            //     obj.datos.map((x) => {
            //       if (responseSeries.some((obj) => obj.subcodigo === x.subcodigo)) {
            //         dseries = responseSeries.find(
            //           (obj) => obj.subcodigo === x.subcodigo
            //         );
            //         dseries.data.push({ index: i, value: x.minutes });
            //       } else {
            //         responseSeries.push({
            //           subcodigo: x.subcodigo,
            //           data: [{ index: i, value: x.minutes }],
            //         });
            //       }
            //     })
            //   );
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Enviar
      </button>
      <GraficComponent series={series} name={name} />
    </>
  );
};
export default SeriesComponent;
