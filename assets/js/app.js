import '../css/app.scss';

global.$ = global.jQuery = require('jquery');

require('popper.js');
require('bootstrap');

import {Hook} from './hook.js';

require('./development.js');
require('./logic-gate.js');
require('./about.js');
