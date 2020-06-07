import express from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import {celebrate,Joi} from 'celebrate';

// index, show, create, update, delete

const upload = multer(MulterConfig)

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items',itemsController.index);

routes.get('/points', pointsController.index); 
routes.get('/points/:id', pointsController.show); 

routes.post(
    '/points',
     upload.single('image'),
     celebrate({
        body:Joi.object().keys({
            name:Joi.string().required(),
            email:Joi.string().required().email(),
            whatsapp:Joi.string().required(),
            latitude:Joi.number().required(),
            longitude:Joi.number().required(),
            city:Joi.string().required(),
            uf:Joi.string().required().max(2),
            items:Joi.string().required(),
        })
     },{
         abortEarly:false
     }),
     pointsController.create);


    export default routes;