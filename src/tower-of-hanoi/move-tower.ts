// implements the recursive solution of the Tower of Hanoi
// https://www.cs.cmu.edu/~cburch/survey/recurse/hanoiimpl.html

export interface Disk {
    name: string,
    size: number
}

export function moveTower(disk: Disk, source: Array<Disk>, dest: Array<Disk>, spare: Array<Disk>, iterations?: number) {
    let iter = iterations ? iterations : 0;

    if (disk.size == 0) {
        moveDiskFromSourceToDest(disk, source, dest);
        iter++;
    } else {
        const indexOfDisk = source.indexOf(disk);
        const diskAbove = source[indexOfDisk - 1];
        iter = moveTower(diskAbove, source, spare, dest, iter);
        moveDiskFromSourceToDest(disk, source, dest);
        iter++;
        iter = moveTower(diskAbove, spare, dest, source, iter);
    }
    return iter;
}

export function createTower(size: number) {
    const tower = new Array<Disk>();
    for (let i = 0; i < size; i++) {
        const disk: Disk = {name: 'disk' + i, size: i};
        tower.push(disk);
    }
    return tower;
}

function moveDiskFromSourceToDest(disk: Disk, source: Array<Disk>, dest: Array<Disk>) {
    source.splice(source.indexOf(disk), 1)[0];
    dest.splice(0, 0, disk);
}
