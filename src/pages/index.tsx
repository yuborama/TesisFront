import CardFile from "@Src/components/cardfile";
import DragDrogComponent from "@Src/components/dragdrop";
import GraficComponent from "@Src/components/grafics";
import AtomInput from "@Src/components/Input";
import ModalComponent from "@Src/components/modal";
import FileBaseComponent from "@Src/components/organisms/filebase";
import { FC } from "react";

interface Props {}


const index: FC<Props> = () => {
  return (
    <>
    <FileBaseComponent/>
      {/* <DragDrogComponent />
      <CardFile text="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
      <CardFile text="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/> */}
      {/* <AtomInput/>
      <GraficComponent /> */}
    </>
  );
};

export default index;
