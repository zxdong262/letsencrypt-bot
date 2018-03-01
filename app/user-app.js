/**
 * runs in root
 */

const exec = require('../lib/exec')
const log = require('../lib/log')
const watch = require('watch')
const {
  userCertsSrc,
  restartServerCmd
} = require('../config.default')


//certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com -w /var/www/thing -d thing.is -d m.thing.is
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

watch.createMonitor(userCertsSrc, {
  filter: f => f.includes('stamp')
}, function (monitor) {
  log('monitor started')
  monitor.on('created', restartServer)
  monitor.on('changed', restartServer)

})

