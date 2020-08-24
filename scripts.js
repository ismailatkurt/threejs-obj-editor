var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 200;

container = document.getElementById('container');

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
container.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(10, 10, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('./assets/');
mtlLoader.setPath('./assets/');

var loader = new THREE.FontLoader();

loader.load('./assets/helvetiker_regular.typeface.json', function (font) {
    let myText = new THREE.TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    });
    scene.add(myText);
});


var loadFile = function () {


    mtlLoader.load('r2-d2.mtl', function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./assets/');
        objLoader.load('step1.obj', function (object) {

            scene.add(object);
            object.position.y -= 20;

        });

    });
}

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();

// function btnSVGExportClick(){
//     var rendererSVG = new THREE.SVGRenderer();
//     rendererSVG.setSize(window.innerWidth, window.innerHeight);
//     rendererSVG.render( scene, camera );
//     ExportToSVG(rendererSVG, "test.svg");
// }
//
// function ExportToSVG(rendererSVG, filename){
//     var XMLS = new XMLSerializer();
//     var svgfile = XMLS.serializeToString(rendererSVG.domElement);
//
//     var svgData = svgfile;
//     var preface = '<?xml version="1.0" standalone="no"?>\r\n';
//     var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
//     var svgUrl = URL.createObjectURL(svgBlob);
//     var downloadLink = document.createElement("a");
//     downloadLink.href = svgUrl;
//     downloadLink.download = filename;
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
// }