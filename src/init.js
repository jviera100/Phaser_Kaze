const config = {
    title: "",
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        type: Phaser.AUTO,
        parent: "contenedor",
        width: 800,
        height: 600,
    },
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default:'arcade',
        arcade: {
            gravity:{y: 300},
            debug: false
        }
    },
}

var game = new Phaser.Game(config);
//-----------------------------------------------

function preload (){
    this.load.setPath('../Assets');
    this.load.image([
        'coin',
        'esfera',
        'fondo',
        'plataforma',
    ]);
    this.load.spritesheet('kaze', 'kaze.png',{frameWidth: 32.5, frameHeigth: 48});
    
};
function create (){    
    this.add.image(400, 300, 'fondo').setScale(1, 1.15);
    plataforma = this.physics.add.staticGroup();
    Plataforma.create(400, 590, 'Plataforma').setScale(2.1, 1).refreshBody();
    Plataforma.create(400, 0, 'Plataforma').setScale(2.1, 1).refreshBody();
    Plataforma.create(700, 410, 'Plataforma').setScale(0.3, 1).refreshBody();
    Plataforma.create(400, 300, 'Plataforma').setScale(0.2, 1).refreshBody();
    Plataforma.create(800, 150, 'Plataforma');
    Plataforma.create(-50, 300, 'Plataforma');
    Plataforma.create(0, 450, 'Plataforma');
    kaze = this.physics.add.sprite(230, 100, 'kaze');
    kaze.setCollideWorldBounds(true);
    kaze.setBounce(0.2);
    plataforma.getChildren()[0].setOffset(0,10);
    this.anims.create({
        key: 'Izquierda',
        frames: this.anims.generateFrameNumbers('Kaze', {start:0, end:3}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'Derecha',
        frames: this.anims.generateFrameNumbers('Kaze', {start:5, end:8}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Quieto',
        frames: [ { key: 'Kaze', frame: 4 } ],
        frameRate: 20
    });
    coins = this.physics.add.group({
        key: 'Coin',
        repeat: 11,
        setXY: { x: 12, y: 50, stepX: 140 }
    });
    function esconder(Kaze, Coin){
        this.sound.play('sonido');
        Coin.disableBody(true, true);    
        Puntos+= 10;
        PuntosTexto.setText('Puntos:'+ Puntos);

        if (coins.countActive(true) === 0){
            
        coins.children.iterate(function (child) {    
            child.enableBody(true, child.x, 0, true, true)    
        });
    
        var x = (Kaze.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        Esferas = enemigos.create(x, 16, 'Esfera');
        Esferas.setBounce(1);
        Esferas.setCollideWorldBounds(true);
        Esferas.setVelocity(Phaser.Math.Between(-100, 100), 5);    
        }    
    }
    
    
    enemigos = this.physics.add.group();
    
        
        
        
        

    }
    
    this.physics.add.collider(kaze, enemigos, choque, null, this);
    function choque (kaze, Esferas)
    {
        this.physics.pause();
        kaze.anims.play('Quieto');
        gameOver = true;
    };
    var gameOver = false
    if(gameOver){
        return;
    }
};
function update(time, delta){
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
        {
            Kaze.setVelocityX(-200);
            Kaze.anims.play('Izquierda', true);
        }
        else if (cursors.right.isDown)
        {
            Kaze.setVelocityX(200);
            Kaze.anims.play('Derecha', true);
        }
        else
        {
            Kaze.setVelocityX(0);
            Kaze.anims.play('Quieto');
        }
    
        if (cursors.up.isDown && Kaze.body.touching.down)
        {
            Kaze.setVelocityY(-310);
        }
        coins.children.iterate(function(rebote){
            child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        })
        this.physics.add.collider(Plataforma, coins);
        this.physics.add.overlap(kaze, coins, esconder, null, this);
        PuntosTexto = this.add.text(300, 560, 'Puntos: 0', {fontSize: '40px' Fill: 'red'});
}; 
var Puntos = 0;
var PuntosTexto;

//----------------------


