import { expect } from 'chai';
import 'mocha';

import {createTower, moveTower, Disk} from './move-tower';

describe('createTower function', () => {
    
    it('creates a tower of hanoi', () => {
        const towerSize = 7;
        const tower = createTower(towerSize);
        expect(tower.length).to.equal(towerSize);
    });

});

describe('moveTower function', () => {
    
    it('moves a tower with an EVEN number of disks from source to dest', () => {
        const towerSize = 4;
        const source = createTower(towerSize);
        const dest = new Array<Disk>();
        const spare = new Array<Disk>();
        const iterations = moveTower(source, dest, spare);
        expect(source.length).to.equal(0);
        expect(dest.length).to.equal(towerSize);
        expect(spare.length).to.equal(0);
        expect (iterations).to.equal(Math.pow(2, towerSize) - 1);
    });
    it('moves a tower with an ODD number of disks from source to dest', () => {
        const towerSize = 5;
        const source = createTower(towerSize);
        const dest = new Array<Disk>();
        const spare = new Array<Disk>();
        const iterations = moveTower(source, dest, spare);
        expect(source.length).to.equal(0);
        expect(dest.length).to.equal(towerSize);
        expect(spare.length).to.equal(0);
        expect (iterations).to.equal(Math.pow(2, towerSize) - 1);
    });

});


describe('moveTower function defining the starting disk', () => {
    
    it('moves an EVEN number of disks from source to dest starting from a disk', () => {
        const towerSize = 10;
        const source = createTower(towerSize);
        const indexOfDiskToStartFrom = 4;
        const numberOfDisksToMove = towerSize - indexOfDiskToStartFrom;
        const dest = new Array<Disk>();
        const spare = new Array<Disk>();
        const bottomDisk = source[indexOfDiskToStartFrom];
        const iterations = moveTower(source, dest, spare, bottomDisk);
        expect(source.length).to.equal(indexOfDiskToStartFrom);
        expect(dest.length).to.equal(numberOfDisksToMove);
        expect(spare.length).to.equal(0);
        expect (iterations).to.equal(Math.pow(2, numberOfDisksToMove) - 1);
    });
    it('moves an ODD number of disks from source to dest starting from a disk', () => {
        const towerSize = 10;
        const source = createTower(towerSize);
        const indexOfDiskToStartFrom = 3;
        const numberOfDisksToMove = towerSize - indexOfDiskToStartFrom;
        const dest = new Array<Disk>();
        const spare = new Array<Disk>();
        const bottomDisk = source[indexOfDiskToStartFrom];
        const iterations = moveTower(source, dest, spare, bottomDisk);
        expect(source.length).to.equal(indexOfDiskToStartFrom);
        expect(dest.length).to.equal(numberOfDisksToMove);
        expect(spare.length).to.equal(0);
        expect (iterations).to.equal(Math.pow(2, numberOfDisksToMove) - 1);
    });

});
