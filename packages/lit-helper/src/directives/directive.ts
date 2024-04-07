import {GecutLogger} from '@gecut/logger';
import {Directive, PartType} from 'lit-html/directive.js';

import type {Part, PartInfo} from 'lit-html/directive.js';
import type {ClassInfo} from 'lit-html/directives/class-map.js';

export abstract class GecutDirective extends Directive {
  constructor(partInfo: PartInfo, name: string) {
    super(partInfo);
    this.name = name;
    this.log = new GecutLogger(`<${this.name}>`);

    this.log.methodArgs?.('constructor', Object.keys(PartType)[partInfo.type - 1]);
  }

  protected log;
  protected name;

  override update(_part: Part, props: unknown[]): unknown {
    this.log.methodArgs?.('update', props);
    return this.render(...props);
  }

  protected getRenderClasses(): ClassInfo {
    return {
      [this.name]: true,
    };
  }
}
