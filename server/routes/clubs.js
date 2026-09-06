import {Router} from 'express'; import * as c from '../controllers/clubs.js'; const r=Router();r.get('/',c.list);export default r;
