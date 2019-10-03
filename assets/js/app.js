import '../css/app.scss';

global.$ = global.jQuery = require('jquery');

require('popper.js');
require('bootstrap');

require('./environment.js');
import {Hook} from './hook.js';

require('./logic-gate.js');
require('./about.js');
