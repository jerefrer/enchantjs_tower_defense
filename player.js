var Player = enchant.Class.create({
    initialize: function(lives) {
        this.lives = lives;
        this.gold = 800;
    },
    lose_life: function() {
        this.lives -= 1;
        // if (this.lives == 0) alert('dead !');
    }
 });

var Level = enchant.Class.create({
    initialize: function(monsters_count) {
        this.monsters_count = monsters_count;
    }
})
