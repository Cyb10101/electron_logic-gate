'use strict';

import '../css/app.scss';

global.$ = global.jQuery = require('jquery');

require('bootstrap');
import './font-awesome.js';

import {Hook} from './hook.js';

require('./development.js');
require('./logic-gate.js');
require('./about.js');
