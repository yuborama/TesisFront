import CardFile from "@Src/components/cardfile";
import DragDrogComponent from "@Src/components/dragdrop";
import { Container } from "@Src/components/grafics/styled";
import React, { FC, useEffect, useState } from "react";
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
import GraficComponent from "@Src/components/grafics";

interface SeriesProps {}

const SeriesComponent: FC<SeriesProps> = (Props) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadFileBase, setUploadFileBase] = useState<File[]>([]);
  const [fileBase, setFileBase] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [series, setSeries] = useState<{ subcodigo: String; data: number[] }[]>(
    []
  );
  const [name, setName] = useState<String[]>([]);

  useEffect(() => {
    setFileBase(uploadFileBase[0]);
  }, [uploadFileBase]);
  const hanledrequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFiles.length !== 0) {
      const requestSeries = async () => {
        setLoading(true);
        try {
          const mutado = fileBase ? [fileBase] : [];
          const form = new FormData();
          [...mutado, ...uploadFiles].map((file) => {
            form.append("filename", file);
          });
          const response = await axios({
            method: "POST",
            url: `${API_URL}/file`,
            data: form,
          }).then(
            (
              response: AxiosResponse<{
                data: {
                  File: String;
                  datos: { "Subcódigo*": string; hours: number }[];
                }[];
              }>
            ) => {
              setLoading(false);
              console.log(response.data);
              let responseSeries: {
                subcodigo: string;
                data: { index: number; value: number }[];
              }[] = [];
              response.data.data.map((obj, i) =>
                obj.datos.map((x) => {
                  if (
                    responseSeries.some(
                      (obj) => obj.subcodigo === x["Subcódigo*"]
                    )
                  ) {
                    const dseries = responseSeries.find(
                      (obj) => obj.subcodigo === x["Subcódigo*"]
                    );
                    if (dseries) {
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
              const newseries = responseSeries
                .map((x) => ({
                  ...x,
                  data: Array.from(
                    { length: response.data.data.length },
                    (_, i) =>
                      x.data.find((item) => item.index === i) || {
                        index: i,
                        value: 0,
                      }
                  ),
                }))
                .map((x) => {
                  return {
                    subcodigo: x.subcodigo,
                    data: x.data.map((d) => d.value),
                  };
                });
              const files = response.data.data.map((obj) => obj.File);
              setSeries(newseries);
              setName(files);
              console.log(responseSeries);
              console.log("new series", newseries);
              console.log("files", files);
            }
          );
        } catch (error) {
          console.error(error);
        }
      };
      requestSeries();
    } else {
      setCheckError(true);
    }
  };
  return (
    <>
      {loading && <LoadingComponent />}
      <Container>
        <TextStyled
          as="h2"
          color={"#ffffff"}
          fontzise={"2.5rem"}
          marginbottom={"1.5rem"}
          fontweight={700}
        >
          COMPARATIVA
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
            <div>
              <TextStyled
                as="h2"
                color={"#ffffff"}
                fontzise={"1.5rem"}
                marginbottom={"1rem"}
                margin={"0.5rem 0 0.5rem 0"}
              >
                ARCHIVO BASE
              </TextStyled>
              <WrapperListFiles height={"11.5rem"}>
                {fileBase !== undefined ? (
                  <div className="cardContainer-center">
                    {
                      <CardFile
                        close={() => setFileBase(undefined)}
                        text={fileBase.name}
                      />
                    }
                  </div>
                ) : (
                  <DragDrogComponent
                    height={"100%"}
                    uploadFiles={uploadFileBase}
                    setUploadFiles={setUploadFileBase}
                    single={true}
                  />
                )}
              </WrapperListFiles>
            </div>
          </div>
        </SendStyled>
      </Container>
      {series.length !== 0 && (
        <div>
          <GraficComponent series={series} name={name} />
          <GraficComponent
            series={series.map((elemarray) => {
              const { subcodigo, data } = elemarray;
              const filebase = data[0];
              return {
                subcodigo: subcodigo,
                data: data
                  .filter((_, i) => i !== 0)
                  .map((e: number) => filebase - e),
              };
            })}
            name={name.slice(1)}
          />
        </div>
      )}
    </>
  );
};
export default SeriesComponent;
