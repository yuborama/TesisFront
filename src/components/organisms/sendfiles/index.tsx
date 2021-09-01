import CardFile from "@Src/components/cardfile";
import DragDrogComponent from "@Src/components/dragdrop";
import GraficComponent from "@Src/components/grafics";
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

interface SendFilesProps {}

// const series = [
//   { subcodigo: "123", data: [1, 2, 3] },
//   { subcodigo: "234", data: [1, 2, 3] },
//   { subcodigo: "345", data: [1, 2, 3] },
//   { subcodigo: "456", data: [1, 2, 3] },
//   { subcodigo: "567", data: [1, 2, 3] },
//   { subcodigo: "678", data: [1, 2, 3] },
//   { subcodigo: "789", data: [1, 2, 3] },
//   { subcodigo: "890", data: [1, 2, 3] },
//   { subcodigo: "901", data: [1, 2, 3] },
//   { subcodigo: "1012", data: [1, 2, 3] },
//   { subcodigo: "1113", data: [1, 2, 3] },
// ];

// const name = ["base", "pozo adasdasdadasdasdasd", "your news"];

const SendFilesComponent: FC<SendFilesProps> = (Props) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [series, setSeries] = useState<{subcodigo: String, data: Number[]}[]>([])
  const [name, setName] = useState<String[]>([])
  const [loading, setLoading] = useState(false)
  const [downloadCheck, setDownloadCheck] = useState({
    download: false,
    view: false,
  });
  const [checkError, setCheckError] = useState({
    radiobutton: false,
    uploadfiles: false,
  });

  const hanledrequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(downloadCheck);
    if (downloadCheck.download !== true && downloadCheck.view !== true) {
      setCheckError({
        radiobutton: true,
        uploadfiles: false,
      });
    } else {
      if (uploadFiles.length !== 0) {
        if (downloadCheck.download === true) {
          console.log('entra al if');
          const requestdonwload = async () => {
            setLoading(true)
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
                setLoading(false)
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
          requestdonwload()
        } else {
          const requestSeries = async () => {
            setLoading(true)
            try {
              const form = new FormData();
              uploadFiles.map((file) => {
                form.append("filename", file);
              });
              const response = await axios({
                method: "POST",
                url: `${API_URL}/file`,
                data: form,
                // 
              }).then((response:AxiosResponse<{data:{File:String,datos: {"Subcódigo*": string, hours: number}[]}[]}>) => {
                setLoading(false)
                console.log(response.data);
                let responseSeries:{ subcodigo: string; data: {index:number,value:number}[] }[]=[]
                response.data.data.map(
                  (obj, i) =>
                  obj.datos.map((x) => {
                    if (responseSeries.some((obj) => obj.subcodigo === x["Subcódigo*"])) {
                      const dseries = responseSeries.find(
                        (obj) => obj.subcodigo === x["Subcódigo*"]
                      );
                      if(dseries){
                        dseries.data.push({ index: i, value: x.hours });
                      }
                    } else {
                      responseSeries.push({
                        subcodigo: x["Subcódigo*"],
                        data: [{ index: i, value: x.hours }],
                      });
                    }
                  })
                );
                const newseries = responseSeries.map((x) => ({
                  ...x,
                  data: Array.from({ length: response.data.data.length }, (_, i) =>
                    x.data.find((item) => item.index === i) || { index: i, value: 0 }),
                })).map((x) => { return { subcodigo: x.subcodigo, data: x.data.map(d => d.value) } })
                const files = response.data.data.map((obj) => obj.File)
                setSeries(newseries)
                setName(files)
                console.log(responseSeries);
                console.log('new series',newseries);
                console.log('files',files);
                
              });
            } catch (error) {
              console.error(error);
            }
          }
          requestSeries()
        }
      } else {
        setCheckError({
          radiobutton: false,
          uploadfiles: true,
        });
      }
    }
  };
  return (
    <>
      {loading && <LoadingComponent/>}
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
        <SendStyled>
          <div>
            <TextStyled
              as="h2"
              color={"#ffffff"}
              fontzise={"2.5rem"}
              fontweight={700}
              marginbottom={"1.5rem"}
            >
              Subir un archivo
            </TextStyled>
            <WrapperUploadFiles>
              <DragDrogComponent
                uploadFiles={uploadFiles}
                setUploadFiles={setUploadFiles}
              />
              {checkError.uploadfiles && <p>Debe cargar al menos un archivo</p>}
              <form onSubmit={hanledrequest}>
                <TextStyled
                  as="span"
                  fontzise={"1.5rem"}
                  fontweight={700}
                  marginbottom={"1.5rem"}
                >
                  Seleccione una opcion
                </TextStyled>
                <div className="radiobutton">
                  <div>
                    <input
                      onChange={() => {
                        setDownloadCheck({
                          download: true,
                          view: false,
                        });
                        setCheckError({
                          radiobutton: false,
                          uploadfiles: checkError.uploadfiles,
                        });
                      }}
                      type="radio"
                      id="sendfile1"
                      name="sendfile"
                      value=""
                    />
                    <label htmlFor="sendfile1">Descargar</label>
                  </div>
                  <div>
                    <input
                      onChange={() => {
                        setDownloadCheck({
                          download: false,
                          view: true,
                        });
                        setCheckError({
                          radiobutton: false,
                          uploadfiles: checkError.uploadfiles,
                        });
                      }}
                      type="radio"
                      id="sendfile2"
                      name="sendfile"
                      value=""
                    />
                    <label htmlFor="sendfile2">Ver Grafica</label>
                  </div>
                </div>
                {checkError.radiobutton && <p>selecione una opcion</p>}
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
      {
        series.length !==0 && <GraficComponent series={series} name={name} />
      }
      
    </>
  );
};
export default SendFilesComponent;
