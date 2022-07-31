const conf = {

  // webroots requred
  // webroots: [
  //   {
  //     webroot: '/var/www/example.com',
  //     domains: ['example.com', 'www.example.com']
  //   },
  //   {
  //     webroot: '/var/www/some.com',
  //     domains: ['some.com', 'www.some.com']
  //   }
  // ],

  // when certs updated, `non-privilege user` run cmd to restart server
  // restartServerCmd: 'nginx -s reload',

  // app user certs location requred
  // userCertsSrc: '/home/xxxx/certs',

  // timer to do renew operation, default is first day of every month
  // https://github.com/node-schedule/node-schedule
  schedule: '1 1 2 1 * *',

  // root certs location
  rootCertsSrc: '/etc/letsencrypt/live',

  // when test is true, use stage option
  test: false
}

try {
  const ext = require('./config.js')
  Object.assign(conf, ext)
  module.exports = conf
} catch (e) {
  console.log('no config.js, create config.js by `cp config.sample.js config.js`')
  process.exit(1)
}
