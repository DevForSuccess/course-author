import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class SDCProxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const regex = /\d+/;
        let course = window.location.search.match(regex) === null ? 5 : window.location.search.match(regex)[0];
        this.getAuthor(course);
    }

    getAuthor(id = 5) {
        axios.get(`http://localhost:5000/?courseId=${id}`)
            .then((res) => {
                this.setState({
                    author: res.data
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <>
                redirecting ...
            </>
        )
    }
}

ReactDOM.render(<SDCProxy />, document.getElementById('sdc-proxy'));
// ReactDOM.render(
//     <Router>
//         {/* <Route path="/" component={ListingHeader} /> */}
//         <Route path="/?courseId:courseId" component={SDCProxy} />
//     </Router>,
//     document.getElementById('sdc-proxy')
// );
export default SDCProxy;