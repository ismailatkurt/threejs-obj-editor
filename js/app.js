import {OBJLoader} from "./OBJLoader";


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();

// instantiate a loader var loader = new OBJLoader();
// load a resource loader.load( // resource URL 'models/monster.obj',
// called when resource is loaded function ( object ) { scene.add( object ); },
// called when loading is in progresses function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
// called when loading has errors function ( error ) { console.log( 'An error happened' ); } );


const loader = new OBJLoader();
let object;

loader.load( './step1.obj', function ( obj ) {

    object = obj;

});

renderer.render( scene, camera );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );