// import SimpleImageLabel from '../libs/simpleImageLabel'
import SimpleImageLabel from './simpleImageLabel'
// const SimpleImageLabel = require('../libs/simpleImageLabel').default
import img from '../static/1.jpg'
import img2 from '../static/2.jpg'

const preBtn = document.getElementById('pre-btn')
const nextBtn = document.getElementById('next-btn')
const deleteBtn = document.getElementById('delete-btn')
const setNameBtn = document.getElementById('set-name-btn')
const setColorBtn = document.getElementById('set-color-btn')
const defaultCoordEl = document.getElementById('default-coord')
const yoloCoordEl = document.getElementById('yolo-coord')
const readOnlyBtn = document.getElementById('read-only-btn')

const initLabels = [{
  color: 'red',
  height: 0.0105402,
  name: 'SBac',
  width: 0.0105402,
  x: 0.101449,
  y: 0.645586,
},{
  color: 'green',
  height: 0.00922266,
  name: 'SBac',
  width: 0.0105402,
  x: 0.640316,
  y: 0.314229,
},{
  color: 'green',
  height: 0.0131752,
  name: 'SBac',
  width: 0.0118577,
  x: 0.613307,
  y: 0.624506,
},{
  color: 'yellow',
  height: 0.139657,
  name: 'SBac',
  width: 0.252964,
  x: 0.41502,
  y: 0.0764163,
}]


const nextLabels = [{
  x: 0.46949199999999996,
  y: 0.128668,
  width: 0.191526,
  height: 0.202032,
  name: 'Grass Mud Horse',
  color: 'blue'
}, {
  x: 0.7186440000000001,
  y: 0.241535,
  width: 0.15762700000000002,
  height: 0.177201,
  name: 'Grass Mud Horse',
  color: 'blue',
}, {
  x: 0.7406780000000001,
  y: 0.536117,
  width: 0.130508,
  height: 0.173815,
  name: 'Duck',
  color: 'red'
}, {
  x: 0.874576,
  y: 0.481941,
  width: 0.115254,
  height: 0.148984,
  name: 'Duck',
  color: 'red'
}, {
  x: 0.0338983,
  y: 0.574492,
  width: 0.111864,
  height: 0.13544,
  name: 'Duck',
  color: 'red'
}]
let currentLabel = null
const imageLabelContent = new SimpleImageLabel({
  el: 'imageLabelArea',
  imageUrl: "http://localhost:48080/admin-api/infra/file/29/get/detect/T2503221701/source/22c7f4a6336290335b0e1c3ddfcc84fc5182aaa691b248e54b840c258cb30f67.png",
  labels: initLabels,
  height:759,
  width: 759,
  contextmenu: (e) => {

  },
  error: (err) => {
    console.log(err);
  },
  labelClick: (label) => {
    if (!label) {
      clear()
      return
    }
    currentLabel = label
    console.log('Current clicked label : ', label);
    const coord = imageLabelContent.getLabelsCoordinate()
    console.log('All labels coord : ', coord)
    const yoloCoord = imageLabelContent.getLabelsYoloCoordinate()
    console.log('All YOLO coord : ', yoloCoord);

    const currentLabelCoord = imageLabelContent.getCoordinate(label)
    const currentYoloCoord = imageLabelContent.convertToYoloCoordinate(label)
    defaultCoordEl.innerText = '默认坐标：' + JSON.stringify(currentLabelCoord)
    yoloCoordEl.innerText = 'YOLO坐标：' + JSON.stringify(currentYoloCoord)
    deleteBtn.disabled = false
    setNameBtn.disabled = false
    setColorBtn.disabled = false
  },
})

deleteBtn.disabled = true
setNameBtn.disabled = true
setColorBtn.disabled = true

preBtn.style.display = 'none'

nextBtn.onclick = () => {
  setImageAndLabels(img2, nextLabels)
  preBtn.style.display = 'block'
  nextBtn.style.display = 'none'
  clear()
}

preBtn.onclick = () => {
  setImageAndLabels(img, initLabels)
  nextBtn.style.display = 'block'
  preBtn.style.display = 'none'
  clear()
}

deleteBtn.onclick = () => {
  if (currentLabel) {
    imageLabelContent.removeLabelByUuid(currentLabel.uuid)
  }
}

setNameBtn.onclick = () => {
  const name = window.prompt('设置当前label名称')
  if (name) {
    imageLabelContent.setLabelByUuid(currentLabel.uuid, {
      name
    })
  }
}

setColorBtn.onclick = () => {
  const color = window.prompt('设置当前label颜色')
  if (color) {
    imageLabelContent.setLabelByUuid(currentLabel.uuid, {
      color
    })
  }
}

readOnlyBtn.innerText = 'Enable read only'
readOnlyBtn.onclick = () => {
  console.log('imageLabelContent.readOnly', imageLabelContent.readOnly);
  const readOnly = !imageLabelContent.readOnly;
  if (readOnly) {
    readOnlyBtn.innerText = 'Disable read only'
    clear()
  } else {
    readOnlyBtn.innerText = 'Enable read only'
  }
  imageLabelContent.setReadOnly(readOnly)
}

function setImageAndLabels(image, labels) {
  // 重设图片
  imageLabelContent.setImage(image, (err) => {
    console.error(err)
  })
  imageLabelContent.setLabels(labels)
}

function clear() {
  currentLabel = null
  deleteBtn.disabled = true
  setNameBtn.disabled = true
  setColorBtn.disabled = true
  defaultCoordEl.innerText = ''
  yoloCoordEl.innerText = ''
}