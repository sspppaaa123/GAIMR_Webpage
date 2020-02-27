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
            countries:[],
            selectedCountry:'All countries',
            selectedStream:'',
            progress:0,
            country_code:'',
            hashviews:[],
            hashtags:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeStreams = this.handleChangeStreams.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount()
    {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";   
        axios({
            method: 'get',
            url: proxyurl+'http://gaimr-boot.herokuapp.com/posts/getTrendingTopics?country='+this.state.country_code+'&stream='+this.state.selectedStream,
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
        axios({
            method: 'get',
            url: proxyurl+'http://gaimr-boot.herokuapp.com/streams',
            headers: {'Content-Type': 'application/json'}
            })
            .then((response) => {
                    console.log(response.data);
                    this.setState({
                        streams: response.data,
                      }, function () {
                      });
            })
            .catch(function (response) {
                    console.log(response);
            });

        axios({
                method: 'get',
                url: proxyurl+'http://gaimr-boot.herokuapp.com/posts/getCountries',
                headers: {'Content-Type': 'application/json'}
                })
                    .then((response) => {
                        console.log(response.data);
                        this.setState({
                            countries: response.data,
                          }, function () {
                          });
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
    }

    handleChange(event) {
        if (event.target.value === "All")
        this.setState({
            selectedCountry: event.target.value,
            country_code : ''
        });

        else
        {
        var record = this.state.countries.filter(function (e) {
            return e.country == event.target.value;
        });
    
        this.setState({
            selectedCountry: event.target.value,
            country_code : record[0].countryCode
        });
        }
      }


    handleChangeStreams(event) {
        if (event.target.value === "All")
        this.setState({
            selectedStream : ''
        });

        else
        {
        this.setState({
            selectedStream :  event.target.value
        });
        }
      }

      setVariables(){
       
      }

    
    onClick(){

        const proxyurl = "https://cors-anywhere.herokuapp.com/";   
        axios({
            method: 'get',
            url: proxyurl+'http://gaimr-boot.herokuapp.com/posts/getTrendingTopics?country='+this.state.country_code+'&stream='+this.state.selectedStream,
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

        var hashtags =[]
        var hashviews=[]
        {this.state.posts.map((item) =>{hashtags.push(item.tagName)});}
        {hashtags.map((item,i) =>{hashviews.push(<ListGroup.Item style={{borderWidth:2}} key={i}>#{item}</ListGroup.Item>)});}
        this.state.hashtags=hashtags
    }
  

    render ()  {

        var hashtags =[]
        var hashviews=[]
        {this.state.posts.map((item) =>{hashtags.push(item.tagName)});}
        {hashtags.map((item,i) =>{hashviews.push(<ListGroup.Item style={{borderWidth:2}} key={i}>#{item}</ListGroup.Item>)});}

        let streamOptions = this.state.streams.map((item) =>
        <option key={item.streamName}>{item.streamName}</option>);

        let countryOptions = this.state.countries.map((item) =>
        <option key={item.country}>{item.country}</option>);

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
                <br/>

            
                <select class="custom-select" value={this.state.value} style={{width:"30%", margin:20}} onChange={this.handleChange.bind(this)}> 
                <option defaultSelected>Select the Country</option>
                <option>All</option>
                    {countryOptions}
                </select>

                <select class="custom-select" value={this.state.value} style={{width:"30%", margin:20}} onChange={this.handleChangeStreams.bind(this)}>
                <option defaultSelected>Select the Stream</option>
                    {streamOptions}
                </select>

                <button type="button" class="btn btn-primary btn-lg" style={{marginLeft:10}} onClick={this.onClick.bind(this)}>Show Trending</button>


                <div style={{margin:30}}>
                <Card style={{ width: '30rem'}}>
                    <Card.Header style={{fontWeight:"bold"}}>Trending {this.state.selectedStream} in {this.state.selectedCountry}</Card.Header>
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