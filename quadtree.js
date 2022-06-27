class Point {
    constructor(x, y, data) {
        this.x = x;
        this.y = y;
        this.data = data;
    }
}

class Boundary {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (this.x - this.w <= point.x && point.x <= this.x + this.w) &&
               (this.y - this.h <= point.y && point.y <= this.y + this.h);
    }

    intersect(boundary) {
        return !(
            this.x - this.w > boundary.x + boundary.w ||
            this.y - this.h > boundary.y + boundary.h ||
            this.x + this.w < boundary.x - boundary.w ||
            this.y + this.h < boundary.y - boundary.h
            );
    }

    subdivide() {
        return [
            new Boundary(this.x + this.w/2, this.y + this.h/2, this.w/2, this.h/2),
            new Boundary(this.x - this.w/2, this.y + this.h/2, this.w/2, this.h/2),
            new Boundary(this.x - this.w/2, this.y - this.h/2, this.w/2, this.h/2),
            new Boundary(this.x + this.w/2, this.y - this.h/2, this.w/2, this.h/2)
        ];
    }
}

class Quadtree {
    constructor(boundary, capacity=4) {
        this.boundary = boundary;
        this.capacity = capacity;

        this.points = []
        this.subdivided = false;
        this.sub_trees = [];
    }

    push(point) {
        if (!this.boundary.contains(point)) return false;
        
        if (this.points.length >= this.capacity) {

            if (!this.subdivided) this.subdivide();

            for (const sub_tree of this.sub_trees) {
                if (sub_tree.push(point)) return true;
            }
            return true
        }
        else {
            this.points.push(point);
            return true
        }
    }

    querry(boundary) {
        if (!this.boundary.intersect(boundary)) return [];

        let result = this.points.filter((point) => {return boundary.contains(point)});

        if (this.subdivided) {
            for (const sub_tree of this.sub_trees) {
                result = result.concat(sub_tree.querry(boundary));
            }
        }

        return result;
    }

    subdivide() {
        this.subdivided = true;

        for (const sub_boundary of this.boundary.subdivide()) {
            this.sub_trees.push(new Quadtree(sub_boundary, this.cap));
        }

    }
}