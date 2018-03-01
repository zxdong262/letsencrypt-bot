/**
 * runs in root
 */

const exec = require('../lib/exec')
const log = require('../lib/log')
const {
  userCertsSrc,
  restartServerCmd
} = require('../config.default')


//certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com -w /var/www/thing -d thing.is -d m.thing.is
const restartServer = async () => {
  log('restartServerCmd:', restartServerCmd)
  await exec(cmd)
    .catch(err => {
      log('restartServerCmd error:')
      log(err.stack)
    })
}

watch.createMonitor(userCertsSrc, function (monitor) {

  monitor.on('created', syncFiles)
  monitor.on('changed', restartServer)

})

schedule.scheduleJob(config.schedule, run)
