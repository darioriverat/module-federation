import loadModuleOne from './remotes/app_one.js'
import loadModuleTwo from './remotes/app_two.js'

const remotes = [loadModuleOne, loadModuleTwo]

// loop to load each one
remotes.forEach(remote => {
    // this code executes asynchronous and non-blocking
    remote()
})
