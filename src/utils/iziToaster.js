import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

iziToast.settings({
  pauseOnHover: true,
  timeout: 3000,
  progressBar: true,
  layout: 2,
  position: 'bottomCenter',
  transitionIn: 'bounceInDown',
  transitionOut: 'fadeOut',
  transitionInMobile: 'fadeInUp',
  transitionOutMobile: 'fadeOutDown'
})

// use in component
// this.$iziToast.info({
//   title: 'It',
//   message: 'works! :)'
// })
// in js file
// iziToast.error({ message: 'ERROR' })

export default iziToast
