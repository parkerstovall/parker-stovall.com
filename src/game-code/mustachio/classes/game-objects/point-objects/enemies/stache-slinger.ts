// import type { coords } from "../../../../types";
// import { Enemy } from "./enemy";

// export class Slinger extends Enemy {
//     private readonly getPos = true;
//     private readonly type = "slinger";
// 	private readonly width = 15;
// 	private readonly radius = 15;

// 	protected readonly pos: coords;
// 	private readonly target: coords;

//     constructor(selfCords: coords, mustachio: Mustachio) {
// 	this.getPos = true;
// 	this.type = "slinger"
// 	this.width = 15;
// 	this.radius = 15;
// 	this.selfCords = selfCords;
// 	this.target { x: player.x + playWid / 2, y: player.y + playHei / 2 };
// 	this.offsetX = (this.targetX - this.x) / 300;
// 	this.offsetY = (this.targetY - this.y) / 300;
//     }

// 	this.update = function() {
// 		ctx = myGameArea.context;
// 		ctx.beginPath();
// 		ctx.lineWidth = 5;
// 		ctx.strokeStyle = "yellow";
// 		ctx.fillStyle = "brown";
// 		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
// 		ctx.stroke();
// 		ctx.fill();
// 	}

// 	this.newPos = function() {
// 		this.x += this.offsetX;
// 		this.y += this.offsetY;
// 		if(this.x < 0 || this.x > myGameArea.canvas.width || this.y < 0 || this.y > myGameArea.canvas.height) {
// 			var i = stagePieces.indexOf(this)
// 			stagePieces.splice(i, 1);
// 		}
// 		if(RectCircleColliding(mustachio.x, mustachio.y, playWid, playHei, this.x, this.y, this.radius)) {
// 			killMethod();
// 		}
// 	}
// }
