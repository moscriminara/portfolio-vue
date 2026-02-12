const SourcePage = {
    template: `
        <section class="page">
            <div>
                <h1><br><br>
                    SOURCE
                </h1>
                <a class="content">
                    HTML of this Website
                </a>
            </div>
            <pre class="showHtml">{{ htmlSource }}</pre>
            <div>
                <a class="content">
                    JavaScript source of the weather page
                </a>
            </div>
            <pre class="showHtml">{{ weatherSource }}</pre>
        </section>
    `,
    data() {
        return {
            htmlSource: '',
            weatherSource: ''
        }
    },
    mounted() {
        fetch('./index.html')
            .then(r => r.text())
            .then(t => this.htmlSource = t)

        fetch('./js/weather.js')
            .then(r => r.text())
            .then(t => this.weatherSource = t)
    }
}