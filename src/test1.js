import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    BoxGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Mesh,
    PointLight,
    OrthographicCamera,
    AmbientLight
} from 'three';

import OrbitControls from 'three-orbitcontrols';

/**
     * 创建场景对象
     */
let scene = new Scene();
/**
 * 创建网格模型
 */
let box = new BoxGeometry(100, 100, 100);//创建一个立方体几何对象
let material = new MeshLambertMaterial({ color: 0x00ff00 });//材质对象
let mesh = new Mesh(box, material);//网格模型对象
scene.add(mesh);

//点光源
let point = new PointLight(0xffffff);
point.position.set(400, 200, 300);//点光源位置
scene.add(point);//点光源添加到场景中
//环境光
let ambient = new AmbientLight(0x444444);
scene.add(ambient);
/**
 * 相机设置
 */
let width = window.innerWidth;//窗口宽度
let height = window.innerHeight;//窗口高度
let k = width / height;//窗口宽高比
let s = 100;//三维场景缩放系数
//创建相机对象
let camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(250, 300, 200);//设置相机位置
camera.lookAt(scene.position);//设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
let renderer = new WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1);//设置背景颜色
// document.body.appendChild(renderer.domElement);//body元素中插入canvas对象

//执行渲染操作
renderer.render(scene, camera);
let T0 = new Date();//上次时间
// function render() {
//     let T1 = new Date();//本次时间
//     let t = T1-T0;//时间差
//     T0 = T1;//把本次时间赋值给上次时间
//     requestAnimationFrame(render);
//     renderer.render(scene,camera);//执行渲染操作
//     mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
// }
// render();

function render() {
    renderer.render(scene, camera);//执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render
}
render();
let controls = new OrbitControls(camera);//创建控件对象
// controls.addEventListener('change', render);//监听鼠标、键盘事件