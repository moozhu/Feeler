

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            default: ''
        }
    },
    methods: {
        triggerClick() {
            this.$emit('click');
        }
    }
};