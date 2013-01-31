var Rectangle = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, width) {
        enchant.Sprite.call(this, sprite_side, sprite_side);
        var surface = new Surface(sprite_side, sprite_side);
        var c = surface.context;
        c.fillStyle = "rgb(255, 0, 0)";
        c.beginPath();
        c.fillRect(0, 0, width, width);
        c.fill();
        this.image = surface;
        this.opacity = 0.4;
        this.x = x;
        this.y = y;
    }
});

var RangeCircle = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, width, radius) {
        enchant.Sprite.call(this, radius*2, radius*2);
        var surface = new Surface(radius*2, radius*2);
        var c = surface.context;
        c.fillStyle = "rgb(255, 0, 0)";
        c.beginPath();
        c.arc(radius, radius, radius, 0, Math.PI*2, true);
        c.fill();
        this.image = surface;
        this.opacity = 0.4;
        this.x = x + width / 2 - radius;
        this.y = y + width / 2 - radius;
    }
});


function tower_exists(x, y) {
    var tower = null;
    for (var i = 0; i < towers.length; i++) {
        if (towers[i] && towers[i].x / 16 == x && towers[i].y / 16 == y) {
            tower = towers[i];
            break;
        }
    }
    return tower;
}

function replace_tower(tower, new_tower) {
    for (var i = 0; i < towers.length; i++) {
        if (towers[i] && towers[i].id == tower.id) {
            towers[i] = new_tower;
            break;
        }
    }
    tower.remove();
    return true;
}

function remove_tower(tower) {
    for (var i = 0; i < towers.length; i++) {
        if (towers[i] && towers[i].id == tower.id) {
            towers[i] = null;
            break;
        }
    }
    tower.remove();
    return true;
}

/*
 * Fonction de clonage
 * @author Keith Devens
 * @see http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
 */
function clone(srcInstance)
{
    /*Si l'instance source n'est pas un objet ou qu'elle ne vaut rien c'est une feuille donc on la retourne*/
    if(typeof(srcInstance) != 'object' || srcInstance == null)
    {
        return srcInstance;
    }
    /*On appel le constructeur de l'instance source pour crée une nouvelle instance de la même classe*/
    var newInstance = srcInstance.constructor();
    /*On parcourt les propriétés de l'objet et on les recopies dans la nouvelle instance*/
    for(var i in srcInstance)
    {
        newInstance[i] = clone(srcInstance[i]);
    }
    /*On retourne la nouvelle instance*/
    return newInstance;
}