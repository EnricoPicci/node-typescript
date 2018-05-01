
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { MongoClient } from 'mongodb';

import {config} from './config';

import { connectObs } from './mongo-obs';
import { collectionObs } from './mongo-obs';
import { createCollectionObs } from './mongo-obs';
import { insertManyObs } from './mongo-obs';
import { findObs } from './mongo-obs';
import { dropObs } from './mongo-obs';

// asdewq123!
const uri = config.mongoUri;
const dbName = 'mydb';
const collectionName = 'testColl';
let connectedClient: MongoClient;

const objectsToInsert = [
    {name: 'Lucy3'},
    {name: 'Tony3'},
    {name: 'Andrea3'}
];

connectObs(uri)
.switchMap(client => {
    const db = client.db(dbName);
    return collectionObs(db, collectionName).map(collection => {return {collection, client}});
})
.switchMap(data => {
    console.log('data', data);
    // data.collection.
    return dropObs(data.collection).map(_d => data.client);
})
.switchMap(data => {
    const client = data;
    console.log('client class', client.constructor.name);
    connectedClient = client;
    const db = client.db(dbName);
    return createCollectionObs(collectionName, db);
})
.switchMap(collection => insertManyObs(objectsToInsert, collection).map(obectIDs => {
    return {obectIDs, collection};
}))
.switchMap(data => findObs(data.collection))
// .map(insertedIDs => insertedIDs.map(insertedID => insertedID.toString()))
.subscribe(
    objects => {
        console.log('objects class', objects.constructor.name);
        console.log('objects', objects);
    },
    err => {
        console.error('err', err);
    },
    () => {
        console.log('DONE');
        connectedClient.close()
        .then(
            () => console.log('Connection closed'),
            err => console.error('Error while closing the connection', err)
        )
    }
)


