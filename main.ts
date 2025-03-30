import * as immaculata from 'immaculata'

const runtime = new immaculata.Runtime()

const isDev = process.argv[2] !== 'generate'

const action = isDev ? immaculata.startDevServer : immaculata.generateFiles

action(runtime)
