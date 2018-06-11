import { KeyboardClassKey } from './keyboard-class-key.enum';

export interface IKeyboardLayout {
  name: string;
  keys: (string | KeyboardClassKey)[][][];
  lang?: string[];
}
