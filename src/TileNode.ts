class TileNode {
		  x: number;
		  y: number;
		  f: number;
		  g: number;
		  h: number;
		  walkable: Boolean = true;
		  parent: TileNode;
          
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

}