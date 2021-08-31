import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Form, Formik } from "formik";
import ModalComponent from "../modal";
import { verifiFile } from "@Src/Hooks/Chooks";

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
  const { uploadFiles, setUploadFiles } = props;
  const [valuesFilter, setValuesFilter] = useState<any>({});
  const fileverify = async (e: any, drop: boolean) => {
    console.log(e);
    let files: FileList;
    drop ? ({ files } = e.dataTransfer) : ({ files } = e.currentTarget);
    console.log("files willy", files);
    if (files) {
      if (
        Object.values(files).some((x) => /.(xlsx|xls)\b/.test(x.name) === false)
      ) {
      } else {
        const colums = [
          "Desde*",
          "Hasta*",
          "Subcódigo*",
          "P/N*",
          "MD from (ft)",
          "MD to (ft)",
        ];

        const resolve = await Promise.all(
          Object.values(files).map((file) => verifiFile(file, colums))
        );
        setValuesFilter({ booleans: resolve, values: Object.values(files) });
        resolve.some((X) => X === false)
          ? setActiveModal(!activeModal)
          : setUploadFiles([...uploadFiles, ...Object.values(files)]);
      }
    } else {
    }
  };
  const [dragover, setDragover] = useState(false);
  const initialValues: MyFormValues = { file: "" };
  const [activeModal, setActiveModal] = useState(false);

  return (
    <WrapperStyled>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          actions.setSubmitting(false);
        }}
      >
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
              onChange={(e: FormEvent<HTMLInputElement>) => {
                console.log(e);
                fileverify(e, false);
              }}
            ></input>
          </DragdropStyled>
      </Formik>
      {activeModal && (
        <ModalComponent
        active={activeModal}
          acepted={() => {
            setUploadFiles([...uploadFiles,...valuesFilter.values.filter((e:File,i:number)=>{
              if(valuesFilter.booleans[i]===true){
                return e
              }
            })]);
            setActiveModal(!activeModal)
          }}
          close={() => setActiveModal(!activeModal)}
        />
      )}
    </WrapperStyled>
  );
};

export default DragDrogComponent;
