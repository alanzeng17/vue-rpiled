import Api from '@/services/Api'

export default {
  triggerRainbowStrip() {
    return Api().post('animations/rainbowStrip')
  }
}
