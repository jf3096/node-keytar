var keytar = require('../build/Release/keytar.node');
var deasyncPromise = require('deasync-promise');

function checkRequired(val, name) {
    if (!val || val.length <= 0) {
        throw new Error(name + ' is required.');
    }
}

function callbackPromise(callback) {
    if (typeof callback === 'function') {
        return new Promise(function (resolve, reject) {
            callback((err, val) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(val)
                }
            })
        })
    } else {
        throw new Error('Callback required')
    }
}

module.exports = {
    getPassword: function (service, account) {
        checkRequired(service, 'Service');
        checkRequired(account, 'Account');

        return callbackPromise(callback => keytar.getPassword(service, account, callback));
    },

    getPasswordSync: function (service, account) {
        return deasyncPromise(module.exports.getPassword(service, account));
    },

    setPassword: function (service, account, password) {
        checkRequired(service, 'Service');
        checkRequired(account, 'Account');
        checkRequired(password, 'Password');

        return callbackPromise(callback => keytar.setPassword(service, account, password, callback));
    },

    setPasswordSync: function (service, account, password) {
        return deasyncPromise(module.exports.setPassword(service, account, password));
    },

    deletePassword: function (service, account) {
        checkRequired(service, 'Service');
        checkRequired(account, 'Account');

        return callbackPromise(callback => keytar.deletePassword(service, account, callback));
    },

    deletePasswordSync: function (service, account) {
        return deasyncPromise(module.exports.deletePassword(service, account));
    },

    findPassword: function (service) {
        checkRequired(service, 'Service');

        return callbackPromise(callback => keytar.findPassword(service, callback));
    },

    findPasswordSync: function (service) {
        return deasyncPromise(module.exports.findPassword(service));
    }
};
