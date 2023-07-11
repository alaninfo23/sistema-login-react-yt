import { useRecoilValue } from "recoil";
import { erroState } from "../atom";

export const useMensagemDeErro = () => {
  const messagem = useRecoilValue(erroState);
  return messagem;
};
