'use strict';

class Environment {
    isProduction() {
        return global.process.env.APP_ENV || false;
    }

    isDevelopment() {
        return global.process.env.APP_ENV && global.process.env.APP_ENV === 'dev';
    }
}

export const environment = new Environment();
