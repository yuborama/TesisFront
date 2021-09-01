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

interface SendFilesProps {}

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

const SendFilesComponent: FC<SendFilesProps> = (Props) => {
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  return (
    <>
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
              <form>
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
                      type="radio"
                      id="sendfile1"
                      name="sendfile"
                      value=""
                    />
                    <label htmlFor="sendfile1">Descargar</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sendfile2"
                      name="sendfile"
                      value="phone"
                    />
                    <label htmlFor="sendfile2">Ver Grafica</label>
                  </div>
                </div>
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
      <GraficComponent series={series} name={name} />
    </>
  );
};
export default SendFilesComponent;
