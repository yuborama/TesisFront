import styled from "@emotion/styled";
import FileBaseComponent from "@Src/components/organisms/filebase";
import SendFilesComponent from "@Src/components/organisms/sendfiles";
import SeriesComponent from "@Src/components/organisms/series";
import GlobalStyles from "@Src/styles/globalStyled";
import { FC } from "react";

interface Props {}

const index: FC<Props> = () => {
  return (
    <>
      <GlobalStyles />
      {/* <SendFilesComponent /> */}
      <FileBaseComponent/>
      <SeriesComponent/>
    </>
  );
};

export default index;
