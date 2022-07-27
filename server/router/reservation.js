import express from 'express'
import 'express-async-errors'
// import { body } from 'express-validator'
import axios from 'axios'
import { config } from '../config.js'

const router = express.Router();

router.get('/', (req,res,next)=>{
    var year = '2022';
    var month = '09';

    axios({
        method: 'get',
        url: config.openapi.url + config.openapi.year + `${year}` + config.openapi.month + `${month}`
      }).then(function(response){
        console.log(response.data.response.body.items.item);
      })
})

export default router;