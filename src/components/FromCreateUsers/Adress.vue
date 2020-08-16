<template>
    <div class="adress">
        <form v-if="loading">
            <label for="fIndexRegion">Индекс</label>
            <input type="text" id="fIndexRegion" 
                @blur="sendValidInfo()"
                @keydown="validateNumberInput"
                v-model.trim="infoComponent.indexRegion"
                :class="{invalid: $v.infoComponent.indexRegion.$invalid}"
            >
            <small class="invalid_description" v-if="!$v.infoComponent.indexRegion.minLength">
                Минимальна длина поля 6
            </small>

            <label for="fCountry">Страна</label>
            <input type="text" id="fCountry" 
                v-model.trim="infoComponent.country" 
                @blur="sendValidInfo()"
                :class="{invalid: $v.infoComponent.country.$invalid}"
            >
            <small class="invalid_description" v-if="!$v.infoComponent.country.alpha">
                Поле должно содержать только кириллицу
            </small>

            <label for="fRegion">Область</label>
            <input type="text" id="fRegion" 
                v-model.trim="infoComponent.region" 
                @blur="sendValidInfo()"
                :class="{invalid: $v.infoComponent.region.$invalid}"
            >
            <small class="invalid_description" v-if="!$v.infoComponent.region.alpha">
                Поле должно содержать только кириллицу
            </small>

            <label for="fCity">Город*</label>
            <input type="text" id="fCity" 
                @blur="sendValidInfo('city')"
                v-model.trim="infoComponent.city"
                :class="{invalid: ($v.infoComponent.city.$dirty && $v.infoComponent.city.$invalid)}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.city.$dirty && $v.infoComponent.city.$invalid">
                <template v-if="!$v.infoComponent.city.required"
                >Поле обязательно для заполнения</template>
                <template v-else-if="!$v.infoComponent.city.alpha"
                >Поле должно содержать только кириллицу</template>
                <template v-else
                >Минимальна длина поля 3</template>
            </small>

            <label for="fStreet">Улица</label>
            <input type="text" id="fStreet" 
                v-model.trim="infoComponent.street" 
                @blur="sendValidInfo()"
                :class="{invalid: ($v.infoComponent.street.$dirty && $v.infoComponent.street.$invalid)}"
            >
            <small class="invalid_description" v-if="!$v.infoComponent.street.alpha">
                Поле должно содержать только кириллицу и цифры
            </small>

            <label for="fHouse">Дом</label>
            <input type="text" id="fHouse"
                @blur="sendValidInfo()"
                v-model.trim="infoComponent.house"
            >
        </form>
    </div>
</template>

<script>
import {required, alpha, helpers, minLength} from 'vuelidate/lib/validators'
import validateSymbol from '../../mixins/vidateSymbol.mixin'
import generalFunctions from '../../mixins/generalFunctions.mixin'

export default {
    name: 'Adress',
    props: ['info'],
    mixins: [validateSymbol, generalFunctions],
    data() {
        return {
            infoComponent: {
                indexRegion: '',
                country: '',
                region: '',
                city: '',
                street: '',
                house: ''
            },
            loading: false,
        }
    },
    validations: {
        infoComponent: {
            indexRegion: {
                minLength: minLength(6)
            },
            country: {
                alpha: helpers.regex('alpha', /^[а-яё\s-]*$/i)
            },
            region: {
                alpha: helpers.regex('alpha', /^[а-яё\s-]*$/i)
            },
            city: {
                required,
                minLength: minLength(3),
                alpha: helpers.regex('alpha', /^[а-яё\s-]*$/i)
            },
            street: {
                alpha: helpers.regex('alpha', /^[а-яё\s0-9-]*$/i)
            },
        }
    }
}
</script>