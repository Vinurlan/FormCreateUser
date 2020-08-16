<template>
    <div class="passport">
        <form v-if="loading">
            <label for="fTypeDocument">Тип документа*</label>
            <select type="text" id="fTypeDocument"
                @blur="sendValidInfo('typeDocument')"
                v-model.trim="infoComponent.typeDocument"
                :class="{invalid: ($v.infoComponent.typeDocument.$dirty && $v.infoComponent.typeDocument.$invalid)}"
            >
                <option value="Пасспорт">Пасспорт</option>
                <option value="Свидетельство о рождении">Свидетельство о рождении</option>
                <option value="Вод. удостоверение">Вод. удостоверение</option>
            </select>
            <small class="invalid_description" v-if="$v.infoComponent.typeDocument.$dirty && !$v.infoComponent.typeDocument.required">
                Поле обязательно для заполнения
            </small>

            <label for="fSeriesDocument">Серия</label>
            <input type="text" id="fSeriesDocument"
                @blur="sendValidInfo()"
                v-model.trim="infoComponent.seriesDocument"
                :class="{invalid: $v.infoComponent.seriesDocument.$invalid}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.seriesDocument.$invalid">
                Формат заполнения: ХХ-ХХ
            </small>

            <label for="fNumberDocument">Номер</label>
            <input type="text" id="fNumberDocument"
                @blur="sendValidInfo()"
                v-model.trim="infoComponent.numberDocument"
                :class="{invalid: $v.infoComponent.numberDocument.$invalid}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.numberDocument.$invalid">
                Формат заполнения: ХХXXХХ
            </small>

            <label for="fWhoGot">Кем выдан</label>
            <input type="text" id="fWhoGot"
                @blur="sendValidInfo()"
                v-model.trim="infoComponent.whoGot"
            >

            <label for="fDateGot">Дата выдачи*</label>
            <input type="date" id="fDateGot"
                @blur="sendValidInfo('dateGot')"
                v-model.trim="infoComponent.dateGot"
                :class="{invalid: ($v.infoComponent.dateGot.$dirty && $v.infoComponent.dateGot.$invalid)}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.dateGot.$dirty && $v.infoComponent.dateGot.$invalid">
                <template v-if="!$v.infoComponent.dateGot.required"
                >Поле обязательно для заполнения</template>
                <template v-else-if="!$v.infoComponent.dateGot.maxValue"
                >Вам должно быть более 18-ти лет</template>
                <template v-else
                >Минимальная дата 01.01.1900</template>
            </small>
        </form>
    </div>
</template>

<script>
import {required, alpha, helpers, minLength} from 'vuelidate/lib/validators'
import validateSymbol from '../../mixins/vidateSymbol.mixin'
import generalFunctions from '../../mixins/generalFunctions.mixin'

export default {
    name: 'Passport',
    props: ['info'],
    mixins: [validateSymbol, generalFunctions],
    data() {
        return {
            infoComponent: {
                typeDocument: '',
                seriesDocument: '',
                numberDocument: '',
                whoGot: '',
                dateGot: ''
            },
            loading: false,
        }
    },
    validations: {
        infoComponent: {
            typeDocument: {
                required
            },
            seriesDocument: {
                alpha: helpers.regex('alpha', /^\d{2}-\d{2}$/)
            },
            numberDocument: {
                alpha: helpers.regex('alpha', /^\d{6}$/)
            },
            dateGot: {
                required,
                minValue: value => new Date(value) > new Date('1900-01-01'),
                maxValue: value => new Date(value) < new Date(`
                    ${new Date().getFullYear() - 18}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
            }
        },
    }
}
</script>