var TowerMenu = enchant.Class.create(enchant.Group, {
    initialize: function(x, y) {
        Group.call(this);
        var group = this;

        this.x = x - sprite_side;
        this.y = y - sprite_side;

        var j = k = 0;
        for (var i = 0; i < tower_types.length; i++) {
            if (j == 3) {
                j = 0;
                k++;
            }

            var xx = j * sprite_side;
            var yy = k * sprite_side;

            var rectangle = new Rectangle(xx, yy, sprite_side);
            group.addChild(rectangle);

            var tower = new Sprite(sprite_side, sprite_side);
            tower.x = xx;
            tower.y = yy;
            tower.price = tower_types[i].upgrades[0].price;
            tower.kpe = tower_types[i];
            tower.image = game.assets['towers.png'];
            tower.frame = tower_types[i].frame;

            tower.addEventListener('touchend', function() {
                var future_tower = {
                    x: group.x + sprite_side,
                    y: group.y + sprite_side
                }
                if (player.gold >= this.price) {
                    player.gold -= this.price;
                    new Tower(future_tower.x, future_tower.y, this.kpe);
                    group.remove();
                }
                else {
                    var price = new Label();
                    game.rootScene.addChild(price);
                    price.x = future_tower.x;
                    price.y = future_tower.y;
                    price.color="yellow";
                    price.font="10px serif";
                    price.text = "-" + (this.price - player.gold);
                    price.width = 30
                    price.frame = 0;
                    price.addEventListener('enterframe', function(e) {
                      this.frame++;
                      if(this.frame>=2){
                        this.visible=false;
                        game.rootScene.removeChild(this);
                      }
                    });
                }
            });
            group.addChild(tower);

            j++;
        }

        game.rootScene.addChild(this);
    }
});

