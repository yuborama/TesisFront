import React, {FC} from 'react'
import { ContainerCloseStyled, ContainerWraperStyled, ModalStyled } from './style'

interface ModalProps { 
    close: ()=>void
    acepted: ()=>void
    active: boolean
}

const ModalComponent: FC<ModalProps> = (Props) => {
    const {acepted,close,active}= Props
    return (
        <ModalStyled active={active}>
            <ContainerWraperStyled>
            <ContainerCloseStyled onClick={close}>
                x
            </ContainerCloseStyled>
            <span>Hay algunos archivos que no cumplen con los parametros requeridos <br/>¿Desea filtrar los archivos?</span>
            <button onClick={acepted}>
                Aceptar
            </button>
            </ContainerWraperStyled>
        </ModalStyled>
    )
}
export default ModalComponent