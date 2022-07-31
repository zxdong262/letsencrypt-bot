/**
 * runs in root
 */

const { resolve } = require('path')
const { readdirSync, readFileSync, writeFileSync, existsSync } = require('fs')
const log = require('../lib/log')
const { mkdir } = require('shelljs')
const watch = require('watch')
const {
  rootCertsSrc,
  userCertsSrc
} = require('../config.default')

// certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com -w /var/www/thing -d thing.is -d m.thing.is
const run = async () => {
  log('start nginx')
  setTimeout(() => {
    const file = resolve(userCertsSrc, 'start-up-nginx.txt')
    writeFileSync(file, new Date() + '')
  }, 1000)
}

function tryReadDir (p) {
  try {
    return readdirSync(p)
  } catch (e) {
    console.log('not a dir', e)
    return []
  }
}

const syncFiles = () => {
  console.log('syncFiles')
  const folders = readdirSync(rootCertsSrc)
  for (const f of folders) {
    const p = resolve(rootCertsSrc, f)
    const files = tryReadDir(p)
    for (const file of files) {
      const pp = resolve(rootCertsSrc, f, file)
      const str = readFileSync(pp)
      const targetFolder = resolve(userCertsSrc, f)
      if (!existsSync(targetFolder)) {
        mkdir('-p', targetFolder)
      }
      const targetFile = resolve(userCertsSrc, f, file)
      writeFileSync(targetFile, str)
    }
  }
  const stamp = resolve(userCertsSrc, 'stamp')
  writeFileSync(stamp, new Date() + '')
}

watch.createMonitor(rootCertsSrc, function (monitor) {
  log('monitor started1')
  monitor.on('created', syncFiles)
  monitor.on('changed', syncFiles)
})

run()
