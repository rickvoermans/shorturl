const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

const form = new Vue({
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
            s => (s.length <= 5) || 'Slug must be smaller than 6 characters'
        ]
    }),
    methods: {
        submit: () => {
            submitForm(form.url, form.slug)
        }
    }
})

const submitForm = (url, slug) => {
    fetch('http://localhost:1337/urls', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: {
            slug: slug,
            url: url
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}