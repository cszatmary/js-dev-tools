import { prompt, CheckboxQuestion } from "inquirer";

export type Tool = "eslint" | "lint-staged" | "prettier";

interface Answer {
  tools: Tool[];
}

const chooseToolsQuestion: CheckboxQuestion<Answer> = {
  name: "tools",
  type: "checkbox",
  message: "Select which tools to use:",
  choices: [
    {
      name: "ESLint",
      value: "eslint",
    },
    {
      name: "lint-staged",
      value: "lint-staged",
    },
    {
      name: "Prettier",
      value: "prettier",
    },
  ],
};

export async function chooseToolsPrompt(): Promise<Set<Tool>> {
  const { tools } = await prompt<Answer>(chooseToolsQuestion);

  return new Set(tools);
}
