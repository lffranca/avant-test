import React, { Component } from 'react';
import Infinite from 'react-infinite';
import axios from 'axios';
import { TOKEN_NEWS } from './constants/token-constant';
import { URL_API } from './constants/url-constant';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInfiniteLoading: false,
            items: []
        }
    }

    componentDidMount() {
        this.getItems();
    }

    async getItems() {
        this.setState({
            isInfiniteLoading: true
        });

        axios.get(URL_API, {
            params: {
                sources: 'techcrunch',
                apiKey: TOKEN_NEWS
            }
        })
        .then((result) => {
            this.setState({
                isInfiniteLoading: false
            });

            if(result.data) {
                if(result.data.articles) {
                    this.setState({
                        items: this.state.items.concat(result.data.articles)
                    })
                }
            }
        })
        .catch((error) => {
            this.setState({
                isInfiniteLoading: false
            });

            console.log('[NEW ACITIONS] RESULT NEWS ERROR', error)
        });
    }

    render() {

        console.log(this.state.items);

        const itemsElement = this.state.items.map((elm, index) => {
            return (
                <Card key={index}>
                    <CardMedia
                        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                    >
                        <img src={elm.urlToImage} alt="" />
                    </CardMedia>
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                        <FlatButton label="Action1" />
                        <FlatButton label="Action2" />
                    </CardActions>
                </Card>
            );
        });

        return (
            <div style={{
                height: '100%',
                overflow: 'auto',
            }}>
                <Infinite
                    elementHeight={50}
                    containerHeight={window.innerHeight - 70}
                    infiniteLoadBeginEdgeOffset={1000}
                    onInfiniteLoad={() => this.getItems()}
                    loadingSpinnerDelegate={<div className="loader" key={0}>Loading ...</div>}
                    isInfiniteLoading={this.state.isInfiniteLoading}
                >
                    {itemsElement}
                </Infinite>
            </div>
        );
    }
}

export default News;