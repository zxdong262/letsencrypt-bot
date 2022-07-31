const { exec } = require('child_process')

module.exports = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(err || stderr)
      }
      resolve(stdout)
    })
  })
}
