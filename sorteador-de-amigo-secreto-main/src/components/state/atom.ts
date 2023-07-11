import { atom } from "recoil";

export const listaParticipantesStates = atom<string[]>({
  key: "listaParticipantesStates",
  default: []  
})

export const erroState = atom<string>({
  key: "erroState",
  default: ""
})