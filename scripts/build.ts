import { mkdir, readdir, rm, copyFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const srcDir = path.resolve(rootDir, 'src')
const libDir = path.resolve(rootDir, 'lib')
const rootReadme = path.resolve(rootDir, 'README.md')
const rootLicense = path.resolve(rootDir, 'LICENSE')
const publishPackageJson = path.resolve(rootDir, 'package.publish.json')

async function main() {
  await rm(libDir, { recursive: true, force: true })
  await copyDirectory(srcDir, libDir)
  await copyFile(publishPackageJson, path.join(libDir, 'package.json'))
  await copyFile(rootReadme, path.join(libDir, 'README.md'))
  await copyFile(rootLicense, path.join(libDir, 'LICENSE'))
}

async function copyDirectory(from: string, to: string) {
  await mkdir(to, { recursive: true })
  const entries = await readdir(from, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name.toLowerCase() === 'readme.md') continue

    const fromPath = path.join(from, entry.name)
    const toPath = path.join(to, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(fromPath, toPath)
      continue
    }

    await copyFile(fromPath, toPath)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
