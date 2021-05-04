import { $ } from '../../core/dom'

export function resizeHandler($root, event) {
   if(event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const type = $resizer.data.resize
      
      let value, delta

      // движение мыши в момент mousedown
      document.onmousemove = e => {
         if (type === 'col') {
            delta = e.pageX - coords.right
            value = coords.width + delta + 'px'
            $resizer.css({right: -delta + 'px'})
         } else {
            delta = e.pageY - coords.bottom - window.pageYOffset
            value = coords.height + delta + 'px'
            $resizer.css({bottom: -delta + 'px'})
         }
      }

      // удаление слушателя mousemove
      document.onmouseup = () => {
         document.onmousemove = null
         document.onmouseup = null

         if (type === 'col') {
            $parent.css({width: value})
            $root
               .findAll(`[data-col="${$parent.data.col}"]`)
               .forEach(el => $(el)
               .css({width: value}))

            $resizer.css({
               right: 0,
            })
         } else {
            $parent.css({height: value})
            $resizer.css({
               bottom: 0
            })
         }
         

         
      }
   }
}