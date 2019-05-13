import { prompt, Question } from 'inquirer';

import ToolTypes from '../utils/ToolTypes';

interface Answer {
  tools: string[];
}

const chooseToolsQuestion: Question<Answer> = {
  name: 'tools',
  type: 'checkbox',
  message: 'Select which tools to use:',
  choices: [
    {
      name: 'ESLint',
      value: ToolTypes.eslint,
    },
    {
      name: 'lint-staged',
      value: ToolTypes.lintStaged,
    },
    {
      name: 'Prettier',
      value: ToolTypes.prettier,
    },
  ],
};

export default async function chooseToolsPrompt(): Promise<string[]> {
  const { tools } = await prompt<Answer>(chooseToolsQuestion);

  return tools;
}
