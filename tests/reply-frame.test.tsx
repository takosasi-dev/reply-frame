import { expect, test } from 'claude-code/testing'

const SURFACES = ['terminal', 'desktop', 'vscode', 'mobile'] as const

test('返答が枠付きで描かれる（全画面種）', async $ => {
  for (const surface of SURFACES) {
    const ui = await $.ui.mount({
      plugin: 'reply-frame',
      surface,
      component: 'AssistantMessage',
      props: { text: '**こんにちは**', isFirstOfReply: true },
    })
    expect(await ui.drawn()).toMatchObject({ type: 'Box', props: { borderStyle: 'round' } })
    expect((await ui.find({ type: 'Markdown' }))?.text).toBe('**こんにちは**')
    await ui.unmount()
  }
})

test('長すぎる返答は標準の描画に任せる', async ($, on) => {
  // 標準の描画の代役
  on('ui.render', { component: 'AssistantMessage' }, ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine</Text>
  })
  const ui = await $.ui.mount({
    plugin: 'reply-frame',
    surface: 'vscode',
    component: 'AssistantMessage',
    props: { text: 'a'.repeat(10001), isFirstOfReply: true },
  })
  expect(await ui.find({ type: 'Box' })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'engine' })).toBeDefined()
  await ui.unmount()
})
