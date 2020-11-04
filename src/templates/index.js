const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
const baseUrl = 'http://localhost:1337';

const formData = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () =>  ({
        valid: true,
        url: '',
        urlRules: [
            u => !!u || 'Url is required',
            u => urlRegex.test(u) || 'Not a valid url'
        ],
        slug: '',
        slugRules: [
            s => (s === undefined || s === null || s.length <= 5) || 'Slug must be smaller than 6 characters'
        ],
        snackbar: false,
        text: '',
        timeout: 3500
    }),
    methods: {
        submit () {
            submitForm(formData.url, formData.slug);
        },
        success () {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.snackbar = true;
        },
        fail () {
            this.snackbar = true
        }
    }
});

const submitForm = (url, slug) => {
    let body = JSON.stringify({url, slug});

    if (slug === undefined || slug.trim() === '') {
        body = JSON.stringify({url});
    }

    fetch(baseUrl + '/urls', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: body
    })
    .then(res => {
        if (res.status === 200) {
            res.text().then((data) => {
                newData = JSON.parse(data);
                formData.text = `Link succesfull created: ${baseUrl + '/' + JSON.parse(data).slug}`;
                formData.success();
            });    
        } else {
            formData.text = `Something went wrong... ${res.status}`
            formData.fail();
        }
    })
    .catch(err => console.log(err));
}