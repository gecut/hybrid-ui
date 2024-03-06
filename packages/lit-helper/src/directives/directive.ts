import { GecutLogger } from '@gecut/logger';
import { Directive, PartType } from 'lit-html/directive.js';

import type { Part, PartInfo } from 'lit-html/directive.js';

export abstract class GecutDirective extends Directive {
  constructor(partInfo: PartInfo, debugName: string) {
    super(partInfo);
    this.log = new GecutLogger(`<${debugName}>`);

    this.log.methodArgs?.(
      'constructor',
      Object.keys(PartType)[partInfo.type - 1]
    );
  }

  protected log;

  override update(_part: Part, props: unknown[]): unknown {
    this.log.methodArgs?.('update', props);
    return this.render(...props);
  }
}
