// 'use strict';
// const express = require('express');
// const app = express();
// // ======== Commenting this out for now ============
// // const Router = require('express').Router;
// // This parses the request body -- route level middleware
// // const jsonParser = require('body-parser').json();
// // const debug = require('debug')('calcifer:entry-router');
// // const responsesData = require('../model/responses-data');
//
// // const entryRouter = module.exports = new Router();
//
// // we built this router === need to go look at this express router...
// // const responseRouter = new Router();
//
// // POSSIBLE ALTERNATIVE
// // const jsonParser = require('body-parser').json();
// // const responseRouter = (module.exports = new require('express').Router());
//
// const Entry = require('../model/responses-data.js');
//
// // TO TEST THIS:  Run the server! npm start!  Go to localhost:3000/  and check the terminal! Where the server is running!  You should see a get request console.log!
// app.get('/', function(req, res){
//   console.log('GET request');
//   res.end();
// });
//
// // I believe that this api thing is customized by use... WE HAVE JUST DEFINED THE ROUTE...
// // responseRouter.post('/api/responses', jsonParser, (req, res, next) => {
// //   console.log(req.body);
// //   console.log('hit POST /api/categories');
// //   new Entry(req.body).save()
// //     .then(entry => res.json(entry))
// //     .catch(next);
// // });
//
// // categoryRouter.get('/api/categories/:id', (req, res, next) => {
// //   console.log('hit GET /api/categories/:id');
// //   ExpenseCategory.findById(req.params.id)
// //     .then(category => res.json(category))
// //     .catch(next);
// // });
// //
// // categoryRouter.get('/api/categories', (req, res, next) => {
// //   console.log('hit /api/categories');
// //
// //   let pageNumber = Number(req.query.page);
// //   if (!pageNumber || pageNumber < 1) pageNumber = 1;
// //   pageNumber--;
// //
// //   ExpenseCategory.find({})
// //     .sort({ title: 'asc' })
// //     .skip(pageNumber * 50)
// //     .limit(50)
// //     .then(categories => res.json(categories))
// //     .catch(next);
// // });
// //
// // categoryRouter.put('/api/categories/:id', jsonParser, (req, res, next) => {
// //   console.log('hit PUT /api/categories/:id', req.params);
// //   ExpenseCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
// //     .then(category => {
// //       res.json(category);
// //     })
// //     .catch(next);
// // });
// //
// // categoryRouter.delete('/api/categories/:id', (req, res, next) => {
// //   console.log('hit DELETE /api/categories/:id');
// //
// //   ExpenseCategory.findByIdAndRemove(req.params.id)
// //     .then(res.sendStatus(204))
// //     .catch(next);
// // });
//
//
//
// // // VIDEO BRIAN 401
// // // This is the ROUTER constructor!  Pulls in Router object.
// // const Router = require('express').Router;
// // // This parses the request body -- route level middleware
// // const jsonParser = require('body-parser').json();
// // const debug = require('debug')('calcifer:entry-router');
// // const responsesData = require('../model/responses-data');
// // // we built this router === need to go look at this express router...
// // const responseRouter = new Router();
// // //
// // // responseRouter.post('/api/reponse', jsonParser, function(req, res, next){
// // //   debug('POST: /api/response');
// // //   responsesData.createNote(req.body)
// // //   .then( entry => res.json(entry))
// // //   .catch( err => next(err));
// // // });
