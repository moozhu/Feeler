<template>
    <div>
        <transition :name="routerDirection">
            <router-view class="page"></router-view>
        </transition>
    </div>
</template>

<script src="./vm.js"></script>