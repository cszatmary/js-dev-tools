import { prompt, Question } from 'inquirer';

import ToolTypes from '../utils/ToolTypes';

export type Transpiler = 'babel' | 'typescript' | 'typescriptBabel' | 'none';

interface Answer {
  transpiler: Transpiler;
}

const useTypescriptQuestion: Question<Answer> = {
  name: 'transpiler',
  type: 'list',
  message: 'Choose which transpiler to use?',
  choices: [
    {
      name: 'Babel',
      value: ToolTypes.babel,
    },
    {
      name: 'TypeScript',
      value: ToolTypes.typescript,
    },
    {
      name: 'TypeScript + Babel',
      value: ToolTypes.typescriptBabel,
    },
    {
      name: 'None',
      value: 'none',
    },
  ],
};

export default async function chooseTranspiler(): Promise<Transpiler> {
  const { transpiler } = await prompt<Answer>(useTypescriptQuestion);

  return transpiler;
}
