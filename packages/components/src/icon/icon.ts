import {GecutAsyncDirective} from '@gecut/lit-helper/directives/async-directive.js';
import {directive} from 'lit/directive.js';
import { classMap} from 'lit/directives/class-map.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {html, nothing} from 'lit/html.js';

import type {MaybePromise} from '@gecut/types';
import type {PartInfo} from 'lit/directive.js';
import type {ClassInfo} from 'lit/directives/class-map.js';

export type SvgContent = MaybePromise<string>;

export interface IconContent {
  svg: SvgContent;
  flipIconInRtl?: boolean;
}

export class IconDirective extends GecutAsyncDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, 'gecut-icon');
  }

  protected content?: IconContent;

  render(content: IconContent): unknown {
    this.log.methodArgs?.('render', content);

    this.content = content;

    if (this.content.svg instanceof Promise) {
      this.content.svg.then((_svg) => {
        console.log(_svg);
        this.setValue(this._renderSvg(_svg));
      });
      // eslint-disable-next-line max-len
      return this._renderSvg('<svg viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2.5"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>');
    }
    else {
      return this._renderSvg(this.content.svg);
    }
  }

  protected _renderSvg(svg?: string): unknown {
    this.log.methodArgs?.('_renderSvg', {svg});

    return html`<div class="${classMap(this.getRenderClasses())}">${svg ? unsafeSVG(svg) : nothing}</div>`;
  }

  protected override getRenderClasses(): ClassInfo {
    return {
      ...super.getRenderClasses(),

      'rtl:-scale-x-100': this.content?.flipIconInRtl ?? false,
    };
  }
}

export const icon = directive(IconDirective);
