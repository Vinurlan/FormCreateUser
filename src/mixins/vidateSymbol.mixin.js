export default {
    methods: {
        validateNumberInput(event) {
            if (event.key == null) return
            if (!event.key.match(/[0-9]|(Backspace)|(Tab)/))
                event.preventDefault()
        }
    }
}