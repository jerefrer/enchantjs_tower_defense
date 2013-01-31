enchant();

var sprite_side = 16;
var map = graph = player = user_menu = null;
var enemies = [];
var towers = [];
var tower_id = 0;
var tower_menu = null;
var tower_types = [
    {
        name: 'Arrow',
        frame: 0,
        upgrades: [
            {
                price: 100,
                damage: 10,
                range: 20
            },
            {
                price: 50,
                damage: 20,
                range: 30
            }
        ]
    },
    {
        name: 'Cannon',
        frame: 1,
        upgrades: [
            {
                price: 150,
                damage: 20,
                range: 15
            },
            {
                price: 75,
                damage: 40,
                range: 25
            }
        ]
    }
];
var levels = [
    [1, 0, 100],
    [1, 1, 200],
    [1, 2, 300]
]
var level = null;

var game = null;
window.onload = function() {
    game = new Game(320, 320);
    game.fps = 15;
    game.preload('assets/enemies.png', 'assets/map0.png', 'assets/towers.png');
}

// Include app files
document.write('<script type="text/javascript" src="utils.js"></script>');
document.write('<script type="text/javascript" src="player.js"></script>');
document.write('<script type="text/javascript" src="enemy.js"></script>');
document.write('<script type="text/javascript" src="tower.js"></script>');
document.write('<script type="text/javascript" src="tower_menu.js"></script>');
document.write('<script type="text/javascript" src="upgrade_menu.js"></script>');
document.write('<script type="text/javascript" src="game.js"></script>');
