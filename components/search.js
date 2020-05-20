import Style from './search.module.css';
import Form from 'react-bootstrap/Form';
import fetch from 'node-fetch'
import didYouMean from 'didyoumean';
didYouMean.threshold = 0.1;


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.server = props.server;
        this.series = [];
        this.movies = [];
        this.enabled = props.searchEnabled;
        this.search = this.search.bind(this);
        if (this.enabled) {
            this.getAllContent();
        }
        this.onSearch = props.onSearch;
    }

    /**
     * This is used to get all the movies/series from the server
     */
    getAllContent() {
        fetch(`http://${this.server.server_ip}:4000/api/list`)
        .then(r => r.json())
        .then(content => {
            this.series = content.series;
            this.movies = content.movies;
        })
    }

    search(event) {
        let query = event.target.value;
        if (query === "") {
            this.onSearch([]);
            return;
        }
        let found = [];
        for (let movie of this.movies) {
            if (movie.title.toLowerCase().includes(query)) {
                found.push(movie);
            }
        }
        for (let serie of this.series) {
            if (serie.title.toLowerCase().includes(quer)) {
                found.push(serie);
            }
        }
        /*
        if (found.length === 0) {
            let didYouMeanResult = didYouMean(query, this.movies, 'title');
            if (didYouMeanResult != null) {
                found.push(didYouMeanResult);
            }
        }
        */
       this.onSearch(found);
    }

    render() {
        return (
            <Form className={Style.searchForm}>
                <Form.Control onChange={this.search} type="text" placeholder="Sök.." />
            </Form>
        )
    }
}