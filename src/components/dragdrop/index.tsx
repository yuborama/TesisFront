import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Field, Form, Formik } from "formik";
import { verify } from "crypto";
import axios from "axios";
import CardFile from "../cardfile";
import ModalComponent from "../modal";
import XLSX from "xlsx";
import xlsxParser from "../../Hooks/UseFile";

type DragdropProps = {
  uploadFiles: File[];
  setUploadFiles: Dispatch<SetStateAction<File[]>>;
};

interface MyFormValues {
  file: string;
}

const promisefilter = async (files: File[]) => {
  return await Promise.all(
    files.filter(async (x) => {
      if (
        await printFile(x, [
          "Desde*",
          "Hasta*",
          "Subcódigo*",
          "P/N*",
          "MD from (ft)",
          "MD to (ft)",
        ])
      ) { 
        console.log("entro if promise");
        return x;
      }
    })
  );
};

const printFile = (file: File, colunms: string[]) => {
  // let filterFile = false;
  return new Promise((resolve, x) => {
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

const DragdropStyled = styled.label`
  border: 2px dashed #000000;
  height: 40vh;
  width: 50vw;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: 2rem;
  }
`;

const WrapperStyled = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PruebaStyled = styled.div`
  height: 20px;
  width: 20px;
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DragDrogComponent: FC<DragdropProps> = (props) => {
  // const { evt } = props;
  let filelist: any;
  const { uploadFiles, setUploadFiles } = props;

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const response = await axios({
  //         method: "GET",
  //         url: "http://localhost:4000/",
  //         data: "",
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   init();
  // }, []);
  console.log(uploadFiles);
  let result: any = [];
  const [dragover, setDragover] = useState(false);
  const initialValues: MyFormValues = { file: "" };
  const [activeModal, setActiveModal] = useState(false);
  const [uplaod, setUpload] = useState<any>();
  const fileverify = (e: any, drop: boolean) => {
    console.log(e);
    let files: FileList;
    drop ? ({ files } = e.dataTransfer) : ({ files } = e.currentTarget);
    if (files) {
      if (
        Object.values(files).some((x) => /.(xlsx|xls)\b/.test(x.name) === false)
      ) {
        setActiveModal(!activeModal);
      } else {
        const values = Object.values(files).map((x) =>
          xlsxParser.onFileHeader(x).then((data) => {
            const colunms = [
              "Desde*",
              "Hasta*",
              "Subcódigo*",
              "P/N*",
              "MD from (ft)",
              "MD to (ft)",
            ];
            const colunmsfilter = colunms.find((e) => !data.includes(e));
            result.push(colunmsfilter ? false : true);
          })
        );
        console.log("miradme3", result);
        const filter = async () => {
          const colunms = [
            "Desde*",
            "Hasta*",
            "Subcódigo*",
            "P/N*",
            "MD from (ft)",
            "MD to (ft)",
          ];
          return Promise.all(
            Object.values(files).map((file) =>
              xlsxParser.onFileHeader(file).then((data) => {
                const colunmsfilter = colunms.find((e) => !data.includes(e));
                return colunmsfilter ? false : true;
              })
            )
          )
          // .then(
          //   (data) => {console.log('mi data', data);
          //     return data
          //   }
          // )
        };
        filter().then(data=> {
          console.log("ultimo intento de fltro", data);
        });
        // const list = promisefilter(Object.values(files));
        // const promiseresolve = async () => {
        //   setUpload(
        //     await Promise.all(
        //       uploadFiles.map((x) =>
        //         printFile(x, [
        //           "Desde*",
        //           "Hasta*",
        //           "Subcódigo*",
        //           "P/N*",
        //           "MD from (ft)",
        //           "MD to (ft)",
        //         ])
        //       )
        //     )
        //   );
        // };
        // promiseresolve()
        // console.log("upload", uplaod)
        // Object.values(files).filter(async (x) => {
        //   await printFile(x, [
        //     "Desde*",
        //     "Hasta*",
        //     "Subcódigo*",
        //     "P/N*",
        //     "MD from (ft)",
        //     "MD to (ft)",
        //   ]).then((resolve) => {
        //     console.log('resolve',resolve);
        //     if (resolve==true) {
        //       console.log('ahi', resolve)
        //       return x;
        //     }
        //   }).then(resolve =>{
        //     filesls.push(resolve);
        //     console.log('resolve promise all',resolve)
        //   }
        //   );
        // });
        setUploadFiles(uploadFiles.concat(Object.values(files)));
        // console.log("revision", filelist);
        // console.log("list", list);
      }
    } else {
    }
  };
  // console.log("entries",uploadFiles);
  return (
    <WrapperStyled>
      {/* <PruebaStyled /> */}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          // alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <DragdropStyled
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragover(!dragover);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragover(!dragover);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              fileverify(e, true);
              setDragover(!dragover);
            }}
          >
            <span>
              {!dragover ? (
                <>
                  <img
                    alt=""
                    src="https://image.flaticon.com/icons/svg/136/136549.svg"
                    style={{ width: "30px" }}
                  />
                  ARRASTRA Y SUELTA
                </>
              ) : (
                <>SUELTA</>
              )}
            </span>

            <input
              type="file"
              name="file"
              id="file"
              hidden
              multiple
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              // setFieldValue={"file"}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                console.log(e);
                fileverify(e, false);
              }}
            ></input>
          </DragdropStyled>
          {/* <button
            type="submit"
            onClick={async () => {
                console.log("mi archivo", );
                try {
                  const form = new FormData();
                  console.log('trabajo',filelist);
                  form.append('filename', filelist);
                  const response = await axios({
                    method: "POST",
                    url: "http://localhost:4000/filebase",
                    data: form
                  });
                  console.log(response.data);
                } catch (error) {
                  console.error(error);
                }
              }
            }
          >
            Enviar
          </button> */}
        </Form>
      </Formik>
      <button onClick={() => setActiveModal(!activeModal)}> modal</button>
      {activeModal && (
        <ModalComponent
          acepted={() => {
            console.log("hola");
          }}
          close={() => setActiveModal(!activeModal)}
        />
      )}
    </WrapperStyled>
  );
};

export default DragDrogComponent;
