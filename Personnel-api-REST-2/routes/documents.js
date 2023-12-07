const router = require('express').Router()
const swagger = require('../swagger.json')
router.get('/json', (req, res)=>{
    res.json(swagger);
})

// swagger
const swaggerUi = require('swagger-ui-express');
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagger))
// redoc
const redoc = require('redoc-express');
router.get('/redoc', redoc({title:'Personnel API', specUrl:'/api/documents/json'}))
module.exports = router 