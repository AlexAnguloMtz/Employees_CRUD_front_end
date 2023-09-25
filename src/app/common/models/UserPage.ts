import { Secret } from "./Secret"

export type UserPage = {
    username: string,
    secrets: Array<Secret>
}