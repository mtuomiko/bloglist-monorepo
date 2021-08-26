import JestRunner from 'jest-runner'

class SerialJestRunner extends JestRunner {
  constructor(...args) {
    super(...args)
    this.isSerial = true
  }
}

module.exports = SerialJestRunner