import React, { Dispatch, FC, SetStateAction } from "react";
import { WrapperStyled, PointStyled, ContainerStyled } from "./style";

export interface LegendProps {
  color: string[];
  name: String[];
  active: Number[];
  setActive: Dispatch<SetStateAction<Number[]>>;
}

const LegendComponent: FC<LegendProps> = (Props) => {
  const { color, name, active, setActive } = Props;
  console.log("activos", active.length);
  console.log("name", name.length);
  return (
    <ContainerStyled>
      <WrapperStyled
        onClick={() => {
          setActive([]);
        }}
      >
        <PointStyled className="firts" />
        <span>todos los datos</span>
      </WrapperStyled>
      {name.map((x, i) => (
        <WrapperStyled
          key = {`listlegend${i+1}`}
          onClick={() =>
            setActive(
              active.includes(i)
                ? active.filter((element) => element !== i)
                : active.length < name.length-1
                ? [...active, i]
                : active
            )
          }
        >
          <PointStyled
            style={{
              backgroundColor: color[i],
            }}
          />
          <span>{x}</span>
        </WrapperStyled>
      ))}
    </ContainerStyled>
  );
};
export default LegendComponent;
