// External modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Angular CDK
import { LIVE_ANNOUNCER_PROVIDER } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
// Angular material
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// Configs
import { keyboardDeadkeys, KEYBOARD_DEADKEYS } from './keyboard-deadkey.config';
import { keyboardIcons, KEYBOARD_ICONS, KEYBOARD_ICONS_TRANSFORM, keyboardIconsTransform } from './keyboard-icons.config';
import { keyboardLayouts, KEYBOARD_LAYOUTS } from './keyboard-layouts.config';
// Components and directives
import { KeyboardContainerComponent } from './keyboard-container/keyboard-container.component';
import { KeyboardKeyComponent } from './keyboard-key/keyboard-key.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardDirective } from './keyboard.directive';
// Providers
import { KeyboardKebabCasePipe } from './kebab-case.pipe';
import { KeyboardService } from './keyboard.service';

@NgModule({
  imports: [
    // Angular modules
    CommonModule,
    OverlayModule,

    // Cdk modules
    PortalModule,

    // Material modules
    MatButtonModule,
    MatCommonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    KeyboardComponent,
    KeyboardContainerComponent,
    KeyboardKeyComponent,
    KeyboardDirective
  ],
  declarations: [
    KeyboardKebabCasePipe,
    KeyboardComponent,
    KeyboardContainerComponent,
    KeyboardKeyComponent,
    KeyboardDirective
  ],
  entryComponents: [
    KeyboardComponent,
    KeyboardContainerComponent,
    KeyboardKeyComponent
  ],
  providers: [
    KeyboardService,
    LIVE_ANNOUNCER_PROVIDER,
    { provide: KEYBOARD_DEADKEYS, useValue: keyboardDeadkeys },
    { provide: KEYBOARD_ICONS, useValue: keyboardIcons },
    { provide: KEYBOARD_ICONS_TRANSFORM, useValue: keyboardIconsTransform },
    { provide: KEYBOARD_LAYOUTS, useValue: keyboardLayouts }
  ]
})
export class KeyboardModule {}
