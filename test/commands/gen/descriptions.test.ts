import {expect, test} from '@oclif/test'

describe('gen:descriptions', () => {
  test
  .stdout()
  .command(['gen:descriptions'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['gen:descriptions', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
