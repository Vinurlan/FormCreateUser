<template>
    <div class="modal_successful">
        <div class="modal_successful__window">
            <button class="modal_successful__btn_close" @click="$emit('close')">&times;</button>
            <h3 class="modal_successful__text">Пользователь успешно создан</h3>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.modal_successful {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.219);
    display: flex;
    justify-content: center;
    align-items: center;

    &__window {
        position: relative;
        width: 300px;
        height: 100px;
        background: #fff;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__btn_close {
        position: absolute;
        top: 10px;
        right: 10px;
        border: none;
        border-radius: 50%;
        background-color: #E6D4D4;
        color: #000;
        font-size: 12pt;
    }
    &__btn_close:hover {
        background-color: #FBEEEE;
    }
}

</style>