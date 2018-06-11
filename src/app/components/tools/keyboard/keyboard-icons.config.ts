import { InjectionToken } from '@angular/core';
import { KeyboardClassKey } from './keyboard-class-key.enum';
import { IKeyboardIcons } from './keyboard-icons.interface';

const KEYBOARD_ICONS = new InjectionToken<IKeyboardIcons>('keyboard-icons.config');
const keyboardIcons: IKeyboardIcons = {
  [KeyboardClassKey.Bksp]: 'fas fa-long-arrow-alt-left', // 'keyboard_backspace',
  [KeyboardClassKey.Caps]: 'fas fa-lock', // 'keyboard_capslock',
  [KeyboardClassKey.Enter]: 'fas fa-level-down-alt', // 'keyboard_return',
  [KeyboardClassKey.Shift]: 'far fa-caret-square-up', // 'keyboard_arrow_up',
  [KeyboardClassKey.Space]: ' ',
  [KeyboardClassKey.Tab]: 'fas fa-exchange-alt' // 'keyboard_tab'
};

const KEYBOARD_ICONS_TRANSFORM = new InjectionToken<IKeyboardIcons>('keyboard-icons-transform.config');
const keyboardIconsTransform: IKeyboardIcons = {
  [KeyboardClassKey.Enter]: 'rotate-90'
};

export { IKeyboardIcons, KEYBOARD_ICONS, KEYBOARD_ICONS_TRANSFORM, keyboardIcons,keyboardIconsTransform };
