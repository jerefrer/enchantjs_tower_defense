var UpgradeMenu = enchant.Class.create(enchant.Group, {
    initialize: function(tower) {
        Group.call(this);
        var group = this;

        this.x = tower.x - sprite_side;
        this.y = tower.y;

        var range_circle = new RangeCircle(tower.x, tower.y, tower.width, tower.range);
        this.addChild(range_circle);

        sell = new Sprite(sprite_side, sprite_side);
        sell.image = game.assets['assets/enemies.png'];
        sell.frame = 14;
        sell.addEventListener('touchend', function() {
            tower.sell();
            group.remove();
        });
        this.addChild(sell);

        // Upgrade button
        if (!tower.max_level()) {
            var rectangle = new Rectangle(sprite_side * 2, 0, sprite_side);
            this.addChild(rectangle);

            upgrade_button = new Sprite(sprite_side, sprite_side);
            upgrade_button.x = sprite_side * 2;
            upgrade_button.image = game.assets['assets/enemies.png'];
            upgrade_button.frame = 43;
            upgrade_button.addEventListener('touchend', function() {
                var upgrade = tower.type.upgrades[tower.upgrade];
                if (player.gold >= upgrade.price) {
                    tower.upgrade_tower();
                    group.remove();
                } else {
                    // TODO
                }
            });
            this.addChild(upgrade_button);
        }
        game.rootScene.addChild(this);
    }
});