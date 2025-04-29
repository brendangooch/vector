/**
 * 
 */

export class Vector {

    public static create(x: number = 0, y: number = 0): Vector {
        return new Vector(x, y);
    }

    public static unit(): Vector {
        return new Vector(1, 0);
    }

    public static fromVector(v: Vector): Vector {
        return new Vector(v.x, v.y);
    }

    public static fromAngle(radians: number): Vector {
        return Vector.unit().setHeading(radians);
    }

    public static random(): Vector {
        return Vector.fromAngle(Math.random() * Math.PI * 2);
    }

    public static add(vectors: Vector[]): Vector {
        return vectors.slice(1).reduce((accumulator: Vector, v: Vector) => {
            return accumulator.add(v);
        }, vectors[0].clone());
    }

    public static sub(vectors: Vector[]): Vector {
        return vectors.slice(1).reduce((accumulator: Vector, v: Vector) => {
            return accumulator.sub(v);
        }, vectors[0].clone());
    }

    public static average(v: Vector[]): Vector {
        return Vector.add(v).div(v.length);
    }

    public static equals(a: Vector, b: Vector): boolean {
        return a.x === b.x && a.y === b.y;
    }

    public static distance(v1: Vector, v2: Vector): number {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static dot(a: Vector, b: Vector): number {
        return a.x * b.x + a.y * b.y;
    }

    public static angleBetween(a: Vector, b: Vector): number {
        return Math.acos(a.dot(b) / a.magnitude / b.magnitude);
    }

    public static vectorProjection(a: Vector, b: Vector): Vector {
        const bCopy = b.clone().norm();
        return bCopy.mult(Vector.dot(a, bCopy));
    }

    private position: { x: number; y: number } = { x: 0, y: 0 };

    public constructor(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
        return this;
    }

    public get x(): number {
        return this.position.x;
    }

    public get y(): number {
        return this.position.y;
    }

    public get heading(): number {
        return Math.atan2(this.position.y, this.position.x);
    }

    public get magnitude(): number {
        return Math.sqrt(this.position.x * this.position.x + this.position.y * this.position.y);
    }

    public copy(v: Vector): Vector {
        this.position.x = v.x;
        this.position.y = v.y;
        return this;
    }

    public clone(): Vector {
        return Vector.create(this.x, this.y);
    }

    public setXY(x: number, y: number): Vector {
        this.position.x = x;
        this.position.y = y;
        return this;
    }

    public setX(x: number): Vector {
        this.position.x = x;
        return this;
    }

    public setY(y: number): Vector {
        this.position.y = y;
        return this;
    }

    public up(amount: number): Vector {
        this.position.y -= amount;
        return this;
    }

    public down(amount: number): Vector {
        this.position.y += amount;
        return this;
    }

    public left(amount: number): Vector {
        this.position.x -= amount;
        return this;
    }

    public right(amount: number): Vector {
        this.position.x += amount;
        return this;
    }

    public setHeading(radians: number): Vector {
        const magnitude = this.magnitude;
        this.setX(Math.cos(radians) * magnitude);
        this.setY(Math.sin(radians) * magnitude);
        return this;
    }

    public rotate(radians: number): Vector {
        this.setHeading(this.heading + radians);
        return this;
    }

    public reflect(): Vector {
        this.mult(-1);
        return this;
    }

    public setMagnitude(length: number): Vector {
        const heading = this.heading;
        this.setX(Math.cos(heading) * length);
        this.setY(Math.sin(heading) * length);
        return this;
    }

    public limit(magnitude: number): Vector {
        if (this.magnitude > magnitude) this.setMagnitude(magnitude);
        return this;
    }

    public norm(): Vector {
        this.div(this.magnitude);
        return this;
    }

    public add(v: Vector): Vector {
        this.position.x += v.x;
        this.position.y += v.y;
        return this;
    }

    public sub(v: Vector): Vector {
        this.position.x -= v.x;
        this.position.y -= v.y;
        return this;
    }

    public mult(value: number): Vector {
        this.position.x *= value;
        this.position.y *= value;
        return this;
    }

    public div(value: number): Vector {
        this.position.x /= value;
        this.position.y /= value;
        return this;
    }

    public equals(v: Vector): boolean {
        return this.x === v.x && this.y === v.y;
    }

    public distance(v: Vector): number {
        const dx = v.x - this.x;
        const dy = v.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public dot(v: Vector): number {
        return this.position.x * v.x + this.position.y * v.y;
    }

    public angleBetween(v: Vector): number {
        return Math.acos(this.dot(v) / this.magnitude / v.magnitude);
    }

    public project(v: Vector): Vector {
        const bCopy = v.clone().norm();
        return bCopy.mult(this.dot(bCopy));
    }

}