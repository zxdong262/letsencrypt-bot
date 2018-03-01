module.exports = {

  //requred: webroots
  // webroots: [
  //   {
  //     src: '/var/www/example.com',
  //     domains: ['example.com', 'www.example.com']
  //   },
  //   {
  //     src: '/var/www/some.com',
  //     domains: ['some.com', 'www.some.com']
  //   }
  // ],

  //requred: when certs updated, `non-privilege user` run cmd to restart server
  //restartServerCmd: 'nginx -s reload',

  //requred: app user certs location requred
  //userCertsSrc: '/home/xxxx/certs',

  //timer to do renew operation, default is first day of every month
  //visit https://github.com/node-schedule/node-schedule to seee more rules
  //schedule: '* * * 1 * *',

  //root certs location
  //rootCertsSrc: '/etc/letsencrypt/live'
}
