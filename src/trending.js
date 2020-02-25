import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import FlatList from 'flatlist-react'
import {Card,CardGroup,Carousel,CardDeck,ListGroup,Nav,Navbar,FormControl,Button,Form} from 'react-bootstrap'
import 'react-animated-slider/build/horizontal.css';
import HorizontalScroll from 'react-scroll-horizontal'

  
class trending extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true, item: null, bgcolor: "#ffc1cc", 
            posts:[],
            streams:[],
            selectedStream:"",
            progress:0,
        }
    }

    componentDidMount()
    {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";   
        axios({
            method: 'get',
            url: proxyurl+'http://gaimr-boot.herokuapp.com/posts/getTrendingPosts?country=',
            headers: {'Content-Type': 'application/json'}
            })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    posts: response.data,
                  }, function () {
                  });
            })
            .catch(function (response) {
                console.log(response);
            });
    }


    render ()  {
        let hashtags=[]
        let hashviews=[]
        {this.state.posts.map((item) =>
        {
            for (let i = 0; i < item.hashtags.length; i++)
                 hashtags.push(item.hashtags[i])
        }
        );
        }
        console.log(hashtags)
        {hashtags.map((item,i) =>
        {
            hashviews.push(<ListGroup.Item style={{borderWidth:2}} key={i}>#{item.tagName}</ListGroup.Item>)
        }
        );}
        return ( 
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                crossorigin="anonymous"></link>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
            </head>
            <body>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Trending Dashboard</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#posts">Posts</Nav.Link>
                    </Nav>
                    <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                    </Form>
            </Navbar>

                <div style={{margin:30}}>
                <Card style={{ width: '18rem'}}>
                    <Card.Header style={{fontWeight:"bold"}}>Trending</Card.Header>
                    <ListGroup variant="flush">
                        {hashviews}
                    </ListGroup>
                </Card>
                </div>
             

                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
                crossorigin="anonymous"></script>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" 
                integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" 
                crossorigin="anonymous"></script>

                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" 
                integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" 
                crossorigin="anonymous"></script>
            </body>
        </html>
      )
    }

}

export default withRouter(trending)