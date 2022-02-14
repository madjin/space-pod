
const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const bermudaGrass = new Entity('bermudaGrass')
engine.addEntity(bermudaGrass)
bermudaGrass.setParent(_scene)
const gltfShape = new GLTFShape("c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
bermudaGrass.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass.addComponentOrReplace(transform2)

const bermudaGrass2 = new Entity('bermudaGrass2')
engine.addEntity(bermudaGrass2)
bermudaGrass2.setParent(_scene)
bermudaGrass2.addComponentOrReplace(gltfShape)
const transform3 = new Transform({
  position: new Vector3(24, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass2.addComponentOrReplace(transform3)

const bermudaGrass3 = new Entity('bermudaGrass3')
engine.addEntity(bermudaGrass3)
bermudaGrass3.setParent(_scene)
bermudaGrass3.addComponentOrReplace(gltfShape)
const transform4 = new Transform({
  position: new Vector3(40, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass3.addComponentOrReplace(transform4)

const bermudaGrass4 = new Entity('bermudaGrass4')
engine.addEntity(bermudaGrass4)
bermudaGrass4.setParent(_scene)
bermudaGrass4.addComponentOrReplace(gltfShape)
const transform5 = new Transform({
  position: new Vector3(8, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass4.addComponentOrReplace(transform5)

const bermudaGrass5 = new Entity('bermudaGrass5')
engine.addEntity(bermudaGrass5)
bermudaGrass5.setParent(_scene)
bermudaGrass5.addComponentOrReplace(gltfShape)
const transform6 = new Transform({
  position: new Vector3(24, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass5.addComponentOrReplace(transform6)

const bermudaGrass6 = new Entity('bermudaGrass6')
engine.addEntity(bermudaGrass6)
bermudaGrass6.setParent(_scene)
bermudaGrass6.addComponentOrReplace(gltfShape)
const transform7 = new Transform({
  position: new Vector3(40, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass6.addComponentOrReplace(transform7)

const bermudaGrass7 = new Entity('bermudaGrass7')
engine.addEntity(bermudaGrass7)
bermudaGrass7.setParent(_scene)
bermudaGrass7.addComponentOrReplace(gltfShape)
const transform8 = new Transform({
  position: new Vector3(8, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass7.addComponentOrReplace(transform8)

const bermudaGrass8 = new Entity('bermudaGrass8')
engine.addEntity(bermudaGrass8)
bermudaGrass8.setParent(_scene)
bermudaGrass8.addComponentOrReplace(gltfShape)
const transform9 = new Transform({
  position: new Vector3(24, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass8.addComponentOrReplace(transform9)

const bermudaGrass9 = new Entity('bermudaGrass9')
engine.addEntity(bermudaGrass9)
bermudaGrass9.setParent(_scene)
bermudaGrass9.addComponentOrReplace(gltfShape)
const transform10 = new Transform({
  position: new Vector3(40, 0, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass9.addComponentOrReplace(transform10)

const spacePodOpenK = new Entity('spacePodOpenK')
engine.addEntity(spacePodOpenK)
spacePodOpenK.setParent(_scene)
const transform11 = new Transform({
  position: new Vector3(12.5, 2.602518081665039, 29.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
spacePodOpenK.addComponentOrReplace(transform11)
const gltfShape2 = new GLTFShape("d5e9ba77-ef33-40e7-aaab-dc25a4f71412/space_pod-open-2k.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
spacePodOpenK.addComponentOrReplace(gltfShape2)
