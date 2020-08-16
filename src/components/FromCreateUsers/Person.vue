<template>
    <div class="person">
        <form v-if="loading">
            <label for="fSecondName">Фамилия*</label>
            <input type="text" id="fSecondName" 
                @blur="sendValidInfo('secondName')"
                v-model.trim="infoComponent.secondName"
                :class="{invalid: ($v.infoComponent.secondName.$dirty && $v.infoComponent.secondName.$invalid)}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.secondName.$dirty && $v.infoComponent.secondName.$invalid">
                <template v-if="!$v.infoComponent.secondName.required"
                >Поле обязательно для заполнения</template>
                <template v-else-if="!$v.infoComponent.secondName.alpha"
                >Поле должно содержать только кириллицу</template>
                <template v-else
                >Минимальна длина поля 3</template>
            </small>

            <label for="fFirstName">Имя*</label>
            <input type="text" id="fFirstName" 
                @blur="sendValidInfo('firstName')"
                v-model.trim="infoComponent.firstName" 
                :class="{invalid: ($v.infoComponent.firstName.$dirty && $v.infoComponent.firstName.$invalid)}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.firstName.$dirty && $v.infoComponent.firstName.$invalid">
                <template v-if="!$v.infoComponent.firstName.required"
                >Поле обязательно для заполнения</template>
                <template v-else-if="!$v.infoComponent.firstName.alpha"
                >Поле должно содержать только кириллицу</template>
                <template v-else
                >Минимальна длина поля 3</template>
            </small>

            <label for="fLastName">Отчество</label>
            <input type="text" id="fLastName" 
                @blur="sendValidInfo('lastName')"
                v-model.trim="infoComponent.lastName"
                :class="{invalid: ($v.infoComponent.lastName.$invalid)}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.lastName.$invalid">
                <template v-if="!$v.infoComponent.lastName.minLength"
                >Минимальна длина поля 3</template>
                <template v-else
                >Поле должно содержать только кириллицу</template>
            </small>

            <label for="fDate">Дата рождения*</label>
            <input type="date" id="fDate"
                @blur="sendValidInfo('date')"
                v-model.trim="infoComponent.date" 
                :class="{invalid: ($v.infoComponent.date.$dirty && $v.infoComponent.date.$invalid)}"
            >
            <small class="invalid_description" v-if="$v.infoComponent.date.$dirty && $v.infoComponent.date.$invalid">
                <template v-if="!$v.infoComponent.date.required"
                >Поле обязательно для заполнения</template>
                <template v-else-if="!$v.infoComponent.date.maxValue"
                >Вам должно быть более 18-ти лет</template>
                <template v-else
                >Минимальная дата 01.01.1900</template>
            </small>

            <label for="fPhone">Номер телефона*</label>
            <label for="fPhone" id="labelPhone"><span>+7</span>
                <input type="text" id="fPhone"
                    @blur="sendValidInfo('phone')"
                    @keydown="validateNumberInput"
                    v-model.trim="infoComponent.phone"
                    maxlength="10"
                    :class="{invalid: ($v.infoComponent.phone.$dirty && $v.infoComponent.phone.$invalid)}"
                >
            </label>
            <small class="invalid_description" v-if="$v.infoComponent.phone.$dirty && $v.infoComponent.phone.$invalid">
                <template v-if="!$v.infoComponent.phone.required"
                >Поле обязательно для заполнения</template>
                <template v-else
                >Длина поля 10 цифр</template>
            </small>

            <label>Пол: 
                <label name="fSex">
                <input type="radio" id="fSexMan" value="мужчина" v-model.trim="infoComponent.sex" @blur="sendInfo">Мужчина </label>
                <label name="fSex">
                <input type="radio" id="fSexHuman" value="женщина" v-model.trim="infoComponent.sex" @blur="sendInfo">Женщина </label>
                <label name="fSex">
                <input type="radio" id="fSexOther" value="другой" v-model.trim="infoComponent.sex" @blur="sendInfo">Другой </label>
            </label>

            <label for="fGroupClients">Группа клиентов*</label>
            <select name="fGroupClients" id="fGroupClients" 
                multiple 
                v-model.trim="infoComponent.group" 
                @blur="sendValidInfo('group')"
                :class="{invalid: ($v.infoComponent.group.$dirty && $v.infoComponent.group.$invalid)}"
            >
                <option value="VIP">VIP</option>
                <option value="Проблемные">Проблемные</option>
                <option value="ОМС">ОМС</option>
            </select>
            <small class="invalid_description" v-if="$v.infoComponent.group.$dirty && !$v.infoComponent.group.required"
            >Поле обязательно для заполнения</small>
            <small v-else
            >Можно выбрать несколько путктов</small>

            <label for="fDoctor">Лечащий врач</label>
            <select name="fDoctor" id="fDoctor"
                @blur="sendValidInfo()"
                v-model.trim="infoComponent.doctor"
            >
                <option value=""></option>
                <option value="Иванов">Иванов</option>
                <option value="Захаров">Захаров</option>
                <option value="Чернышева">Чернышева</option>
            </select>

            <label for="fMessage">Не отправлять СМС
                <input type="checkbox" id="fMessage"
                    @blur="sendValidInfo()"
                    v-model.trim="infoComponent.message"
                >
            </label>
        </form>
    </div>
</template>

<script>
import {required, minLength, maxLength, alpha, minValue, maxValue, helpers} from 'vuelidate/lib/validators'
import validateSymbol from '../../mixins/vidateSymbol.mixin'
import generalFunctions from '../../mixins/generalFunctions.mixin'

export default {
    name: 'Person',
    props: ['info'],
    mixins: [validateSymbol, generalFunctions],
    data() {
        return {
            infoComponent: {
                firstName: '',
                secondName: '',
                lastName: '',
                date: '',
                phone: '',
                sex: '',
                group: [],
                doctor: '',
                message: false,
            },      
            loading: false,
        }
    },
    validations: {
        infoComponent: {
            firstName: {
                required,
                minLength: minLength(3),
                alpha: helpers.regex('alpha', /^[а-яё]*$/i)
            },
            secondName: {
                required,
                minLength: minLength(3),
                alpha: helpers.regex('alpha', /^[а-яё]*$/i)
            },
            lastName: {
                minLength: minLength(3),
                alpha: helpers.regex('alpha', /^[а-яё]*$/i)
            },
            date: {
                required,
                minValue: value => new Date(value) > new Date('1900-01-01'),
                maxValue: value => new Date(value) < new Date(`
                    ${new Date().getFullYear() - 18}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
            },
            phone: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(10)
            },
            group: {
                required
            }
        }
    }
}
</script>