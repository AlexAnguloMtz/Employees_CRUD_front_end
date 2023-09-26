import { BusinessType } from "./BusinessType"
import { State } from "./State"

export type RegistrationOptions = {
    states: Array<State>,
    businessTypes: Array<BusinessType>
}