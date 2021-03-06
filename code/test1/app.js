/// <reference types="@argonjs/argon" />
/// <reference types="three" />
/// <reference types="dat-gui" />
/// <reference types="stats" />
// set up Argon.  Share the canvas so the webrtc reality can draw the
// video background in it
var app = Argon.init(null, { 'sharedCanvas': true }, null);
// set up THREE.  Create a scene, a perspective camera and an object
// for the user's location
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera();



/*
var controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
*/

var boxScene = new THREE.Object3D;
scene.add(boxScene);







var userLocation = new THREE.Object3D();
scene.add(camera);
scene.add(userLocation);
scene.autoUpdate = false;
// We use the standard WebGLRenderer when we only need WebGL-based content
var renderer = new THREE.WebGLRenderer({
    alpha: true,
    logarithmicDepthBuffer: true,
    antialias: Argon.suggestedWebGLContextAntialiasAttribute
});
// account for the pixel density of the device
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.bottom = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
app.view.element.appendChild(renderer.domElement);
// do not clear the canvas when sharing it
renderer.autoClear = false;
// to easily control stuff on the display
var hud = new THREE.CSS3DArgonHUD();
// We put some elements in the index.html, for convenience. 
// Here, we retrieve the description box and move it to the 
// the CSS3DArgonHUD hudElements[0].  We only put it in the left
// hud since we'll be hiding it in stereo
var description = document.getElementById('description');
//hud.hudElements[0].appendChild(description);
app.view.element.appendChild(hud.domElement);
// let's show the rendering stats
var stats = new Stats();
hud.hudElements[0].appendChild(stats.dom);
// set the layers of our view
app.view.setLayers([
    { source: renderer.domElement },
    { source: hud.domElement }
]);

var argonTextObject = new THREE.Object3D();
argonTextObject.position.z = -0.5;
userLocation.add(argonTextObject);

var argonTextMesh = createTextMesh();
argonTextObject.add(argonTextMesh);
argonTextObject.scale.set(0.001, 0.001, 0.001); 
argonTextObject.position.z = -0.50;


var objects = [];
objects.push(argonTextObject);
boxScene.add(argonTextObject);


/*
var dragControls = new THREE.DragControls( argonTextObject, camera, renderer.domElement );
dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );
*/






function createTextMesh() {

    var geometry = new THREE.BoxGeometry( 50, 50, 50 ); //tamano de la figura

    var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
//    var numFaces = geometry.faces.length;
//    var displacement = new Float32Array(numFaces * 3 * 3);
//    bufferGeometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 3));

    var texture = THREE.ImageUtils.loadTexture( 'charm-laulima.png' );
    var material = new THREE.MeshBasicMaterial({map:texture, transparent:true});

    var mesh = new THREE.Mesh( bufferGeometry, material );

//    mesh.position.z = -0.50;    //copia de linea 62


 //   mesh.position.x = Math.random() * 1000 - 500;
  //  mesh.position.y = Math.random() * 600 - 300;
  //  mesh.position.z = Math.random() * 800 - 400;
   




    return mesh;
}


app.vuforia.isAvailable().then(function (available) {
    // vuforia not available on this platform
    if (!available) {
        console.warn("vuforia not available on this platform.");
        console.warn("attempting to initialize jsartoolkit instead.");
        initializeJSARToolKit();
        return;
    }
    // tell argon to initialize vuforia for our app, using our license information.
    app.vuforia.init({
        encryptedLicenseData: "-----BEGIN PGP MESSAGE-----\nVersion: OpenPGP.js v2.3.2\nComment: http://openpgpjs.org\n\nwcFMA+gV6pi+O8zeARAAssqSfRHFNoDTNaEdU7i6rVRjht5U4fHnwihcmiOR\nu15f5zQrYlT+g8xDM69uz0r2PlcoD6DWllgFhokkDmm6775Yg9I7YcguUTLF\nV6t+wCp/IgSRl665KXmmHxEd/cXlcL6c9vIFT/heEOgK2hpsPXGfLl1BJKHc\nCqFZ3I3uSCqoM2eDymNSWaiF0Ci6fp5LB7i1oVgB9ujI0b2SSf2NHUa0JfP9\nGPSgveAc2GTysUCqk3dkgcH272Fzf4ldG48EoM48B7e0FLuEqx9V5nHxP3lh\n9VRcAzA3S3LaujA+Kz9/JUOckyL9T/HON/h1iDDmsrScL4PaGWX5EX0yuvBw\nFtWDauLbzAn5BSV+pw7dOmpbSGFAKKUnfhj9d1c5TVeaMkcBhxlkt7j7WvxS\nuuURU3lrH8ytnQqPJzw2YSmxdeHSsAjAWnCRJSaUBlAMj0QsXkPGmMwN8EFS\n9bbkJETuJoVDFfD472iGJi4NJXQ/0Cc4062J5AuYb71QeU8d9nixXlIDXW5U\nfxo9/JpnZRSmWB9R6A2H3+e5dShWDxZF/xVpHNQWi3fQaSKWscQSvUJ83BBP\nltCvDo+gpD6tTt+3SnAThLuhl38ud7i1B8e0dOCKpuYeSG0rXQPY53n2+mGK\nP1s0e0R7D5jztijwXvGPf45z232cztWsZWvuD2x42DXBwU0DAGn1enGTza0Q\nB/j9y72hJrXx/TdOq85QDMBAA+Ocm9MSGylOqMOb9ozC+DVhhVx7doqS3xV9\nh3jLf6V+OF6VIPHQBxAzH5svlktEOcTtjrjQxnUMmNuHbNQmZlA7uYsAqUpF\nnWqPtJeHMi2F/gYYI/ApK3NGxzJe21dAf2cdp26wf/PoLusotCQH1YVpuR+V\n18Mb8hMpPlB1j5SXnBlv98LxiOGlG6/lQWxpMzkMSZZTxMxa1pCsYNJKK9Bg\npFUyp4x0W4bQL1mRlqaO04cfoErfHqQzboS2b7WRrNy7YJ9rcBbmpbSc+GEY\nT7ZUPs66EHgdp6uWYPbM1/oajHQBSPALiV65k06XlR4H+QG1ClkSIkbguKnu\nmbpgF7wF5bAfjVVK/ST000Dzr09sgfm4wlIHRcezOzUgjIDVAQE63PznhzfZ\nPEwOKC9ex9t9G+HjvhxICYFoxJLcHJ8ytTWEguNFqSIRTKWTgvAycvTFkJA/\npasmzov3Nouak8sE28r2NRpWbmI7muLvHfPWgy/rVczF+E1sOkbwtsdOgmym\nyC9yB2IB3fhpLgU28cuI26+cx5IIke0jUgftvza8Oqa0gFZzvu8LaR/RsUdp\n9/CRpiYFvvamNmCDIxxYKtAFCOkEni/5ht4poI2ZxHeWtjwZ2GBqby7BqpUu\nxLXgv+3XpVq1sSUVurKbntDXUy3BwUwDju235GExYfIBEADMsiKpgf0sGKeW\na5uzMKZgnMm1MoRFBJNsjmBZrbsMxn6lf2ry3XM1xw/w15lepn4X/EMDLeRw\n1m3vw4JL7dLY6e2oOllWyscCs+qE8Cwwx9x6q/gAMfwyrqMQ5EH8psIrRKZM\neZwGEnSIuUXtJu3ShyqZUqfbpXhr+TxUEXY7n7NuCRJeM70PWPZB5IC1h3Bp\nkgxMRP4zHN2VG4PlcX2fLjpYsx1BHtR2T1biYxbk1AZ26s97XEMH7t9oe+8b\nG+QZc500MmPOd+62UZmnOf/Dul9q/H/0+IlWlWSUTTZFtlL+LwR56t28xqca\nFjUW8TXv6zYUvY7kk5Mlf2iWPA11wJuHaL5DnGaOoNgFVzicNQKy3SfeuYyp\nrSwClM37jRKw+ZNGQDPSAhtrwYZxtndCw/jieqdxIbFG9Td+BunpJNE+KICN\njmnvG5JrzdueKAyTGqxNOtQnNDJYcg+p5rZVZHGQMN/22n2aiRpWhVAdJIXE\nYgpsFH6R01N3Y55RFNrhusOhuWodj0XuS1EhknU47XyIpNVSZhWG/e+vXMHb\nsN5cO0V7iCFrSxKXg6AwVneoWJC5anT9IabIcgAz07SjdjceC2MlW0vdjPks\nFNygBlP9fTIjBGRzg5QQCh/LyyFUTr1rYRbF+4k5kBQ3MtD2a/lS3Sk1MK/+\nEs9PfWaAoNLB+QGqSi1qtIhds22zelOtc2MGFxgwb/iNZOUccauv6OXThvDD\ngzpn7gZi0+N7pOwx9lJM9QgC4hTMlo268vhNd/MMIPMeyp5n5D8p8ewAutZm\nAcIJkP3h2tUG1V/RvVLF22F+ilh3h++7TeSfHdTdv6ArwDJXdQunHCp3020f\nvhT6XG0ND+UMFtrptJe7+NoRpNg9oZo6kvwDzhPdIa2OlVjXmr25ueC8FlET\ncYdFbIisK+std7/XMlkE5wlGkf9G0RoHsxXqB2Nsj8l3qF5UNyWD+/2Wh+L9\nCDjUbY1FxwlVJ4UZ7lz+8jWHO5jYY99adPoATpUaWYxm9oPxz/QR4kvgvLjl\n9Ti8379Y8qihzqsRmf6YLYyggknlt9Uyl2HjA+1zcwbDnb3I6g/XjTFUPy1D\nxZqqSEuCNDLh7m1+GDA3KXQnLIqOdcxOVzyFCDtKI9c6b0D0ezNkxUjgkoIp\nmxSSLDjzmHuPLsQVwqxP4KNU1gT7mXTnhlhsG2Vll/WZD+tuzGK8h9anf6/p\n4pCk61Dhj1hmb9msTaK4FGhmBMtJ6kQ4SzGOfFKG5IElAHidYgd0iz7AqEzX\nGttDkcHGM9iPIYUBY2r/538M/kxeVx5fBiWEkmWz5FMzqPRs3GZWYiAb2tnp\nWSDXW3B1mwznwcCkyUP6OP/c6FFmb6Rag/ZaItVAvVjmA7tXICLJPhYIs9hE\nI6zJSVZ81YtKg9Nb6Rx49qf18pQ1SWZNGrZrWaTJTLu4cu4c5v/czY5kyT0Y\n8RqNUlI5hwWU8G9LpJ5jv8dssrgcweTG/PEbCkzqz0R6W6VgDUyqo6WSGgoS\nB9or791lGcDazNT6CJ4/2Z1wBd4BSHkhSwfcPovGOleZFE24gLiG6puHyVjk\nWEIir2WXzhypwLkG/dn+ZJW1ezOvTb4gVVILHrWhNh8=\n=LoZg\n-----END PGP MESSAGE-----"
    }).then(function (api) {
        // the vuforia API is ready, so we can start using it.
        // tell argon to download a vuforia dataset.  The .xml and .dat file must be together
        // in the web directory, even though we just provide the .xml file url here 
        api.objectTracker.createDataSet("../resources/datasets/ArgonTutorial.xml").then(function (dataSet) {
            // the data set has been succesfully downloaded
            // tell vuforia to load the dataset.  
            dataSet.load().then(function () {
                // when it is loaded, we retrieve a list of trackables defined in the
                // dataset and set up the content for the target
                var trackables = dataSet.getTrackables();
                // tell argon we want to track a specific trackable.  Each trackable
                // has a Cesium entity associated with it, and is expressed in a 
                // coordinate frame relative to the camera.  Because they are Cesium
                // entities, we can ask for their pose in any coordinate frame we know
                // about.
                var gvuBrochureEntity = app.context.subscribeToEntityById(trackables["GVUBrochure"].id);
                // create a THREE object to put on the trackable
                var gvuBrochureObject = new THREE.Object3D;
                scene.add(gvuBrochureObject);
                // the updateEvent is called each time the 3D world should be
                // rendered, before the renderEvent.  The state of your application
                // should be updated here.
                app.context.updateEvent.addEventListener(function () {
                    // get the pose (in local coordinates) of the gvuBrochure target
                    var gvuBrochurePose = app.context.getEntityPose(gvuBrochureEntity);
                    // if the pose is known the target is visible, so set the
                    // THREE object to the location and orientation
                    if (gvuBrochurePose.poseStatus & Argon.PoseStatus.KNOWN) {
                        gvuBrochureObject.position.copy(gvuBrochurePose.position);
                        gvuBrochureObject.quaternion.copy(gvuBrochurePose.orientation);
                    }
                    // when the target is first seen after not being seen, the 
                    // status is FOUND.  Here, we move the 3D text object from the
                    // world to the target.
                    // when the target is first lost after being seen, the status 
                    // is LOST.  Here, we move the 3D text object back to the world
                    if (gvuBrochurePose.poseStatus & Argon.PoseStatus.FOUND) {
                        gvuBrochureObject.add(argonTextObject);
                        argonTextObject.position.z = 0;
                    }
                    else if (gvuBrochurePose.poseStatus & Argon.PoseStatus.LOST) {
                        argonTextObject.position.z = -0.50;
                        userLocation.add(argonTextObject);
                    }
                });
            })["catch"](function (err) {
                console.log("could not load dataset: " + err.message);
            });
            // activate the dataset.
            api.objectTracker.activateDataSet(dataSet);
        });
    })["catch"](function (err) {
        console.log("vuforia failed to initialize: " + err.message);
    });
});
function initializeJSARToolKit() {
    // set our desired reality 
    app.reality.request(Argon.RealityViewer.WEBRTC);
    var webrtcRealitySession;
    // start listening for connections to a reality
    app.reality.connectEvent.addEventListener(function (session) {
        if (session.supportsProtocol('ar.jsartoolkit')) {
            // save a reference to this session
            webrtcRealitySession = session;
            webrtcRealitySession.request('ar.jsartoolkit.init').then(function () {
                webrtcRealitySession.request('ar.jsartoolkit.addMarker', {
                    url: "../resources/artoolkit/patt.hiro"
                }).then(function (msg) {
                    if (!msg)
                        return;
                    // tell argon we want to track a specific marker.  Each marker
                    // has a Cesium entity associated with it, and is expressed in a 
                    // coordinate frame relative to the camera.  Because they are Cesium
                    // entities, we can ask for their pose in any coordinate frame we know
                    // about.
                    var hiroEntity = app.context.subscribeToEntityById(msg.id);
                    // create a THREE object to put on the marker
                    var hiroObject = new THREE.Object3D;
                    scene.add(hiroObject);
                    // the updateEvent is called each time the 3D world should be
                    // rendered, before the renderEvent.  The state of your application
                    // should be updated here.
                    app.context.updateEvent.addEventListener(function () {
                        // get the pose (in local coordinates) of the marker
                        var hiroPose = app.context.getEntityPose(hiroEntity);
                        // if the pose is known the target is visible, so set the
                        // THREE object to the location and orientation
                        if (hiroPose.poseStatus & Argon.PoseStatus.KNOWN) {
                            hiroObject.position.copy(hiroPose.position);
                            hiroObject.quaternion.copy(hiroPose.orientation);
                        }
                        // when the target is first seen after not being seen, the 
                        // status is FOUND.  Here, we move the 3D text object from the
                        // world to the target.
                        // when the target is first lost after being seen, the status 
                        // is LOST.  Here, we move the 3D text object back to the world
                        if (hiroPose.poseStatus & Argon.PoseStatus.FOUND) {
                            console.log("marker found");
                            hiroObject.add(argonTextObject);
                            // note: currently artoolkit markers are always considered 1 meter across
                            // this scale is a temporary fix
                    //        argonTextObject.scale.set(0.01, 0.01, 0.01);
                            argonTextObject.position.z = 0;
                        }
                        else if (hiroPose.poseStatus & Argon.PoseStatus.LOST) {
                            console.log("marker lost");
                   //         argonTextObject.scale.set(0.001, 0.001, 0.001);
                            argonTextObject.position.z = -0.50;
                            userLocation.add(argonTextObject);
                        }
                    });
                });
            });
        }
    });
}
// the updateEvent is called each time the 3D world should be
// rendered, before the renderEvent.  The state of your application
// should be updated here.
app.context.updateEvent.addEventListener(function () {
    // get the position and orientation (the "pose") of the user
    // in the local coordinate frame.
    var userPose = app.context.getEntityPose(app.context.user);
    // assuming we know the user's pose, set the position of our 
    // THREE user object to match it
    if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
        userLocation.position.copy(userPose.position);
    }
    // udpate our scene matrices
    scene.updateMatrixWorld(false);
});
// renderEvent is fired whenever argon wants the app to update its display
app.renderEvent.addEventListener(function () {
    if (app.reality.isSharedCanvas) {
        // if this is a shared canvas we can't depend on our GL state
        // being exactly how we left it last frame
        renderer.resetGLState();
    }
    else {
        // not a shared canvas, we need to clear it before rendering
        renderer.clear();
    }
    // update the rendering stats
    stats.update();
    // get the subviews for the current frame
    var subviews = app.view.subviews;
    // if we have 1 subView, we're in mono mode.  If more, stereo.
    var monoMode = subviews.length == 1;
    // set the renderer to know the current size of the viewport.
    // This is the full size of the viewport, which would include
    // both subviews if we are in stereo viewing mode
    var view = app.view;
    renderer.setSize(view.renderWidth, view.renderHeight, false);
    renderer.setPixelRatio(app.suggestedPixelRatio);
    var viewport = view.viewport;
    hud.setSize(viewport.width, viewport.height);
    // there is 1 subview in monocular mode, 2 in stereo mode    
    for (var _i = 0, subviews_1 = subviews; _i < subviews_1.length; _i++) {
        var subview = subviews_1[_i];
        // set the position and orientation of the camera for 
        // this subview
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        // the underlying system provide a full projection matrix
        // for the camera. 
        camera.projectionMatrix.fromArray(subview.frustum.projectionMatrix);
        // set the viewport for this view
        var _a = subview.renderViewport, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        renderer.setViewport(x, y, width, height);
        // set the webGL rendering parameters and render this view
        renderer.setScissor(x, y, width, height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
        // adjust the hud, but only in mono
        if (monoMode) {
            var _b = subview.viewport, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
            hud.setViewport(x, y, width, height, subview.index);
            hud.render(subview.index);
        }
    }
});




var isCrosshair = false;
var INTERSECTED, SELECTED;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
document.addEventListener('keydown', onDocumentKeyStart, false);
document.addEventListener('keyup', onDocumentKeyEnd, false);
function onDocumentKeyStart(event) {
    console.log("keyboard press");
    if (event.defaultPrevented) {
        return; // Should do nothing if the key event was already consumed.
    }
    if (event instanceof KeyboardEvent) {
        if (!SELECTED && event.keyCode == " ".charCodeAt(0)) {
            if (isCrosshair) {
                mouse.x = mouse.y = 0;
                if (handleSelection()) {
                    event.preventDefault();
                }
            }
        }
    }
}
function onDocumentKeyEnd(event) {
    console.log("keyboard release");
    if (event.defaultPrevented) {
        return; // Should do nothing if the key event was already consumed.
    }
    if (event instanceof KeyboardEvent) {
        if (event.keyCode == " ".charCodeAt(0)) {
            if (SELECTED && isCrosshair) {
                if (handleRelease()) {
                    event.preventDefault();
                }
            }
        }
    }
}
app.view.uiEvent.addEventListener(function (evt) {
    var event = evt.event;
    if (event.defaultPrevented) {
        console.log("event was consumed");
        console.log(event);
        evt.forwardEvent();
        return; // Should do nothing if the key event was already consumed.
    }
    // handle mouse movement
    var ti, tx, ty;
    switch (event.type) {
        case "touchmove":
            if (window.PointerEvent) {
                evt.forwardEvent();
                return; // ignore duplicate events
            }
            //console.log ("touch move: ");
            //console.log(event);
            event.preventDefault();
            for (ti = 0; ti < event.changedTouches.length; ti++) {
                //console.log("changedTouches[" + i + "].identifier = " + e.changedTouches[i].identifier);
                if (event.changedTouches[ti].identifier == touchID)
                    break;
            }
            // if we didn't find a move for the first touch, skip
            if (ti == event.changedTouches.length) {
                evt.forwardEvent();
                return;
            }
        case "pointermove":
        case "mousemove":
            // if crosshair interaction, mousemove passed on
            if (isCrosshair) {
                evt.forwardEvent();
                return;
            }
            if (event.type == "touchmove") {
                tx = event.changedTouches[ti].clientX;
                ty = event.changedTouches[ti].clientY;
            }
            else {
                tx = event.clientX;
                ty = event.clientY;
            }
            var x = (tx / window.innerWidth) * 2 - 1;
            var y = -(ty / window.innerHeight) * 2 + 1;
            if (SELECTED) {
                mouse.x = x;
                mouse.y = y;
                raycaster.setFromCamera(mouse, camera);
                // recompute the plane each time, in case the camera moved
                var worldLoc = user.localToWorld(tempPos.copy(SELECTED.position));
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), 
                //user.getWorldDirection( new THREE.Vector3(0,0,1) ),
                worldLoc);
                if (raycaster.ray.intersectPlane(plane, intersection)) {
                    // planes, rays and intersections are in the local "world" 3D coordinates
                    var ptInWorld = user.worldToLocal(intersection).sub(offset);
                    SELECTED.position.copy(ptInWorld);
                    // SELECTED.entity.position.setValue(SELECTED.position, app.context.user);
                }
            }
            else {
                handlePointerMove(x, y);
                evt.forwardEvent();
            }
            return;
        case "touchstart":
            if (window.PointerEvent) {
                evt.forwardEvent();
                return; // ignore duplicate events
            }
            console.log("touch start: ");
            console.log(event);
            event.preventDefault();
            // try the first new touch ... seems unlikely there will be TWO new touches
            // at exactly the same time
            ti = 0;
        case 'pointerdown':
        case 'mousedown':
            // ignore additional touches or pointer down events after the first selection
            if (SELECTED) {
                // perhaps multitouch devices can do a second pointer down ... need
                // to keep track of which pointer event, I suppose!
                evt.forwardEvent();
                return;
            }
            if (isCrosshair) {
                if (event.type == "mousedown") {
                    // ignore mouse down events for selection in crosshair mode, they must
                    // use the keyboard
                    console.log("mousedown ignored");
                    evt.forwardEvent();
                    return;
                }
                mouse.x = mouse.y = 0;
            }
            else {
                if (event.type == "touchstart") {
                    tx = event.changedTouches[ti].clientX;
                    ty = event.changedTouches[ti].clientY;
                }
                else {
                    tx = event.clientX;
                    ty = event.clientY;
                }
                mouse.x = (tx / window.innerWidth) * 2 - 1;
                mouse.y = -(ty / window.innerHeight) * 2 + 1;
            }
            console.log("mousedown");
            if (handleSelection()) {
                if (event.type == "touchstart") {
                    touchID = event.changedTouches[ti].identifier;
                }
                if (event.type == "touchstart" || event.type == "pointerdown") {
                    if (!isCrosshair) {
                        if (INTERSECTED)
                            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                        INTERSECTED = SELECTED;
                        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                        INTERSECTED.material.color.setHex(0xffff33);
                    }
                }
            }
            else {
                evt.forwardEvent();
            }
            break;
        case "touchend":
            if (window.PointerEvent) {
                evt.forwardEvent();
                return; // ignore duplicate events
            }
            console.log("touch end: ");
            console.log(event);
            event.preventDefault();
            for (ti = 0; ti < event.changedTouches.length; ti++) {
                //console.log("changedTouches[" + i + "].identifier = " + e.changedTouches[i].identifier);
                if (event.changedTouches[ti].identifier == touchID)
                    break;
            }
            // if we didn't find a move for the first touch, skip
            if (ti == event.changedTouches.length) {
                evt.forwardEvent();
                return;
            }
        case 'pointerup':
        case 'mouseup':
            if (isCrosshair && event.type == "mouseup") {
                // ignore mouse up events for selection in crosshair mode, they must
                // use the keyboard
                console.log("release ignored");
                evt.forwardEvent();
                return;
            }
            console.log("release");
            if (SELECTED) {
                if (handleRelease()) {
                    if ((event.type == "touchend" || event.type == "pointerup") && !isCrosshair) {
                        if (INTERSECTED)
                            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                        INTERSECTED = null;
                    }
                }
            }
            else {
                evt.forwardEvent();
            }
            break;
        default:
            evt.forwardEvent();
    }
    //console.log(event);
});
function handleSelection() {
    scene.updateMatrixWorld(true);
    raycaster.setFromCamera(mouse, camera);
    console.log("touch!");
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        console.log("touch intersect!");
        var object = intersects[0].object;
        var date = app.context.getTime();
        var defaultFrame = app.context.getDefaultReferenceFrame();
        console.log("------");
        console.log("touch FIXED pos=" + JSON.stringify(object.position));
        console.log("touch FIXED quat=" + JSON.stringify(object.quaternion));
        THREE.SceneUtils.detach(object, boxScene, scene);
        THREE.SceneUtils.attach(object, scene, user);
        // var newpose = app.context.getEntityPose(object.entity);
        // console.log("touch DEVICE pos=" + newpose.position);
        // console.log("touch DEVICE quat=" + newpose.orientation)
        // console.log("touch DEVICE _value pos=" + object.entity.position._value);
        // console.log("touch DEVICE _value quat=" + object.entity.orientation._value)
        // console.log("------");
        SELECTED = object;
        // console.log("touch DEVICE pos=" + boxPose.position);
        // console.log("touch DEVICE quat=" + boxPose.orientation)
        // console.log("touch DEVICE _value pos=" + (object.entity.position as any)._value);
        // console.log("touch DEVICE _value quat=" + (object.entity.orientation as any)._value)
        // console.log("------");
        if (!isCrosshair) {
            var worldLoc = user.localToWorld(tempPos.copy(SELECTED.position));
            plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), worldLoc);
            if (raycaster.ray.intersectPlane(plane, intersection)) {
                //offset.copy( user.worldToLocal(( intersection ).sub( worldLoc )));
                offset.copy(user.worldToLocal(intersection).sub(SELECTED.position));
            }
        }
        return true;
    }
    return false;
}
function handlePointerMove(x, y) {
    if (SELECTED) {
        return;
    }
    mouse.x = x;
    mouse.y = y;
    scene.updateMatrixWorld(true);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED)
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setHex(0xffff33);
        }
    }
    else {
        if (INTERSECTED)
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
    }
}
