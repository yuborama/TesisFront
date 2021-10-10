import { descSubcodigos } from "@Src/Hooks/Chooks";
import React, { FC } from "react";
import { TextStyled } from "../organisms/sendfiles/styled";
import { Container, TableStyled } from "./styled";

interface TableProps {
  results: {
    file: string;
    datos: {
      "Subcódigo*": string;
      hours: number;
    }[];
  }[];
}

const TableComponent: FC<TableProps> = (props) => {
  const { results } = props;
  console.log("estos son mis resultados", results);
  return (
    <Container>
      {results.map((e) => (
        <TableStyled>
          <thead>
            <tr>
              <TextStyled
                fontzise={"1.5rem"}
                fontweight={700}
                as="th"
                colSpan={3}
              >
                {e.file.split(/\.\b/)[0]}
              </TextStyled>
            </tr>
            <tr>
              <TextStyled fontzise={"1.5rem"} fontweight={400} as="th">
                Subcodigo
              </TextStyled>
              <TextStyled fontzise={"1.5rem"} fontweight={400} as="th">
                Tiempo (H)
              </TextStyled>
              <TextStyled fontzise={"1.5rem"} fontweight={400} as="th">
                Descripcion
              </TextStyled>
            </tr>
          </thead>
          <tbody>
            {e.datos
              .filter((e) => e.hours > 0)
              .map((e) => (
                <tr>
                  <th>{e["Subcódigo*"]}</th>
                  <th>{e.hours}</th>
                  <th>
                    {descSubcodigos.find(
                      (des) => des.subcodigo == +e["Subcódigo*"]
                    )?.descripcion || 'CODIGO NO ENCONTRADO'}
                  </th>
                </tr>
              ))}
          </tbody>
        </TableStyled>
      ))}
    </Container>
  );
};
export default TableComponent;
