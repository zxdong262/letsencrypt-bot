# letsencrypt-bot
an app to help handling letsencrypt renew/upodate

## when to use
- your server runs in `non-privilege user` and custom server

## how it works
- in root user, renew certs by certbot webroot periodly
- write updated certs to `non-privilege user`
- `non-privilege user` restart server to make it work

## how to use
- install certbot visit https://certbot.eff.org/ for more info
- make sure nodejs/npm installed in `root` and `non-privilege user`
- download and run this app in `non-privilege user`
```bash
git clone git@github.com:zxdong262/letsencrypt-bot.git
cd letsencrypt-bot
npm i --production
cp config.sample config.js
#then edit config.js, fill all the required options
# //requred: webroots
# // webroots: [
# //   {
# //     webroot: '/var/www/example.com',
# //     domains: ['example.com', 'www.example.com']
# //   },
# //   {
# //     webroot: '/var/www/some.com',
# //     domains: ['some.com', 'www.some.com']
# //   }
# // ],

# //requred: when certs updated, `non-privilege user` run cmd to restart server
# //restartServerCmd: 'nginx -s reload',

# //requred: app user certs location requred
# //userCertsSrc: '/home/xxxx/certs',

# //timer to do renew operation, default is first day of every month
# //visit https://github.com/node-schedule/node-schedule to seee more rules
# //schedule: '1 1 2 1 * *',

# //root certs location
# //rootCertsSrc: '/etc/letsencrypt/live'

## in root runs
cmds/run-root.sh

## in non-privilege user runs
cmds/run-user.sh

## or use pm2
# pm2 run cmds/run-root.sh

## both needed
```

## License
MIT
