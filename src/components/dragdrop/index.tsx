import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { verify } from "crypto";
import axios from "axios";
import CardFile from "../cardfile";

type DragdropProps = {
  uploadFiles: File[];
  setUploadFiles: Dispatch<SetStateAction<File[]>>;
};

interface MyFormValues {
  file: string;
}

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
  let filelist:any
  const {uploadFiles, setUploadFiles} = props

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:4000/",
          data: "",
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);
  console.log(uploadFiles);
  const [dragover, setDragover] = useState(false);
  const initialValues: MyFormValues = { file: "" };
  console.log(dragover);
  const fileverify = (e: any, drop: boolean) => {
  let files: FileList;
    // console.log("current", e.currentTarget);
    drop ? ({ files } = e.dataTransfer) : ({ files } = e.currentTarget);
    // console.log(files);
    if (files) {
      // console.log("", Object.values(files));
      // console.log(
      //   "evaluacion",
      //   Object.values(files).some((e) =>
      //     [
      //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      //       "application/vnd.ms-excel",
      //     ].includes(e.type)
      //   )
      // );
      // console.log("values", Object.values(files));
      // Object.entries(files).map(File=>setUploadFiles([...uploadFiles, File[1]]))
      
      filelist = files
      console.log();
      setUploadFiles(uploadFiles.concat(Object.values(files)));
      // setUploadFiles([...uploadFiles, Object.values(files)]);
      // console.log([...uploadFiles, files]);
      
    } else {
      console.log("vacio");
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
              console.log("drag enter");
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragover(!dragover);
              console.log("drag leave");
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
              // const url = URL.createObjectURL(files);
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
                // console.log(event.currentTarget.files);
                // const files = event.currentTarget
                // console.log(URL.createObjectURL(files[0]));
                //  setFieldValue("file", event.currentTarget.files[0]);
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
    </WrapperStyled>
  );
};

export default DragDrogComponent;
