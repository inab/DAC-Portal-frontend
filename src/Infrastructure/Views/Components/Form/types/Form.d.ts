import { FormControlProps } from "react-bootstrap"
import { DACInfo } from "../../../Domain/Entities/Entities";

export interface IForm {
    data: Array<DACInfo>,
    update: (object: DACInfo ) => void,
    change: (e: React.FormEventHandler<FormControlProps>, index: number) => void
}