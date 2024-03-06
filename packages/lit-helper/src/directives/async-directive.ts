import { GecutLogger } from '@gecut/logger';
import { AsyncDirective, PartType } from 'lit-html/async-directive.js';

import type { Part, PartInfo } from 'lit-html/directive.js';

export abstract class GecutAsyncDirective extends AsyncDirective {
  constructor(partInfo: PartInfo, debugName: string) {
    super(partInfo);
    this.log = new GecutLogger(`<${debugName}>`);

    this.log.methodArgs?.(
      'constructor',
      Object.keys(PartType)[partInfo.type - 1]
    );
  }

  protected log;

  override setValue(value: unknown): void {
    this.log.methodArgs?.('setValue', value);
    super.setValue(value);
  }

  override update(_part: Part, props: unknown[]): unknown {
    this.log.methodArgs?.('update', props);
    return this.render(...props);
  }

  protected override reconnected(): void {
    this.log.method?.('reconnected');
    super.reconnected();
  }

  protected override disconnected(): void {
    this.log.method?.('disconnected');
    super.disconnected();
  }
}
