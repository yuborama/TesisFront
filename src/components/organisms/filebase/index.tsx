import CardFile from "@Src/components/cardfile";
import DragDrogComponent from "@Src/components/dragdrop";
import { Container } from "@Src/components/grafics/styled";
import React, { FC, useState } from "react";
import {
  SendStyled,
  TextStyled,
  TitleStyled,
  WrapperListFiles,
  WrapperUploadFiles,
} from "./styled";
import { API_URL } from "@Src/config";
import axios, { AxiosResponse } from "axios";
import LoadingComponent from "@Src/components/loading";

interface FileBaseProps {}  

const FileBaseComponent: FC<FileBaseProps> = (Props) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const hanledrequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFiles.length !== 0) {
      const requestdonwload = async () => {
        setLoading(true);
        try {
          const form = new FormData();
          uploadFiles.map((file) => {
            form.append("filename", file);
          });
          console.log("request2");
          const response = await axios({
            method: "POST",
            url: `${API_URL}/filebase`,
            data: form,
            responseType: "blob", //important
          }).then((response) => {
            setLoading(false);
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
      };
      requestdonwload();
    } else {
      setCheckError(true);
    }
  };
  return (
    <>
      {loading && <LoadingComponent />}
      <Container>
        <TitleStyled>
          <div className="ornaments"></div>
          <div>
            <TextStyled
              as="h1"
              color={"#ffffff"}
              fontzise={"3.5rem"}
              fontweight={700}
              marginbottom={"1rem"}
            >
              Visualización de Pozo
            </TextStyled>
            <TextStyled
              color={"#ffffff"}
              fontzise={"2rem"}
              width={"51.063rem"}
              style={{ lineHeight: "1.5" }}
            >
              En este proyecto prodrás descargar y visualizar mediante gráficas
              los archivos de Excel que cargues.
            </TextStyled>
          </div>
        </TitleStyled>
        <TextStyled
          as="h2"
          color={"#ffffff"}
          fontzise={"2.5rem"}
          marginbottom={"1.5rem"}
          fontweight={700}
        >
          ARCHIVO BASE
        </TextStyled>
        <SendStyled>
          <div>
            <TextStyled
              as="h2"
              color={"#ffffff"}
              fontzise={"2.5rem"}
              marginbottom={"1.5rem"}
            >
              Subir un archivo
            </TextStyled>
            <WrapperUploadFiles>
              <DragDrogComponent
                uploadFiles={uploadFiles}
                setUploadFiles={setUploadFiles}
              />
              {checkError && <p>Debe cargar al menos un archivo</p>}
              <form onSubmit={hanledrequest}>
                <button type="submit">Enviar</button>
              </form>
            </WrapperUploadFiles>
          </div>

          <div>
            <TextStyled
              as="h2"
              color={"#ffffff"}
              fontzise={"2.5rem"}
              marginbottom={"1.5rem"}
            >
              Lista de archivos
            </TextStyled>
            <WrapperListFiles>
              {uploadFiles.length > 0 ? (
                <div className="cardContainer">
                  {uploadFiles.map((e, im) => (
                    <CardFile
                      key={`cardList${im}`}
                      close={() =>
                        setUploadFiles(uploadFiles.filter((_, i) => i != im))
                      }
                      text={e.name}
                    />
                  ))}
                </div>
              ) : (
                <div className="nofile">
                  <img
                    src="/no-file.svg"
                    style={{ width: "100px", height: "100px" }}
                    alt=""
                  />
                  <TextStyled as="span" fontzise={"1.5rem"} fontweight={500}>
                    No tienes ningun archivo subido
                  </TextStyled>
                </div>
              )}
            </WrapperListFiles>
          </div>
        </SendStyled>
      </Container>
    </>
  );
};
export default FileBaseComponent;
