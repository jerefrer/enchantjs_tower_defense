var Enemy = enchant.Class.create(enchant.Group, {
    initialize: function(x, y, frame, health) {
        Group.call(this);

        this.max_health = this.health = health;

        var sprite = new Sprite(sprite_side, sprite_side);            
        sprite.x = x;
        sprite.y = y;
        sprite.image = game.assets['assets/enemies.png'];
        sprite.frame = frame;
        this.addChild(sprite);

        var redbar = new Sprite(sprite_side, 2);
        var surface = new Surface(sprite_side, 2);
        var c = surface.context;
        c.fillStyle = "rgb(255, 0, 0)";
        c.beginPath();
        c.fillRect(0, 0, sprite_side, 2);
        c.fill();
        redbar.image = surface;
        redbar.x = x;
        redbar.y = y;
        this.addChild(redbar);

        var greenbar = new Sprite(sprite_side, 2);
        var surface = new Surface(sprite_side, 2);
        var c = surface.context;
        c.fillStyle = "rgb(124, 252, 0)";
        c.beginPath();
        c.fillRect(0, 0, sprite_side, 2);
        c.fill();
        greenbar.image = surface;
        greenbar.x = x;
        greenbar.y = y;
        this.addChild(greenbar);

        game.rootScene.addChild(this);

        this.isMoving = false;
        this.direction = 0;
        this.walk = 1;

        this.addEventListener('enterframe', function() {
            // Find next move with A*
            var graph_x = this.y / sprite_side,
                graph_y = this.x / sprite_side,
                start = graph.nodes[graph_x][graph_y],
                end = graph.nodes[6][5],
                shortest_path = astar.search(graph.nodes, start, end),
                next_move = shortest_path[0];

            if (next_move) {
                move_x = next_move.x - graph_x,
                move_y = next_move.y - graph_y;
                this.moveBy(move_y * sprite_side, move_x * sprite_side);
            } else {
                this.remove();
                player.lose_life();
            }
        });
    },
    take_hit: function(damage) {
        this.health -= damage;

        var bar_width = (this.health / this.max_health) * sprite_side;
        this.lastChild.width = bar_width;

        if (this.health <= 0) this.remove();
    }
});