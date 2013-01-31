function run_game() {

    game.onload = function() {
        var walls = [4];
        var grid = [
            [4, 4, 4, 4, 4, 4, 4],
            [5, 5, 5, 5, 5, 5, 4],
            [4, 4, 4, 4, 4, 5, 4],
            [4, 5, 5, 5, 5, 5, 4],
            [4, 5, 4, 4, 4, 4, 4],
            [4, 5, 5, 5, 5, 5, 4],
            [4, 4, 4, 4, 4, 5, 4]
        ]
        map = new Map(sprite_side, sprite_side);
        map.image = game.assets['assets/map0.png'];
        map.loadData(grid);
        var colMap = [
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1]
        ];
        map.collisionData = colMap;
        game.rootScene.addChild(map);

        // Initialize Collision map and A* Graph
        var weighted_grid = clone(grid);
        for(var x = 0; x < grid.length; x++) {
            for(var y = 0; y < grid[x].length; y++) {
                var node = grid[x][y];
                if (walls.indexOf(node) > -1) weighted_grid[x][y] = 0; // Mur
                else weighted_grid[x][y] = 1; // Libre
            }   
        }
        graph = new Graph(weighted_grid);

        player = new Player(10);
        game.rootScene.addEventListener('enterframe', function(){
            // Infos
            if (user_menu) user_menu.remove();
            user_menu = new Label();
            user_menu.x = sprite_side * 10;
            user_menu.y = 0;
            user_menu.color="black";
            user_menu.font="10px serif";
            user_menu.text = "Gold: " + (player.gold);
            user_menu.width = 60;
            user_menu.frame = 0;
            game.rootScene.addChild(user_menu);

            // Enemy spawn
            if (game.frame % 6 == 0) {
                if (!level) {
                    for (var i = 0; i < levels.length; i++) {
                        if (levels[i][0] > 0) {
                            level = levels[i];
                            break;
                        }
                    }
                }
                if (level) {
                    if (level[0] > 0) {
                        enemies.push(new Enemy(0, 1, level[1], level[2]));
                        level[0] -= 1;
                    } else level = null;
                }
            }
        });

        game.rootScene.addEventListener('touchend', function(e) {
            var x = Math.floor(e.localX / sprite_side);
            var y = Math.floor(e.localY / sprite_side);
            if (tower_menu) {
                if (e.localX < tower_menu.x || e.localX > tower_menu.childNodes[0].width + tower_menu.x ||
                    e.localY < tower_menu.y || e.localY > tower_menu.childNodes[0].height + tower_menu.y) {
                tower_menu.remove();
                tower_menu = null;
                }
            }
            if (colMap[y][x] == 1) { // Click on buildable cell
                if (tower = tower_exists(x, y)) {
                    tower_menu = new UpgradeMenu(tower);
                } else {
                    tower_menu = new TowerMenu(x * sprite_side, y * sprite_side);
                }
            }
        });

    };
    game.start();

}

window.onload = (function(pre){
  return function(){
    pre && pre.apply(this,arguments);
    run_game();
  }
})(window.onload);