
import 'mocha';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { MongoClient } from 'mongodb';

import {config} from './config';

import { connectObs } from './mongo-obs';
import { collectionObs } from './mongo-obs';
import { createCollectionObs } from './mongo-obs';
import { insertManyObs } from './mongo-obs';
import { findObs } from './mongo-obs';
import { dropObs } from './mongo-obs';

describe('mongo observable functions chained', () => {

    it('connects to db, drops a collection, re-create the collection, inserts 3 objects, query the collection', done => {

        const uri = config.mongoUri;
        const dbName = 'mydb';
        const collectionName = 'testColl';
        let connectedClient: MongoClient;

        const objectsToInsert = [
            {name: 'Lucy3'},
            {name: 'Tony3'},
            {name: 'Andrea3'}
        ];

        let objectsQueried = new Array<object>();

        connectObs(uri)
        .switchMap(client => {
            connectedClient = client;
            const db = client.db(dbName);
            return collectionObs(db, collectionName).map(collection => {return {collection, client}});
        })
        .switchMap(data => dropObs(data.collection).map(_d => data.client))
        .switchMap(client => {
            const db = client.db(dbName);
            return createCollectionObs(collectionName, db);
        })
        .switchMap(collection => insertManyObs(objectsToInsert, collection).map(obectIDs => {
            return {obectIDs, collection};
        }))
        .switchMap(data => findObs(data.collection))
        .subscribe(
            object => {
                console.log('obj', object);
                objectsQueried.push(object);
            },
            err => {
                console.error('err', err);
                done(err);
            },
            () => {
                if (objectsQueried.length !== objectsToInsert.length) {
                    const errMsg = 'Number of objects queried ' + objectsQueried.length + ' not equal to number of objects inserted ' + objectsToInsert.length;
                    console.error(errMsg);
                    done(errMsg);
                }
                done();
                connectedClient.close().then(
                    () => console.log('Connection closed'),
                    err => console.error('Error while closing the connection', err)
                );
            }
        )

    }).timeout(10000);

});
