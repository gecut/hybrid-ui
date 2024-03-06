import { GecutAsyncDirective } from '@gecut/lit-helper/directives/async-directive.js';
import { directive } from 'lit/directive.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { html, nothing } from 'lit/html.js';

import type { MaybePromise } from '@gecut/types';
import type { PartInfo } from 'lit/directive.js';

export type SvgContent = MaybePromise<string>;

export interface IconContent {
  svg: SvgContent;
  flipIconInRtl?: boolean;
}

export class IconDirective extends GecutAsyncDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-icon');
  }

  render(content: IconContent): unknown {
    this.log.methodArgs?.('render', content);

    if (content.svg instanceof Promise) {
      content.svg.then((_svg) => {
        this.setValue(this._renderSvg(_svg));
      });
      return this._renderSvg();
    }
    else {
      return this._renderSvg(
        content.svg,
        content.flipIconInRtl ? 'rtl:-scale-x-100' : ''
      );
    }
  }

  protected _renderSvg(svg?: string, customClass = ''): unknown {
    this.log.methodArgs?.('_renderSvg', { svg, customClass });

    return html`
      <div
        class="${customClass} box-content text-[24px] h-[1em] w-[1em] align-middle
               [contain:size_layout_paint_style] [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
      >
        ${svg ? unsafeSVG(svg) : nothing}
      </div>
    `;
  }
}

export const icon = directive(IconDirective);
