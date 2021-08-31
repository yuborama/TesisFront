import CardFile from "@Src/components/cardfile";
import DragDrogComponent from "@Src/components/dragdrop";
import { API_URL } from "@Src/config";
import axios from "axios";
import React, { FC, useState } from "react";
interface FileBaseProps {}

const FileBaseComponent: FC<FileBaseProps> = (Props) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
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
              url: `${API_URL}/filebase`,
              data: form,
              responseType: "blob", //important
            }).then((response) => {
              const url = window.URL.createObjectURL(response.data); //, {  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "filebase.xlsx");
              document.body.appendChild(link);
              link.click();
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Enviar
      </button>
    </>
  );
};

export default FileBaseComponent;
