//creation du scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00d9ff);

//camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 30);
camera.lookAt(scene.position);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//axes
var axisHelper = new THREE.AxisHelper(70);
// scene.add(axisHelper);

//controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.maxDistance = 90;
controls.enableDamping = true;
controls.update();

//lumiere
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 80);
scene.add(pointLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 0, 70);
scene.add(spotLight);

var spotLight2 = new THREE.SpotLight(0x3f3f3f);
spotLight2.position.set(0, 0, -770);
scene.add(spotLight2);

//boxtexrure
const load_gras = new THREE.TextureLoader();
//BOX
let Mur = (nom, background, x, y, z, rotX = 0, rotY = 0, rotZ = 0) => {
  let BoxGeo = new THREE.BoxGeometry(120, 120, 120);
  let BoxMat = new THREE.MeshBasicMaterial({
    // Color:0xffffff,
    map: load_gras.load(background),
  });
  nom = new THREE.Mesh(BoxGeo, BoxMat);
  nom.position.set(x, y, z);
  nom.rotation.set(rotX, rotY, rotZ);
  return nom;
};
scene.add(Mur("ny", "src/img/space/ny.jpg", 0, -120, 0));
scene.add(Mur("py", "src/img/space/py.jpg", 0, 120, 0));
scene.add(Mur("nx", "src/img/space/nx.jpg", -120, 0, 0));
scene.add(Mur("px", "src/img/space/px.jpg", 120, 0, 0));
scene.add(Mur("nz", "src/img/space/pz.jpg", 0, 0, -120)); //nz
scene.add(Mur("pz", "src/img/space/nz.jpg", 0, 0, 120));

//texture
const loadTexture = new THREE.TextureLoader();
const earth = loadTexture.load("src/img/planet/earth_atmos_4096.jpg");
const normalEarth = loadTexture.load("src/img/planet/earth_normal_2048.jpg");
const specularEarth = loadTexture.load(
  "src/img/planet/earth_specular_2048.jpg"
);
const lightEarth = loadTexture.load("src/img/planet/earth_lights_2048.png");
const nuageEarth = loadTexture.load("src/img/planet/earth_clouds_2048.png");
const homeTexture = loadTexture.load("src/img/home/home.jpg");
const moonTexture = loadTexture.load("src/img/planet/moon_1024.jpg");

//terre
const terreGeo = new THREE.SphereGeometry(10, 100, 100);
const terreMat = new THREE.MeshPhongMaterial({
  map: earth,
  normalMap: normalEarth,
  displacementMap: specularEarth,
  displacementScale: -0.1,
  // roughnessMap: lightEarth,
  // roughness: 0.5,
  // side: THREE.BackSide, //pour affiche le texture a L'interieur
});
const terre = new THREE.Mesh(terreGeo, terreMat);
terre.receiveShadow = true;
scene.add(terre);

//nuage
const nuageGeo = new THREE.SphereGeometry(10.5, 100, 100);
const nuageMat = new THREE.MeshPhongMaterial({
  map: nuageEarth,
  transparent: true,
});
const nuage = new THREE.Mesh(nuageGeo, nuageMat);
// nuage.castShadow = true;
terre.add(nuage);

//home
let homeGeo = new THREE.SphereGeometry(9.9, 100, 100);
let homeMat = new THREE.MeshBasicMaterial({
  map: homeTexture,
  side: THREE.BackSide,
});
let home = new THREE.Mesh(homeGeo, homeMat);
scene.add(home);

let fixGeo = new THREE.SphereGeometry(1, 1, 1);
let fixMat = new THREE.MeshBasicMaterial({
  // color: 0xffff99,
  map: lightEarth,
  transparent: true,
});
let fix = new THREE.Mesh(fixGeo, fixMat);
scene.add(fix);

//moon
let moonGeo = new THREE.SphereGeometry(0.5, 100, 100);
let moonMat = new THREE.MeshBasicMaterial({
  map: moonTexture,
});
let moon = new THREE.Mesh(moonGeo, moonMat);
moon.castShadow = true;
moon.position.set(0, 0, 11.5);
fix.add(moon);

//text //creat a function to call all letter of 'UNIVERSAL'

//fix's fixText
// const FixFixFixText = new THREE.Mesh(fixGeo, fixMat);
// scene.add(FixFixFixText);
// const FixFixText = new THREE.Mesh(fixGeo, fixMat);
// FixFixFixText.rotation.z = -Math.PI / 6;
// FixFixFixText.add(FixFixText);

function FontTextLoaded(textToLoad, ry = 0) {
  const textloader = new THREE.FontLoader();
  textloader.load("src/json/gentilis_bold.typeface.json", function (font) {
    const textGeo = new THREE.TextGeometry(textToLoad, {
      font: font,
      size: 3,
      height: 0.8,
      // curveSegments: 12,
      // bevelEnabled: true,
      // bevelThickness: 10,
      // bevelSize: 8,
      // bevelOffset: 0,
      // bevelSegments: 5,
    });
    const textMat = new THREE.MeshLambertMaterial();
    const text = new THREE.Mesh(textGeo, textMat);
    text.position.set(0, 0, 13);
    //creat a support to insert the letter of universal
    let fixText = new THREE.Mesh(fixGeo, fixMat);
    // fixText.scale.set(0.1, 0.1, 0.1);
    // fixText.visible = false;
    fixText.rotation.set(0, ry, 0);
    FixFixText.add(fixText);

    //insert letter to fixText
    fixText.add(text);
  });
}

//call the function to insert the letter with their argument
// let r = 0.3;
// FontTextLoaded("U");
// FontTextLoaded("N", r);
// FontTextLoaded("I", r * 2);
// FontTextLoaded("V", r * 3);
// FontTextLoaded("E", r * 4);
// FontTextLoaded("R", r * 5);
// FontTextLoaded("S", r * 6);
// FontTextLoaded("A", r * 7);
// FontTextLoaded("L", r * 8);

//controler
// let sui = new THREE.FirstPersonControls(camera, renderer.domElement);
// sui.lookAt(10, 100, 100);
// sui.mouseDragOn = true;
// sui.update();

//affichage au html
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  terre.rotation.y -= 0.01;
  nuage.rotation.y += 0.02;
  // moon.rotation.y -= 0.05;
  fix.rotation.set(terre.rotation.y, terre.rotation.y, 0);
  FixFixText.rotation.y -= 0.01;
}
animate();
