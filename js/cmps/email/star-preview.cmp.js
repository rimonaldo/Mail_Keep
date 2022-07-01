import { emailService } from "../../services/email-service/email-service.js";
import emailPreview from "./email-preview.cmp.js";

export default {
    props: [],
    template: `
    <section class="starred-emails">
        <li>
            <div class="filterBy">
                <span @click="filterBy('inbox')">inbox | </span>
                <span @click="filterBy('sent')">sent</span>
            </div>
        </li>
        <email-preview v-if="emailsToShow" :emails="emailsToShow" @remove="removeEmail"/>
    </section>
`,
    data() {
        return {
            emailsToShow: [],
            key: null,
            
        };
    },
    methods: {
        removeEmail(email) {
            console.log(email);
            const key = this.key
            const id = email.id
            console.log('credentials are\n', key, id);
            const idx = this.emailsToShow.findIndex((email) => email.id === id)
            this.emailsToShow.splice(idx, 1)
            this.$emit('remove', { key, id })
        },
        
        filterBy(filter) {
            this.key = filter
            this.emailsToShow = []
            emailService.query(filter)
                .then((emails) => {
                    emails.filter((email) => {
                        if (email.isStarred) {
                            this.emailsToShow.push(email)
                        }
                    })
                    console.log(this.emailsToShow);
                })
        },
    },
    computed: {},
    created() {
        this.key = 'inbox'
        emailService.query('inbox')
            .then((emails) => {
                emails.filter((email) => {
                    if (email.isStarred) {
                        this.emailsToShow.push(email)
                    }
                })
                console.log(this.emailsToShow);
            })
    },
    mounted() { },
    unmounted() { },
    components: {
        emailPreview
    },
}