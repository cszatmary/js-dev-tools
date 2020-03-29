import { prompt, ListQuestion } from "inquirer";

export type Transpiler = "babel" | "typescript" | "typescript + babel" | "none";

interface Answer {
  transpiler: Transpiler;
}

const useTypescriptQuestion: ListQuestion<Answer> = {
  name: "transpiler",
  type: "list",
  message: "Choose which transpiler to use?",
  choices: [
    {
      name: "Babel",
      value: "babel",
    },
    {
      name: "TypeScript",
      value: "typescript",
    },
    {
      name: "TypeScript + Babel",
      value: "typescript + babel",
    },
    {
      name: "None",
      value: "none",
    },
  ],
};

export async function chooseTranspiler(): Promise<Transpiler> {
  const { transpiler } = await prompt<Answer>(useTypescriptQuestion);

  return transpiler;
}
