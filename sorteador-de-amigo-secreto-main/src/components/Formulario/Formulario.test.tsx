import { act, render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";

describe("O comportamento do Formulatio.tsx", () => {
  test("quando o input está vazio, novos participandos não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes do participante"
    );
    const botao = screen.getByRole("button");
    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
  });

  test("adicionar um participando caso existe um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes do participante"
    );
    const botao = screen.getByRole("button");
    userEvent.type(input, "João");
    userEvent.click(botao);
    expect(input).toHaveFocus();
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes do participante"
    );
    const botao = screen.getByRole("button");

    userEvent.type(input, "João");
    userEvent.click(botao);

    userEvent.type(input, "João");
    userEvent.click(botao);

    const messagemDeErro = screen.getByRole("alert");
    expect(messagemDeErro).toHaveTextContent(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("a mensagem de erro deve sumir apos os timers", () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes do participante"
    );
    const botao = screen.getByRole("button");

    userEvent.type(input, "João");
    userEvent.click(botao);

    userEvent.type(input, "João");
    userEvent.click(botao);

    let messagemDeErro = screen.queryByRole("alert");
    expect(messagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    messagemDeErro = screen.queryByRole("alert");
    expect(messagemDeErro).toBeNull();
  });
});
