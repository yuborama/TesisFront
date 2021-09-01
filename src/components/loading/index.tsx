import React, { FC } from "react";
import { TextStyled } from "../organisms/sendfiles/styled";
import { LoadingStyled } from "./styled";

interface LoadingProps {}

const LoadingComponent: FC<LoadingProps> = (Props) => {
  return (
    <LoadingStyled>
      <div className="load-4">
      <TextStyled
              as="span"
              color={"#ffffff"}
              fontzise={"3.5rem"}
              fontweight={700}
              marginbottom={"1rem"}
            >
              Cargando...
            </TextStyled>
        <div className="ring-1"></div>
      </div>
    </LoadingStyled>
  );
};
export default LoadingComponent;
