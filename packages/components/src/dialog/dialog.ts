import {map} from '@gecut/lit-helper';
import {GecutDirective} from '@gecut/lit-helper/directives/directive.js';
import {nextAnimationFrame} from '@gecut/utilities/wait/polyfill.js';
import {untilEvent, untilNextFrame} from '@gecut/utilities/wait/wait.js';
import {directive, type PartInfo} from 'lit/directive.js';
import {createRef, ref, type Ref} from 'lit/directives/ref.js';
import {styleMap} from 'lit/directives/style-map.js';
import {when} from 'lit/directives/when.js';
import {html, nothing} from 'lit/html.js';

import {gecutButton} from '../button/button.js';
import {divider} from '../divider/divider.js';
import {icon} from '../icon/icon.js';
import {iconButton} from '../icon-button/icon-button.js';

import type {BasicDialog, DialogContent, DialogSignals} from './_type';

export class GecutDialogDirective extends GecutDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-dialog');
  }

  dialogRef: Ref<HTMLDivElement> = createRef();

  render(content: DialogContent, open = false): unknown {
    this.log.methodArgs?.('render', content);

    nextAnimationFrame(async () => {
      const dialog = this.dialogRef.value;
      const backdrop = dialog?.querySelector('div');

      if (dialog && backdrop) {
        const isOpen = dialog.classList.contains('open');

        if (isOpen && !open) {
          dialog.classList.add('closing');

          await untilNextFrame();
          await untilEvent(backdrop, 'animationend');

          dialog.classList.remove('open', 'closing');
        }
        else if (!isOpen && open) {
          dialog.classList.add('open', 'opening');

          await untilNextFrame();
          await untilEvent(backdrop, 'animationend');

          dialog.classList.remove('opening');
        }
      }
    });

    if (content.fullscreen) {
      return nothing;
    }
    else {
      return this.renderBasicDialog(content);
    }
  }

  protected renderBasicDialog(content: BasicDialog) {
    return html`
      <div
        class="dialog z-fixed fixed inset-0 [&.open]:flex [&:not(.open)]:hidden items-center
               justify-center p-4 group/dialog"
        ${ref(this.dialogRef)}
      >
        <div
          class="absolute inset-0 z-scrim bg-scrim/45
                    group-[.open.opening]/dialog:animate-fadeIn
                    group-[.open.closing]/dialog:animate-fadeOut"
        ></div>

        <div
          class="flex flex-col w-max h-max z-modal min-w-72 relative
                 motion-safe:group-[.open.opening]/dialog:animate-zoomFadeIn
                 motion-safe:group-[.open.closing]/dialog:animate-zoomFadeOut
                 motion-reduce:group-[.open.opening]/dialog:animate-fadeIn
                 motion-reduce:group-[.open.closing]/dialog:animate-fadeOut"
          style=${styleMap({
            maxWidth: content.options?.maxWidth,
          })}
        >
          <div
            class="bg-surfaceContainerHigh absolute inset-0 z-below
                   motion-safe:group-[.open.opening]/dialog:animate-zoomSlideIn
                   motion-safe:group-[.open.closing]/dialog:animate-zoomSlideOut
                   elevation-3 rounded-extra-large"
          ></div>

          ${this.renderBasicDialogHeader(content)} ${this.renderBasicDialogMain(content)}
        </div>
      </div>
    `;
  }
  protected renderBasicDialogHeader(content: BasicDialog) {
    const hasIcon = content.icon != null;
    const hasButtons = content.buttons && content.buttons.length > 0;

    return html`
      <div class="flex flex-col pt-6 px-6">
        ${when(
          hasIcon,
          () => html`
            <div class="flex text-secondary justify-center pb-6 [&+div>h2]:text-center">${icon(content.icon!)}</div>
          `,
        )}

        <div class="flex w-full gap-2 items-center">
          ${when(!hasIcon && !hasButtons, () =>
            iconButton({
              onClick: this.close(content, 'cancel').bind(this),
              // eslint-disable-next-line max-len
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144m224 0L144 368"/></svg>',
            }),
          )}

          <h2 class="text-headlineSmall text-onSurface grow ${content.content ? '-order-1' : ''}">
            ${content.headline}
          </h2>
        </div>
      </div>
    `;
  }
  protected renderBasicDialogMain(content: BasicDialog) {
    const hasContent = content.content != null;
    const hasButtons = content.buttons && content.buttons.length > 0;
    const hasDivider = typeof content.content !== 'string' && content.divider !== false;

    return html`
      <div class="p-6 pt-4 text-bodyMedium text-onSurfaceVariant">
        ${when(
          hasContent,
          () => html`
            ${when(hasDivider, () => divider({}))}
            <div class="scrollable leading-tight ${hasDivider ? 'py-2' : ''}">${content.content}</div>
            ${when(hasDivider, () => divider({}))}
          `,
        )}
        ${when(
          hasButtons,
          () => html`
            <div class="flex w-full gap-1 pt-6">
              ${map(this, content.buttons, (buttonContent) => {
                if (typeof buttonContent === 'string') {
                  return html`<div class="grow"></div>`;
                }

                return gecutButton({
                  ...buttonContent,

                  onClick: this.close(content, buttonContent.value),
                });
              })}
            </div>
          `,
        )}
      </div>
    `;
  }
  protected close<T extends DialogSignals>(content: T, value: string): () => void {
    return () => {
      this.log.methodArgs?.('close', {value});

      content.controller.setValue('close');
      content.provider.setValue(value);
    };
  }
}

export const gecutDialog = directive(GecutDialogDirective);
