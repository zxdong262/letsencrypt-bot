module.exports = {

  // requred: webroots
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

  // requred: when certs updated, `non-privilege user` run cmd to restart server
  // restartServerCmd: 'nginx -s reload',

  // requred: app user certs location requred
  // userCertsSrc: '/home/xxxx/certs',

  // timer to do renew operation, default is first day of every month
  // visit https://github.com/node-schedule/node-schedule to seee more rules
  // schedule: '1 1 2 1 * *',

  // root certs location
  // rootCertsSrc: '/etc/letsencrypt/live',

  // when test is true, use stage option
  // test: false,

  // check server for nginx running
  // checkServer: 'https://zgc.html5beta.com'
}
