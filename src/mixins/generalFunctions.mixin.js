export default {
    methods: {
        setInputs() {
            let name = this.getNameComponentLC()

            if (this.info[name] != null) {
                for (let paragraph in this.info[name]) {
                    this.infoComponent[paragraph] = this.info[name][paragraph]
                }
            }
            
            this.loading = true
        },
        sendValidInfo(target) {
            if (target == null) {
                this.sendInfo()
                return
            }
            if (this.$v.$invalid) {
                this.$v.infoComponent[target].$touch()
                return
            }

            this.sendInfo()
        },
        sendInfo() {    
            this.$emit('sendinfo', this.getNameComponentLC(), this.infoComponent)
        },
        getNameComponentLC() {
            return this.$options.name.toLowerCase() || 'other'
        },
        
        checkInvalidAll() {
            if (this.$v.$invalid) this.$v.$touch()
            return this.$v.$invalid
        }
    },
    mounted() {
        this.setInputs()
        this.sendInfo()
    }
}