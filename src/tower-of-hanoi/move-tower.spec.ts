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
    
    it('moves an EVEN number of disks from source to dest', () => {
        const towerSize = 4;
        const source = createTower(towerSize);
        const dest = new Array<Disk>();
        const spare = new Array<Disk>();
        const bottomDisk = source[source.length - 1];
        const iterations = moveTower(bottomDisk, source, dest, spare);
        expect(source.length).to.equal(0);
        expect(dest.length).to.equal(towerSize);
        expect(spare.length).to.equal(0);
        expect (iterations).to.equal(Math.pow(2, towerSize) - 1);
    });
    it('moves an ODD number of disks from source to dest', () => {
        const towerSize = 5;
        const source = createTower(towerSize);
        const dest = new Array<Disk>();
        const spare = new Array<Disk>();
        const bottomDisk = source[source.length - 1];
        const iterations = moveTower(bottomDisk, source, dest, spare);
        expect(source.length).to.equal(0);
        expect(dest.length).to.equal(towerSize);
        expect(spare.length).to.equal(0);
        expect (iterations).to.equal(Math.pow(2, towerSize) - 1);
    });

});
