<template>
           <v-slider 
        style='position: relative; width: 85%; left:1%; top: -.2em;'
        thumb-label="true"
        color="red"
        thumb-color="#14A6BD"
        :thumb-size="32"
        :max="255"
        label="Red"
        :value="colors.rgba.r"
        @input="updateRedSlider"
        ></v-slider>
</template>

<script>
import colorMixin from './colorMixin'

export default {
    mixins: [colorMixin],
    components: {
    },
    data: () => ({

    }),
    methods: {
        childChange (data) {
            this.colorChange(data)
        },
        inputChange (data) {
            if (!data) {
                return
            }
            if (data.hex) {
                this.isValidHex(data.hex) && this.colorChange({
                hex: data.hex,
                source: 'hex'
                })
            } else if (data.r || data.g || data.b || data.a) {
                this.colorChange({
                r: data.r || this.colors.rgba.r,
                g: data.g || this.colors.rgba.g,
                b: data.b || this.colors.rgba.b,
                a: data.a || this.colors.rgba.a,
                source: 'rgba'
                })
            } else if (data.h || data.s || data.l) {
                const s = data.s ? (data.s.replace('%', '') / 100) : this.colors.hsl.s
                const l = data.l ? (data.l.replace('%', '') / 100) : this.colors.hsl.l
                this.colorChange({
                h: data.h || this.colors.hsl.h,
                s,
                l,
                source: 'hsl'
                })
            }
        },
    }
}
</script>

<style>

</style>
