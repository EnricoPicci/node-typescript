// implements the recursive solution of the Tower of Hanoi
// https://www.cs.cmu.edu/~cburch/survey/recurse/hanoiimpl.html

export interface Disk {
    name: string,
    size: number
}

export function moveTower(source: Array<Disk>, dest: Array<Disk>, spare: Array<Disk>, startingFromDisk?: Disk, iterations?: number) {
    let disk = startingFromDisk ? startingFromDisk : source[0];
    let iter = iterations ? iterations : 0;

    if (disk.size == 0) {
        moveDiskFromSourceToDest(source, dest);
        iter++;
    } else {
        const indexOfDisk = source.indexOf(disk);
        const diskAbove = source[indexOfDisk + 1];
        iter = moveTower(source, spare, dest, diskAbove, iter);
        moveDiskFromSourceToDest(source, dest);
        iter++;
        iter = moveTower(spare, dest, source, diskAbove, iter);
    }
    return iter;
}

export function createTower(size: number) {
    const tower = new Array<Disk>();
    for (let i = size - 1; i > -1; i--) {
        const disk: Disk = {name: 'disk' + i, size: i};
        tower.push(disk);
    }
    return tower;
}

function moveDiskFromSourceToDest(source: Array<Disk>, dest: Array<Disk>) {
    const disk = source.pop();
    dest.push(disk);
}
