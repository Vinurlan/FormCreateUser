<template>
    <div class="form_create_user">
        <div class="form_create_user__indicators">
            <div
                v-for="(i, index) of indicators"
                :key="index"
                :class="{indicatorCurr: currNumPage >= i.num}"
            ></div>
        </div>
        <component class="form_create_user__pages"
            ref="pageComponent" 
            :is="currPage" 
            :info="allInfo" 
            @sendinfo="setInfo"
        ></component>
        <div class="form_create_user__buttons">
            <button v-if="buttonNext" @click="nextPage">Вперёд</button>
            <button v-else type="submit" @click.prevent="createPerson">Создать</button>
            <button v-if="buttonPrev" @click="prevPage">Назад</button>
        </div>
    </div>
</template>

<script>
import Person from './FromCreateUsers/Person'
import Adress from './FromCreateUsers/Adress'
import Passport from './FromCreateUsers/Passport'

export default {
    name: 'FormCreateUser',
    data() {
        return {
            pages: {Person, Adress, Passport},
            pagesName: [],
            indicators: [],
            currNumPage: 0,
            allInfo: null
        }
    },
    computed: {
        currPage() {
            return this.pages[this.pagesName[this.currNumPage]]
        },
        buttonPrev() {
            return this.currNumPage > 0
        },
        buttonNext() {
            return this.currNumPage < this.pagesName.length - 1
        }
    },
    methods: {
        initPagesName() {
            this.pagesName = Object.keys(this.pages)
        },
        nextPage() {
            if (this.$refs.pageComponent.checkInvalidAll()) return
            if (this.currNumPage >= this.pagesName.length - 1) return
            this.currNumPage++
        },
        prevPage() {
            if (this.currNumPage <= 0) return
            this.currNumPage--
        },
        createPerson(event) {
            if (this.$refs.pageComponent.checkInvalidAll()) return

            event.target.disabled = true
            setTimeout(() => {
                this.allInfo = {}
                this.writeInLocalStorage('allInfo', this.allInfo)
                this.currNumPage = 0
                this.$emit('success')
                event.target.disabled = false
            }, 1000)
        },

        initAllInfo() {
            this.allInfo = this.getFromLocalStorage('allInfo')
        },
        setInfo(name, info) {
            this.allInfo[name] = info
            this.writeInLocalStorage('allInfo', this.allInfo)
        },

        writeInLocalStorage(key, info) {
            let jsonInfo = JSON.stringify(info)
            localStorage.setItem(key, jsonInfo)
        },
        getFromLocalStorage(key) {
            try {
                let jsonInfo = localStorage.getItem(key)
                if (jsonInfo == null) return {}
                return JSON.parse(jsonInfo)
            } catch(error) {
                if (localStorage.getItem(key)) {
                    localStorage.removeItem(key)
                }
                console.error(error)
            }

        },

        initIndicators() {
            for (let i = 0; i < this.pagesName.length; i++) {
                this.indicators.push({
                    num: i
                })
            }
        },
    },
    mounted() {
        this.initPagesName()
        this.initAllInfo()
        this.initIndicators()
    }
}
</script>

<style lang="scss">
$sizeInput: 12pt;
@mixin flex($dir: row, $js: center, $ac: center) {
    display: flex;
    flex-direction: $dir;
    justify-content: $js;
    align-items: $ac;
}

.form_create_user {
    @include flex(column, space-between);
    margin: auto;
    width: 800px;
    min-height: 740px;
    border-radius: 10px;
    background-color: #fff;

    &__pages form {
        @include flex(column, center, flex-start);
        width: 300px;
    }

    &__pages label {
        align-self: flex-start;
        margin-top: 1em;
        font-size: 14pt;
    }

    &__pages input {
        font-family: Roboto, Helvetica, Arial, sans-serif;
    }

    &__pages input[type="text"],
    &__pages input[type="date"],
    &__pages select {
        font-size: $sizeInput;
        width: 100%;
        border: 1px solid #5E4C4C;
        border-radius: 6px;
    }

    &__pages label[name="fSex"] {
        font-size: $sizeInput - 1;
    }

    &__pages #labelPhone {
        font-size: $sizeInput;
        margin-top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        input {
            width: 100%;
            margin-left: 10px;
        }
    }

    &__indicators {
        margin-top: 30px;
        width: 100px;
        display: flex;
        justify-content: space-evenly;
    }

    &__indicators > * {
        background: #756b6b;
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .indicatorCurr {
        background: #BAA8A8;
    }
    .indicatorError {
        background: #FF2E2E;
    }

    &__buttons {
        @include flex(row, space-between, center);
        width: 300px;
        margin-bottom: 40px;
    }
    
    &__buttons button {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 12pt;
        width: 100px;
        height: 30px;
        background: #E6D4D4;
        border: none;
        border-radius: 6px;
    }
    &__buttons button:hover {
        background: #FBEEEE;
    }
    &__buttons button:focus {
        outline-color: #644f4f;
    }
}

.invalid {
    background-color: rgb(255, 221, 221);
}

.invalid_description {
    color: red;
}

</style>