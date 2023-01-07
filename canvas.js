// =================================================

let config = {
   size: 12,
   color: 'black',
   object: 'brush'
}

let posX = []
let posY = []
let newDraw = false;

// =================================================

window.onload = () => {
   const canvas = document.getElementById('canvas');
   const ctx = canvas.getContext('2d')

   canvas.setAttribute('width', window.innerWidth)
   canvas.setAttribute('height', window.innerHeight)

   canvas.addEventListener('mousedown', (event) => {
      clear()
      canvas.onmousemove = (event) => {
         MousePosRecord(event)
      }
   })

   canvas.addEventListener('mouseup', () => { stopDraw() })

   function clear() { ctx.beginPath() }
   function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height) }


   function MousePosRecord() {
      posX.push(event.clientX);
      posY.push(event.clientY);
      draw(event.clientX, event.clientY)
   }

   function draw(x, y) {
      if (config.object === 'brush') {
         ctx.lineTo(x, y);
         ctx.lineWidth = config.size;
         ctx.stroke();
      } else if (config.object === 'eraser') {
         ctx.strokeStyle = 'white'
         ctx.lineTo(x, y);
         ctx.lineWidth = config.size;
         ctx.stroke();
      }


   }

   function stopDraw() {
      canvas.onmousemove = null;
      posX.push(undefined)
      posY.push(undefined)
   }

   document.addEventListener('keydown', (event) => {
      if (event.code == 'Space') { clearCanvas() }
   })
}


// =================================================

const idSelectObject = document.querySelector('.SelectObject')
const idLineWidth = document.querySelector('.lineWidth')

const idSelectObjectPanel = document.querySelector('.SelectObjectPanel')
const idSelectObjectSelect = document.getElementById('SelectObjectSelect')


const idlineWidthPanel = document.querySelector('.lineWidthPanel')
const idlineWidthRange = document.getElementById('lineWidthRange')
const idlineWidthInput = document.getElementById('lineWidthInput')

idSelectObject.addEventListener('click', () => {
   if (idSelectObjectPanel.style.display === 'none') {
      idSelectObjectPanel.style.display = 'block'
   } else { idSelectObjectPanel.style.display = 'none' }
})

idSelectObjectSelect.addEventListener('change', () => {
   config.object = idSelectObjectSelect.value
})


idLineWidth.addEventListener('click', () => {
   if (idlineWidthPanel.style.display === 'none') {
      idlineWidthPanel.style.display = 'block'
   } else { idlineWidthPanel.style.display = 'none' }

})

idlineWidthRange.addEventListener('change', () => {
   idlineWidthInput.value = idlineWidthRange.value
   config.size = idlineWidthRange.value
})

idlineWidthInput.addEventListener('change', () => {
   idlineWidthRange.value = idlineWidthInput.value
   config.size = idlineWidthInput.value
})



