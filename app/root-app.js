/**
 * runs in root
 */

const scheduler = require('node-schedule')
const exec = require('../lib/exec')
const {resolve} = require('path')
const {readdirSync, readFileSync, writeFileSync, existsSync} = require('fs')
const log = require('../lib/log')
const {mkdir} = require('shelljs')
const watch = require('watch')
const {
  webroots,
  rootCertsSrc,
  userCertsSrc,
  schedule,
  test
} = require('../config.default')


//certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com -w /var/www/thing -d thing.is -d m.thing.is
const run = async () => {
  log('start ')
  let cmd = webroots.reduce((prev, w) => {
    let {webroot, domains} = w
    let d = domains.map(dd => `-d ${dd}`).join(' ')
    return prev +
      ` -w ${webroot} ${d}`
  }, 'certbot certonly --force-renewal --webroot')
  log('cmd:', cmd)
  await exec(cmd)
    .then(out => {
      console.log(out)
    })
    .catch(err => {
      log('run certbot renew error:')
      log(err)
    })
}

const syncFiles = () => {
  let folders = readdirSync(rootCertsSrc)
  for (let f of folders) {
    let p = resolve(rootCertsSrc, f)
    let files = readdirSync(p)
    for (let file of files) {
      let pp = resolve(rootCertsSrc, f, file)
      let str = readFileSync(pp)
      let targetFolder = resolve(userCertsSrc, f)
      if (!existsSync(targetFolder)) {
        mkdir('-p', targetFolder)
      }
      let targetFile = resolve(userCertsSrc, f, file)
      writeFileSync(targetFile, str)
    }
  }
  let stamp = resolve(userCertsSrc, 'stamp')
  writeFileSync(stamp, new Date() + '')
}


watch.createMonitor(rootCertsSrc, function (monitor) {
  monitor.on('created', syncFiles)
  monitor.on('changed', syncFiles)
})
if (test) {
  run()
} else {
  scheduler.scheduleJob(schedule, run)
}

