let qtree;

function draw_quadtree(qtree){
    let x = qtree.boundary.x - qtree.boundary.w;
    let y = qtree.boundary.y - qtree.boundary.h;
    let w = qtree.boundary.w * 2;
    let h = qtree.boundary.h * 2;
    noFill();
    rect(x, y, w, h);

    for (const point of qtree.points) {
        circle(point.x, point.y, 2);
    }

    if (qtree.subdivided) {
        for (const sub_tree of qtree.sub_trees) {
            draw_quadtree(sub_tree);
        }
    }
}

function setup() {
    let width = 400;
    let height = 400;
    
    createCanvas(width, height);
    let boundary = new Boundary(width/2, height/2, width/2, height/2);
    qtree = new Quadtree(boundary);
}

function draw() {
    background(220);
    stroke(0);
    draw_quadtree(qtree);

    let x = mouseX;
    let y = mouseY;
    let querry = new Boundary(x, y, 25, 25);
    let result = qtree.querry(querry);

    stroke(0, 255, 0);
    rect(x - 25, y - 25, 50, 50);
    for (const point of result) {
        circle(point.x, point.y, 2);
    }
}

function mouseClicked() {
    let x = mouseX;
    let y = mouseY;
    qtree.push(new Point(x, y, null));
  }