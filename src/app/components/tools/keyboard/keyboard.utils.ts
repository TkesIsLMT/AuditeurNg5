import { KeyboardConfig } from './keyboard.config';
import { IKeyboardLayouts } from './keyboard-layouts.interface';
import { ILocaleMap } from './locale-map.interface';

/**
 * Applies default options to the keyboard configs.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
export function _applyConfigDefaults(config: KeyboardConfig): KeyboardConfig {
  return Object.assign(new KeyboardConfig(), config);
}

/**
 * Applies available layouts.
 * @param layouts
 */
export function _applyAvailableLayouts(layouts: IKeyboardLayouts): ILocaleMap {
  const _availableLocales: ILocaleMap = {};

  Object
    .keys(layouts)
    .filter((layout: string) => 'lang' in layouts[layout])
    .forEach((layout: string) => {
      layouts[layout].lang.forEach((lang: string) => {
        _availableLocales[lang] = layout;
      });
    });

  return _availableLocales;
}
