import * as core from '@actions/core'
import { configMsg, run } from '../index'
import { Errors } from '../src/App.types'

describe('Install app', () => {
    const original = process.env
    const envs = {
        appSysID: '',
        password: 'test',
        scope: '',
        snowInstallInstance: 'test',
        username: 'test',
    }
    beforeEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
        process.env = { ...original, ...envs }
        jest.spyOn(core, 'setFailed')
    })
    it('fails without creds', () => {
        // simulate the secrets are not set
        process.env = {}
        const errors = [Errors.USERNAME, Errors.PASSWORD, Errors.INSTALL_INSTANCE, Errors.SYSID_OR_SCOPE].join('. ')

        run()

        expect(core.setFailed).toHaveBeenCalledWith(`${errors}${configMsg}`)
    })

    it('app_sys_id and not app_scope', () => {
        // simulate the secrets are not set
        process.env = {
            snowInstallInstance: 'test',
            appSysID: '123',
        }
        const errors = [Errors.USERNAME, Errors.PASSWORD].join('. ')

        run()

        expect(core.setFailed).toHaveBeenCalledWith(`${errors}${configMsg}`)
    })

    it('success with creds', () => {
        // do not set process env
        // workflow run the tests
        // it will take envs from the workflow
        run()
        expect(core.setFailed).not.toHaveBeenCalled()
    })
})
