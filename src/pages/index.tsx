
import FileBaseComponent from "@Src/components/organisms/filebase";
import SeriesComponent from "@Src/components/organisms/series";
import { FC } from "react";

interface Props {}


const index: FC<Props> = () => {
  return (
    <>
    <SeriesComponent />
     <FileBaseComponent /> 
    </>
  );
};

export default index;
