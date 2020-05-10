var container;
var camera, scene, renderer;
var spotlight;
var sphere;
var clock = new THREE.Clock();


var cam = 0;
var keyboard;
var posX;
var texture;
var planets = [];
var kosmos = [];
var press=[];

init();
animate();

function init()
{
  

    keyboard = new THREEx.KeyboardState();

    // Получение ссылки на элемент html страницы
    container = document.getElementById( 'container' );
    // Создание "сцены"
    scene = new THREE.Scene();
    // Установка параметров камеры
    // 45 - угол обзора
    // window.innerWidth / window.innerHeight - соотношение сторон
    // 1 - 4000 - ближняя и дальняя плоскости отсечения
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000 );
    
    
    // Установка позиции камеры
    camera.position.set(1200, 800, 1200);
    // Установка точки, на которую камера будет смотреть
    camera.lookAt(new THREE.Vector3( 0.0, 0.0, 0.0));
    
    
    // Создание отрисовщика
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.setClearColor( 0x000000ff, 1);

    container.appendChild( renderer.domElement );
    // Добавление функции обработки события изменения размеров окна
    window.addEventListener( 'resize', onWindowResize, false );


    var light = new THREE.AmbientLight( 0x202020 ); // soft white light
    scene.add( light );    



    addkos(2000, 0, 0, "img/kosmos.jpg");
    addkos(200, 0, 0, "img/Sun.jpg");

    addsphere(5, 250, 1.8/2.0, "img/Mercury.jpg", "img/mercurybump.jpg");
    addsphere(15, 300, 1.5/2.0, "img/Venus.jpg", "img/venusbump.jpg");
    addsphere(17, 380, 1.3/2.0, "img/Earth.jpg", "img/earthbump.jpg");

    addsphere(3, 0, 1/2.0, "img/moon.jpg", "img/moonbump.jpg")

    addsphere(12.5, 450, 1.2/2.0, "img/Mars.jpg", "img/marsbump.jpg");
    addsphere(40, 550, 1.1/2.0, "img/Jupiter.jpg",);
    addsphere(35, 700, 1/2.0, "img/Saturn.jpg",);
    addsphere(30, 800, 0.8/2.0, "img/Uranus.jpg",);
    addsphere(25, 900, 0.5/2.0, "img/Neptune.jpg",);
   
    for (var i = 0; i < planets.length; i++){ 
        if(i!=3){
            addTr(planets[i]);}
        }
    
    spotlight = new THREE.PointLight(0xffffff);
    spotlight.position.set(0, 0, 0); 
    //добавление источника в сцену 
    scene.add(spotlight);


}

function onWindowResize()
{
    // Изменение соотношения сторон для виртуальной камеры
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // Изменение соотношения сторон рендера
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate()
{
    
    // Добавление функции на вызов, при перерисовки браузером страницы
    requestAnimationFrame( animate );
    render();
    var delta = clock.getDelta();

    if (keyboard.pressed("0")) 
    {
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        console.log("0");
    }
    // Установка позиции камеры
    camera.position.set(1200, 800, 1200);
    // Установка точки, на которую камера будет смотреть
    camera.lookAt(new THREE.Vector3( 0.0, 0.0, 0.0));
    if (keyboard.pressed("left")) 
    { 
        cam+=0.025;

        console.log("cam: "+cam);
    }    
    if (keyboard.pressed("right")) 
    { 
        cam-=0.025;
        console.log("cam: "+cam);
    }
    if (keyboard.pressed("1")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[0] = true;
        console.log("1");
    }
    if (keyboard.pressed("2")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[1] = true;
        console.log("2");
    }
    if (keyboard.pressed("3")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[2] = true;
        console.log("3");
    }
    if (keyboard.pressed("4")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[3] = true;
        console.log("4");
    }
    if (keyboard.pressed("5")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[4] = true;
        console.log("5");
    }
    if (keyboard.pressed("6")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[5] = true;
        console.log("6");
    }
    if (keyboard.pressed("7")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[6] = true;
        console.log("7");
    }
    if (keyboard.pressed("8")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[7] = true;
        console.log("8");
    }
    if (keyboard.pressed("9")) 
    { 
        for (var i = 0; i < press.length; i++)
        {
            press[i]=false;
        };
        press[8] = true;
        console.log("9");
    }


    for(i=0; i<planets.length; i++)
    {
        //создание набора матриц
        var m = new THREE.Matrix4();
        

        var m1 = new THREE.Matrix4();
        var m2 = new THREE.Matrix4();
        
        planets[i].a += planets[i].v * delta;

        //создание матрицы поворота (вокруг оси Y) в m1 и матрицы перемещения в m2
        
        if(i!=3)
        {
          m1.makeRotationY( planets[i].a );
          m2.setPosition(new THREE.Vector3(planets[i].x, 0, 0));
          m.multiplyMatrices( m1, m2 );
          m.multiplyMatrices( m, m1);  
          planets[i].model.matrix = m;
          planets[i].model.matrixAutoUpdate = false;
     }
        else
        {   var mm = new THREE.Matrix4();
            var mm1 = new THREE.Matrix4();
            var mm2 = new THREE.Matrix4();
            
            mm1.makeRotationY( planets[i].a *10);
            mm2.setPosition(new THREE.Vector3(35, 0, 0));

            mm.multiplyMatrices( mm1, mm2 );
            
            mm2.copyPosition(planets[2].model.matrix);
            
            mm.multiplyMatrices( mm2, mm );
            
            planets[i].model.matrix = mm; 
            planets[i].model.matrixAutoUpdate = false; 
        }

    
    }


   

    for (var i = 0; i < press.length; i++)
    {
        if (press[i] == true)
        {
            //получение матрицы позиции из матрицы объекта
            //получение позиции из матрицы позиции

            var m = new THREE.Matrix4();
            m.copyPosition(planets[i].model.matrix);
            //получение позиции из матрицы позиции
            var pos = new THREE.Vector3(0, 0, 0);
            pos.setFromMatrixPosition(m);
           
            var x = pos.x + (5 * planets[i].rad * Math.cos(-planets[i].a/2 + cam));
            var z = pos.z + (5 * planets[i].rad * Math.sin(-planets[i].a/2 + cam));
          //  var x =4+pos.x * Math.cos(cam);
           // var z =4+pos.z * Math.sin(cam);    
            camera.position.set(x, 0, z);
            camera.lookAt(pos);
        }
        
    }
}

function addTr(planet)
{
    var lineGeometry = new THREE.Geometry();
    var vertArray = lineGeometry.vertices;

    for (var i = 0; i<360; i++ )
    {
        var x = planet.model.position.x*Math.cos(i*Math.PI/180);
        var z = planet.model.position.x*Math.sin(i*Math.PI/180);

        vertArray.push(new THREE.Vector3(x,0,z))
    }

    var lineMaterial = new THREE.LineDashedMaterial( { color: 0xcccc00, dashSize: 1, gapSize: 1 } ); //параметры: цвет, размер черты, размер промежутка
    var line = new THREE.Line( lineGeometry, lineMaterial );
    line.computeLineDistances();
    scene.add(line);
}
    
function render()
{
    // Рисование кадра
    renderer.render( scene, camera );
}



function addsphere(r, pos, v, texture,bump)
{   
    var loader = new THREE.TextureLoader(); 
    var geometry = new THREE.SphereGeometry( r, 32, 32 );

    tex = loader.load( texture );
    tex.minFilter = THREE.NearestFilter;
    var bump = loader.load( bump );

    //создание материала
    var material = new THREE.MeshPhongMaterial({
        map: tex,
        bumpMap: bump,
        bumpScale: 0.25,
        side: THREE.DoubleSide
       });
       
    
    posX = new THREE.Vector3(pos, 0.0, 0.0);
    sphere = new THREE.Mesh( geometry, material );
    sphere.position.copy(posX);
    scene.add( sphere ); 

    var planet ={};
    planet.model = sphere;
    planet.x = pos;
    planet.a = 0.0;
    planet.rad = r;
    planet.v = v;

    planets.push(planet);
    press.push(false);
}

function addkos(r, pos, v, texture)
{   
    var loader = new THREE.TextureLoader(); 
    var geometry = new THREE.SphereGeometry( r, 32, 32 );

    tex = loader.load( texture );
    tex.minFilter = THREE.NearestFilter;

    //создание материала
    var material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide
            });
    

  //  posX = new THREE.Vector3(pos, 0.0, 0.0);
    sphere = new THREE.Mesh( geometry, material );
    //sphere.position.copy(posX);
    scene.add( sphere ); 

    var kos ={};
    kos.model = sphere;
    kos.x = pos;
    kos.a = 0.0;
    kos.v = v;

    kosmos.push(kos);
}
