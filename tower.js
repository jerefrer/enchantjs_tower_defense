var Tower = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, type, upgrade) {
        if (!upgrade) upgrade = 0;
        enchant.Sprite.call(this, sprite_side, sprite_side);
        this.id = tower_id;
        this.x = x;
        this.y = y;
        this.type = type;
        this.upgrade = upgrade;
        this.image = game.assets['assets/towers.png'];
        this.frame = type.frame;
        game.rootScene.addChild(this);
        this.addEventListener('enterframe', function() {
            for(var i = 0; i < enemies.length; i++) {
                if (enemies[i].childNodes[0].within(this, this.range)) {
                    enemies[i].take_hit(this.type.upgrades[this.upgrade].damage);
                }
            }
        });
        if (!upgrade) towers.push(this);
    },
    price: function() {
        return this.type.upgrades[this.upgrade].price;
    },
    max_level: function() {
        return !this.type.upgrades[this.upgrade + 1];
    },
    upgrade_tower: function() {
        var new_tower = new Tower(this.x, this.y, this.type, this.upgrade + 1);
        replace_tower(this, new_tower);
        player.gold -= new_tower.price();
    },
    sell: function() {
        remove_tower(tower);
        var total_price = 0;
        for (var i = 0; i <= this.upgrade; i++) {
            total_price += this.type.upgrades[i].price;
        }
        player.gold += total_price;
    }
});