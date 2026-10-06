import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const contentDir = join(import.meta.dirname, '..', 'content')
const publicDir = join(import.meta.dirname, '..', 'public')

const files = readdirSync(contentDir, { recursive: true, encoding: 'utf8' }).filter(file => file.endsWith('.md'))
const pages = files.map((file) => {
  const source = readFileSync(join(contentDir, file), 'utf8').replace(/\r\n/g, '\n')
  const path = '/' + relative('.', file).replace(/\\/g, '/').replace(/\.md$/, '').replace(/(^|\/)index$/, '')
  return { file, source, path: path === '/' ? '/' : path.replace(/\/$/, '') }
})
const paths = new Set(pages.map(page => page.path))
const frontmatter = (source: string) => source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''

describe('content', () => {
  it.each(pages)('$file has a layout and a title', ({ source }) => {
    expect(frontmatter(source)).toMatch(/^layout: \w+/m)
    expect(frontmatter(source)).toMatch(/^title: .+/m)
  })

  it.each(pages)('$file only links to pages that exist', ({ source }) => {
    const links = [...source.matchAll(/\]\((\/[^)#\s]*)/g)].map(match => match[1]!.replace(/\/$/, '') || '/')
    for (const link of links) expect(paths, `${link} has no page`).toContain(link)
  })

  it.each(pages)('$file only uses cover images that exist', ({ source }) => {
    const cover = frontmatter(source).match(/^cover: (.+)$/m)?.[1]
    if (cover) expect(existsSync(join(publicDir, cover)), `${cover} is missing`).toBe(true)
  })
})
