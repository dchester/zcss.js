function zcss(src) {
  const lines = [], stack = []
  let open, opened, close
  for (const line of src.split('\n')) {
    if (line.match(/^\s*@[msdk].*\{/)) {
      opened && lines.push('}')
      opened = open = close = false
      lines.push(line)
    } else if (line.match(/\{\s*$/)) {
      open = true
      stack.push(line.replace('{','').trim())
    } else if (line.match(/\s*\}\s*$/)) {
      close = true
      if (!stack.pop()) lines.push('}')
    } else {
      if (!line.trim()) continue
      if (opened && (open || close)) {
        opened = close = false
        lines.push('}')
      }
      if (open || close) {
        opened = true
        open = false
        lines.push(stack.join(' ').replace(/ &/g, '') + '{')
      }
      lines.push(line)
    }
  }
  if (close) lines.push('}')
  return lines.join('\n')
}

module.exports = { zcss }
