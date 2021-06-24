import Style from './search.module.css';
import Form from 'react-bootstrap/Form';
import fetch from 'node-fetch'
import validateServerAccess from '../lib/validateServerAccess';
import didYouMean from 'didyoumean';
didYouMean.threshold = 0.1;


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.server = props.server;
        this.serverToken = props.serverToken;
        this.series = [];
        this.movies = [];
        this.enabled = props.searchEnabled;
        this.search = this.search.bind(this);
        this.onClose = props.onClose;
        this.onSearch = props.onSearch;
        this.dataDownloaded = false;
    }

    /**
     * This is used to get all the movies/series from the server
     */
    getAllContent() {
        validateServerAccess(this.server, (serverToken) => {
            fetch(`${this.server.server_ip}/api/list?token=${serverToken}`)
            .then(r => r.json())
            .then(content => {
                this.series = content.series;
                this.movies = content.movies;
            });
        });
    }

    search(event) {
        if (!this.dataDownloaded && this.enabled) {
            this.getAllContent();
            this.dataDownloaded = true;
        }
        let query = event.target.value;
        if (query === "") {
            this.onClose();
            //this.onSearch([]);
            return;
        }
        let found = [];
        for (let movie of this.movies) {
            if (movie.title.toLowerCase().includes(query.toLowerCase())) {
                movie.type = 'movie'
                found.push(movie);
            }
        }
        for (let serie of this.series) {
            if (serie.title.toLowerCase().includes(query.toLowerCase())) {
                serie.type = 'serie';
                found.push(serie);
            }
        }
        console.log(found);
       this.onSearch(found);
    }

    render() {
        return (
            <Form autoComplete="off" className={Style.searchForm}>
                <Form.Control onInput={this.search} type="text" placeholder="Sök.." />
            </Form>
        )
    }
}