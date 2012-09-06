/* Projectiles - Here, we define a projectile class which is used to govern how the projectiles are
used in weapons and interact with their environment. Each projectile defines a mass, damage raduius,
damage amount and most importantly, a trajectory equation*/

//Projectile object
function Projectile(x,y, dx, dy, update) {
	if(x != null && y != null){ this.coords = {x:x, y:y}; } 
	if(dx != null && dy != null){ this.vector = {dx:dx, dy:dy}; }
	if(update != null && typeof path == "function") //For custom defined paths
		this.update = update;
}
	Projectile.prototype.coords    		= {x:0, y:0};
	Projectile.prototype.vector    		= {dx:0, dy:0};
	Projectile.prototype.exploded       = false; //If the projectile has hit. 
	Projectile.prototype.damageRaduis   = 2; //Columns left and right that get effected.
	Projectile.prototype.height         = 10;
	Projectile.prototype.width          = 10;
	Projectile.prototype.damage         = 50; // Damage at center of radius
	Projectile.prototype.explode        = function() {};
	Projectile.prototype.drawArray      = []; // 2D array of integers that contain colors of pixels to draw
	Projectile.prototype.update         = function(){
		var x = this.coords.x, y= this.coords.y, dx = this.vector.dx, dy = this.vector.dy, map = window.map;
		if(window.map.getColumnHeight(x) >= y){ //Explode!
			this.explode()
			this.exploded = true;
		}
		else{
			this.coords = {x:x + dx, y:y+dx};
			this.vector = {dx:dx-1, dy: dy};
		}

	}
	Projectile.prototype.draw           = function(ctx) {
		//TODO: not a rectangle. Maybe
		var x = this.x, y = this.y, width = this.width, height = this.height;
		ctx.fillStyle = "#0000FF";
		ctx.fillRect(x,y,x-width, y-height);
	};


//Weapon object
function Weapon() {}
	Weapon.prototype.name = "Bow";
	Weapon.prototype.currentMode = "primary"; // Primary or secondary mode
	Weapon.prototype.range = 100; 
	Weapon.prototype.ammunition = 20;
	Weapon.prototype.accuracy = 20;
	Weapon.prototype.primaryProjectile = Projectile();
	Weapon.prototype.secondaryProjectile = Projectile();

	Weapon.prototype.fire = function(angle, power) {
		if (this.ammunition > 0) {
			//Render a projectile (give it coordinates and direction)
			return true;
		}
		else
			return false
	}

	Weapon.prototype.switchMode = function() {
		if (this.currentMode == "primary" && this.secondaryProjectile != null) {
			this.currentMode = "secondary";
		}
		else {
			this.currentMode = "primary"
		}
	}

	Weapon.prototype.drawArray = [] // 2D array of integers that contain colors of pixels to draw
	Weapon.prototype.draw = function(ctx) { 

	}


// Player object
function Player(x,y) {
	if(x != null && y != null){
		this.x = x; this.y = y;
	}
}
	Player.prototype.health = 100;
	Player.prototype.x = 0;
	Player.prototype.y = 0;
	Player.prototype.name = "Wilson";
	Player.prototype.inverntory = [];
	Player.prototype.weapons = []; // 0:Primary 2:Secondary 3:Grenades 4:Special
	Player.prototype.currentWeapon = Player.prototype.weapons[0];
	Player.prototype.aimAngle = 0;
	Player.prototype.score = 0; // Based on how many kills you have / how much havok you wreak

	// Some parameters we may want to use later
	Player.prototype.luck = 10;
	Player.prototype.accuracy = 10;
	Player.prototype.resillience = 10;

	// Some other cool things we may consider adding? Since it is an anarchy, you can barter, cut deals,
	// steal things from other people
	Player.prototype.inventory = [];
	Player.prototype.money = 0;
	Player.prototype.kills = 0; // A parameter that records how many kills you have
	Player.prototype.charm = 10

	// Some drawing parameters
	Player.prototype.facingRight = true
	Player.prototype.size = 3;

	// Moves the player by a vector left or right
	Player.prototype.move = function(vector) {
		// Check if the move is legal, then...
		this.x += vector[0]; //TODO make this an object. Arrays don't make sense.
		this.y += vector[1]; //Perhaps vector = {x:int, y:int}
	}; 

	Player.prototype.shootWeapon = function (angle, power) {
		this.currentWeapon.fire(angle, power);
	};

	Player.prototype.pickUpObject = function (objectName) {}; // Adds nearby object to inventory
	Player.prototype.dropObject = function (objectName) {}; // Adds nearby object to inventory
	Player.prototype.switchWeapon = function (objectName) {}; // Cycles through the players weapons

	Player.prototype.drawArray = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,5,5,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,5,5,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,5,5,2,2,5,2,2,2,2,5,2,2,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,5,5,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,1,2,2,2,2,2,5,5,2,2,2,2,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1],
		   [1,1,2,2,4,4,4,4,4,4,4,4,4,4,4,2,1,1,1,1,1,1,1,1,1],
		   [1,2,2,2,4,4,4,4,4,4,4,4,4,4,4,2,2,1,1,1,1,1,1,1,1],
		   [2,2,2,3,3,3,3,3,3,3,4,3,3,3,3,2,2,1,1,1,1,1,1,1,1],
		   [2,2,2,3,3,3,3,3,4,3,4,3,3,3,3,3,2,1,1,1,1,1,1,1,1],
		   [2,2,2,3,3,3,3,3,3,3,4,3,3,3,3,3,2,1,1,1,1,1,1,1,1],
		   [2,2,2,3,3,3,3,3,4,3,4,3,3,3,3,3,2,1,1,1,1,1,1,1,1],
		   [1,2,1,3,3,3,3,3,3,3,4,3,3,3,3,3,1,1,1,1,1,1,1,1,1],
		   [1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1],
		   [1,1,1,5,5,5,5,5,1,1,1,5,5,5,5,5,1,1,1,1,1,1,1,1,1],
		   [1,1,1,1,5,5,5,1,1,1,1,1,5,5,5,1,1,1,1,1,1,1,1,1,1],
		   [1,1,1,1,1,5,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1]];
	Player.prototype.colors = {1: "", 2: "#dedcdb", 3:"#f1f1f1", 4:"#988e86", 5:"#493728", 6:"000000", 7:"ffffff"}
	Player.prototype.update = function(){
		//If the player's y is on that map chunk's map coordinate + 1, do nothing.
		//else if it's above, move it down. 
			//If it would pass through the height, move it to the ground.
		//else move it to the ground (it shouldn't hit this case.)
		var left = this.x + (this.size * 5)
		var right = left + (this.size * this.drawArray.length)

		var leftHeight = window.map.height - window.map.getColumnHeight(left) - (this.size * this.drawArray.length);
		var rightHeight = window.map.height - window.map.getColumnHeight(right) - (this.size * this.drawArray.length);

		if (this.y < leftHeight || this.y < rightHeight) {
			this.y = leftHeight;
		}

		else if (this.y > leftHeight && this.y > rightHeight){
			this.y = leftHeight;
		}
	}

	Player.prototype.draw = function(ctx) {
		var length = this.drawArray.length;
		for (var i = 0; i < length; i++){
			for (var j = 0; j < length; j++){
				var pixel = this.drawArray[i][j]
				if (pixel == 1){
					continue
				}
				else {
					var size = this.size
					var xpos = j * size + this.x;
					var ypos = i * size + this.y;
					ctx.fillStyle = this.colors[pixel];
					ctx.fillRect(xpos, ypos, size, size)
				}
			}
		}
	}



