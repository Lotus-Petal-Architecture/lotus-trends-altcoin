var camera, scene, raycaster, renderer, parentTransform, sphereInter
var mouse = new THREE.Vector2()
var r = 100,
  dot = 0

  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  var container = document.getElementById('container')

  containerWidth = window.innerWidth
  containerHeight = window.innerHeight

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.minDistance = 0
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 2

  var light = new THREE.PointLight(0xffffff)
  light.position.set(-100, 200, 100)
  scene.add(light)

  var group
  group = new THREE.Group()
  group.position.y = 0
  scene.add(group)

  var links = [
    'https://influence.lotus.fm/en/listings/701008-riot-af',
    'https://influence.lotus.fm/en/listings/724530-home-body',
    'https://influence.lotus.fm/en/listings/713610-joseph-ady',
    'http://www.sleater-kinney.com/',
    'http://www.thethermals.com/',
    'https://rosebloodband.bandcamp.com/',
    'https://www.jetechomusic.com/',
    'http://www.smallmillion.com/',
    'https://soundcloud.com/thatfuckingivan',
    'http://www.ramborich.com',
    'https://missrayon.bandcamp.com/',
    'https://dreamwulf.bandcamp.com/',
    'https://deaftelepathy.bandcamp.com',
    'https://velcronightmare.bandcamp.com/',
    'http://www.decemberists.com/',
    'http://www.scottpemberton.com/',
    'https://soundcloud.com/yerathrall/loverload-i-dont-care-demo',
    'https://www.reverbnation.com/geneethorpjr',
    'https://www.karmarivera.com/',
    'https://blackwaterholylight.bandcamp.com',
    'http://www.dirtyrevival.com/',
    'http://www.blitzentrapper.net/',
    'https://savila.bandcamp.com/',
    'http://pinkmartini.com/',
    'https://www.haley-heynderickx.com/',
     null,
    'https://thebody.bandcamp.com/',
    'https://alienboypdx.bandcamp.com/',
    'http://galeximusic.com/',
    'https://www.coloringelectriclike.com',
    'https://influence.lotus.fm/en/listings/701008-riot-af',
    'https://influence.lotus.fm/en/listings/724530-home-body',
    'https://influence.lotus.fm/en/listings/713610-joseph-ady',
    'http://www.sleater-kinney.com/',
    'http://www.thethermals.com/',
    'https://rosebloodband.bandcamp.com/',
    'https://www.jetechomusic.com/',
    'http://www.smallmillion.com/',
    'https://soundcloud.com/thatfuckingivan',
    'http://www.ramborich.com',
    'https://missrayon.bandcamp.com/',
    'https://dreamwulf.bandcamp.com/',
    'https://deaftelepathy.bandcamp.com',
    'https://velcronightmare.bandcamp.com/',
    'http://www.decemberists.com/',
    'http://www.scottpemberton.com/',
    'https://soundcloud.com/yerathrall/loverload-i-dont-care-demo',
    'https://www.reverbnation.com/geneethorpjr',
    'https://www.karmarivera.com/',
    'https://blackwaterholylight.bandcamp.com',
    'http://www.dirtyrevival.com/',
    'http://www.blitzentrapper.net/',
    'https://savila.bandcamp.com/',
    'http://pinkmartini.com/',
    'https://www.haley-heynderickx.com/',
    'https://thebody.bandcamp.com/',
    'https://alienboypdx.bandcamp.com/',
    'http://galeximusic.com/',
    'https://www.coloringelectriclike.com',
  ]


// sample arrays for testing purposes


  var some_bands = [0, 1, 2, 3, 4, 7, 19, 22, 23, 24, 25, 26, 27, 28, 29, 42,43,62,34,48,49,50,51,52,53,54,55,63]
  var k_values = [] //list of all k values with points assigned to them


// -------------------------------------------- //


init()
function init () {
  container = document.createElement('div')
  document.body.appendChild(container)


  //Petal Constructor - draws outline of petal
  function drawPetal (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points = curve.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points = curve2.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })

    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)
  }


  //Chart Position Arc - returns points for top of chart lines
  function chartTop (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points1 = curve.getSpacedPoints(25)
    var geometry = new THREE.BufferGeometry().setFromPoints(points1)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points2 = curve2.getSpacedPoints(25)
    var geometry = new THREE.BufferGeometry().setFromPoints(points2)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var points = points1.concat(points2)
    return points
  }


  //Chart Position - draws chart lines within petal arc
  function chartPosition (x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code) {
    var cPcurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var points = cPcurve.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)
  }


  //Invisible Spaghetti - add TubeGeometry objects that sheath chart lines representing active geometric links.
  function invisibleSpaghetti (k, x, y, z, x0, y0, z0, petalheight, ctrlpt) {
    var link_curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var geometry = new THREE.TubeGeometry(link_curve, 64, 0.001, 8, false)
    var material = new THREE.MeshBasicMaterial({ color: 0xe45e9d })
    var object = new THREE.Mesh(geometry, material)
    material.transparent = true
    object.label = k
    parentTransform.add(object)
  }

  //Outer Petals - draws outer ring of petals
  function drawPetalRing (segmentCount, radius, depth, color_code, chartLines, divisor){
  var geometry = new THREE.Geometry(),
    material = new THREE.LineBasicMaterial({ color: color_code })

  for (var i = 0; i <= segmentCount; i++) {
    var theta = (i / segmentCount) * Math.PI * 2
    var iota = ((i + 0.5) / segmentCount) * Math.PI * 2
    var kappa = ((i + 1) / segmentCount) * Math.PI * 2
    drawPetal(
      Math.cos(theta) * radius,
      0,
      Math.sin(theta) * radius,
      Math.cos(iota) * (radius - depth),
      0,
      Math.sin(iota) * (radius - depth),
      Math.cos(kappa) * radius,
      0,
      Math.sin(kappa) * radius,
      0.5,
      0.45,
      color_code
    )
  }
  group.add(new THREE.Line(geometry, material))


  //Draws Chart Lines - outer petals
  var geometry = new THREE.Geometry(),
    material = new THREE.LineBasicMaterial({ color: color_code })

  //this prevents two values from occupying overlapping chart lines at the center of the petal chart
  var blanks = []
  for (var i = 1; i < chartLines; i++) {
    var skip = (i-1) * divisor + 25
    blanks.push(skip)
  }

  for (var i = 0; i < chartLines; i++) {
    var k = 0
    var theta = (i / chartLines) * Math.PI * 2
    var iota = ((i + 0.5) / chartLines) * Math.PI * 2
    var kappa = ((i + 1) / chartLines) * Math.PI * 2
    var iota0 = ((i + divisor / 2) / chartLines) * Math.PI * 2
    var kappa0 = ((i + divisor) / chartLines) * Math.PI * 2
    var modulus = i % divisor

    var base_x = Math.cos(theta) * radius
    var base_y = 0
    var base_z = Math.sin(theta) * radius
    var petalheight = 0.5
    var ctrlpt = 0 //ctrl pt for chart lines (within petal)
    var arcpt = 0.45 //ctrl pt for petal arc (outline)

    if (modulus == 0) {

//this resets chart line variables for each new petal drawn

      var chartPoint = chartTop(
        Math.cos(theta) * radius,
        0,
        Math.sin(theta) * radius,
        Math.cos(iota0) * (radius - depth),
        0,
        Math.sin(iota0) * (radius - depth),
        Math.cos(kappa0) * radius,
        base_y,
        Math.sin(kappa0) * radius,
        petalheight,
        arcpt,
        0x00769d
      )

      for (var j = 1; j <= divisor; j++) {
        k = i + j
        k=k-1
        var theta0 = (k / chartLines) * Math.PI * 2
        var base_xk = Math.cos(theta0) * radius
        var base_yk = 0
        var base_zk = Math.sin(theta0) * radius

        chartPosition(
          chartPoint[j].x,
          chartPoint[j].y,
          chartPoint[j].z,
          base_xk,
          base_yk,
          base_zk,
          petalheight,
          ctrlpt,
          color_code
        )

        k_values.push([
          k,
          chartPoint[j].x,
          chartPoint[j].y,
          chartPoint[j].z,
          base_xk,
          base_yk,
          base_zk,
          petalheight,
          ctrlpt
        ])
      }
    }

    geometry.vertices.push(
      new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
    )
  }

  parentTransform = new THREE.Object3D()
  group.add(parentTransform)

  var i = 0

  while (i < chartLines) {

    if (blanks.includes(i)) {
    }

    else if (some_bands.includes(i)) {
      invisibleSpaghetti(
        k_values[i][0],
        k_values[i][1],
        k_values[i][2],
        k_values[i][3],
        k_values[i][4],
        k_values[i][5],
        k_values[i][6],
        k_values[i][7],
        k_values[i][8]
      )
    }
    i++
  }

group.add(new THREE.Line(geometry, material))
}

  // -------------------------------- // 


drawPetalRing (16, 1, .1,  0x0099cc, 800, 50)  //outer petals

drawPetalRing (14, .85, .1, 0x0289b6, 700, 50)  //middle petals

drawPetalRing (12, .65, .1, 0x00769d, 600, 50) //center petals
      

  // --- raycaster code


  var geometry = new THREE.SphereBufferGeometry(0.01)
  var material = new THREE.MeshBasicMaterial({ color: 0x45a7c5 })
  sphereInter = new THREE.Mesh(geometry, material)
  sphereInter.visible = false
  scene.add(sphereInter)

  raycaster = new THREE.Raycaster()

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('click', onMouseClick, false)
  window.addEventListener('resize', onWindowResize, false)

  function onDocumentMouseMove (event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(parentTransform.children, true)
    if (intersects.length > 0) {
      sphereInter.visible = true
      sphereInter.position.copy(intersects[0].point)
    } else {
      sphereInter.visible = false
    }
  }

  function onMouseClick (event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(parentTransform.children, true)
    for (var i = 0; i < intersects.length; i++) {
      var intersection = intersects[i],
      obj = intersection.object
      var URL = links[obj.label]
      window.open(URL, '_blank')
    }
  }

  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  //animate and render

  camera.position.z = 5

  function animate () {
    requestAnimationFrame(animate)
    render()
    group.rotation.x += 0.0
    group.rotation.y += 0.0
  }
  animate()

  function render () {
    dot += 0
    renderer.render(scene, camera)
  }
}

//  ---- reference code ----- //  

var blah = {
  'myFunction': function () 
  {
  }
}
blah['myFunction']()
blah.myFunction()

//document.write(k + " " + links[k] + ", ");

//  ---- reference code ----- //  
