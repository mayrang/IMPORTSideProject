import express from 'express'
import 'express-async-errors'
import axios from 'axios'
import { config } from '../config.js'

const router = express.Router();

router.get('/',  (req,res,next)=>{
    let year = req.query.year;
    let month = req.query.month;

    
    axios({
        method: 'get',
        url: config.openapi.url + config.openapi.year + `${year}` + config.openapi.month + `${month}`
      }).then(function(response){
        console.log(response.data.response.body.items)
        if(response.data.response.body.totalCount===1)
            res.status(200).json([response.data.response.body.items.item]);
        else 
            res.status(200).json(response.data.response.body.items.item);
      })


})

export default router;