import * as vm from 'vm';

export class Module {

  script;

  constructor(
    filepath: string,
    buffer: Buffer,
  ) {
    this.script = new vm.SourceTextModule(buffer.toString('utf8'), {
      identifier: filepath,
    });
  }

  async require() {
    console.log('requiring', this.script.identifier, this.script.status);
    await this.script.evaluate();
    return this.script.namespace as any;
  }

}
