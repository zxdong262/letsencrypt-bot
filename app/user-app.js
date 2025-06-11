/**
 * runs in root
 */

const exec = require('../lib/exec')
const log = require('../lib/log')
const watch = require('watch')
const axios = require('axios')
const {
  userCertsSrc,
  restartServerCmd,
  startServerCmd,
  checkServerUrl
} = require('../config.default')

async function checkServer () {
  return axios.get(checkServerUrl)
    .then(() => 'running')
    .catch(err => {
      console.log(err)
      return 'not running'
    })
}

const restartServer = async () => {
  log('restartServerCmd:', restartServerCmd)
  await exec(restartServerCmd)
    .then(out => {
      console.log(out)
    })
    .catch(err => {
      log('restartServerCmd error:')
      log(err.stack)
    })
}

const startServer = async () => {
  log('start up nginx:', startServerCmd)
  const running = await checkServer()
  if (running === 'running') {
    return console.log('already running, no need to start')
  }
  await exec(startServerCmd)
    .then(out => {
      console.log(out)
    })
    .catch(err => {
      log('startServerCmd error:')
      log(err.stack)
    })
}

watch.createMonitor(userCertsSrc, {
  filter: f => f.includes('stamp')
}, function (monitor) {
  log('monitor started')
  monitor.on('created', restartServer)
  monitor.on('changed', restartServer)
})

watch.createMonitor(userCertsSrc, {
  filter: f => f.includes('start-up-nginx')
}, function (monitor) {
  log('nginx start monitor started')
  monitor.on('created', startServer)
  monitor.on('changed', startServer)
})
