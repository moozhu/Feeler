<style lang="scss" src="./style.scss"></style>

<template>
    <transition name="message-box">
        <div id="message-box-wrap" v-fastclick v-show="show">
            <div id="message-box">
                <div id="message-box-title">{{title}}</div>
                <div id="message-box-body">
                    <span class="message-box-body-msg" v-html="message"></span>
                </div>
                <div id="message-box-footer">
                    <button id="msg-cancel" class="message-box-btn slave" v-show="type == 'confirm' || type == 'prompt'">{{buttonText.cancel}}</button>
                    <button id="msg-ok" class="message-box-btn primary" v-show="type">{{buttonText.ok}}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script src="./vm.js"></script>