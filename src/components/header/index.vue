<style lang="scss" src="./style.scss"></style>

<template>
    <header class="fe-header" v-fastclick>
        <a class="header-left">
            <slot name="left">
                <i class="fe-header-icon"></i>
            </slot>
        </a>
        <p class="fe-header-title">{{title}}</p>
        <a class="fe-header-button" @click="triggerClick">{{buttonText}}</a>
    </header>
</template>

<script src="./vm.js"></script>
         