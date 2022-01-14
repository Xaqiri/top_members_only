var express = require('express');
var router = express.Router();
const index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.home);

router.get('/api/message', index_controller.api_message_get);

router.get('/sign-up', index_controller.sign_up_get);

router.get('/sign-in', index_controller.sign_in_get);

router.post('/sign-up', index_controller.sign_up_post);

router.post("/sign-in", index_controller.sign_in_post);

router.get('/log-out', index_controller.log_out);

router.get('/new-message', index_controller.new_message_get);

router.post('/new-message', index_controller.new_message_post);

module.exports = router;
