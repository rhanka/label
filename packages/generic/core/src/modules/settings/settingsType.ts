import { buildModel } from '../modelType';

export { categoryIconNames, constantColors, settingsModel, shadeColors };

export type {
  categoryIconNameType,
  categorySettingType,
  colorType,
  constantColorType,
  displayModeType,
  settingsType,
  shadeColorType,
};

type settingsType = {
  [category: string]: categorySettingType;
};

type categorySettingType = {
  anonymization: string;
  color: { [displayMode in displayModeType]: colorType };
  couldBe?: string;
  iconName: categoryIconNameType;
  isAnonymized?: boolean;
  isSensitive?: boolean;
  order: number | undefined;
  status: 'hidden' | 'alwaysVisible' | 'annotable';
  text: string;
};

type displayModeType = 'lightMode' | 'darkMode';

const categoryIconNames = [
  'bank',
  'book',
  'cake',
  'car',
  'child',
  'city',
  'cloud',
  'email',
  'forbidden',
  'hammer',
  'heart',
  'location',
  'map',
  'pencil',
  'person',
  'phone',
  'store',
  'web',
  'work',
] as const;

type categoryIconNameType = typeof categoryIconNames[number];

const constantColors = ['black', 'white'] as const;

const shadeColors = [
  'blue',
  'blueGrey',
  'brown',
  'cyan',
  'deepOrange',
  'deepPurple',
  'green',
  'grey',
  'indigo',
  'lightBlue',
  'lightGreen',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
] as const;

type constantColorType = typeof constantColors[number];

type shadeColorType = [typeof shadeColors[number], number];

type colorType = constantColorType | shadeColorType;

// The settings are passed as a JSON string to parse
const settingsModel = buildModel({
  kind: 'object',
  content: {
    json: { kind: 'primitive', content: 'string' },
  },
} as const);
