import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import FlatList from 'flatlist-react'
import {Card,CardGroup,Carousel,CardDeck} from 'react-bootstrap'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import HorizontalScroll from 'react-scroll-horizontal'


class gaimr extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true, item: null, bgcolor: "#ffc1cc", 
            posts:[],
            streams:[],
            selectedStream:"",
            progress:0,
            x:false
        }
        this.onClick = this.onClick.bind(this)
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

    onClick(){
      this.props.history.push(`/trending`)
    }


    render ()  {
        
        const flexStyle = {
            display: 'flex',
            'flex-wrap': 'nowrap',
            'flex-direction': 'row',
            'height':'auto',
            width: "100%",
            'overflow-x':"scroll",
            padding:'10px'
          };
       
          const question ={
            fontSize: 10,
            color: "white",
            fontWeight: "400",
            padding: 10
          }
        
        let postView=null
        let pollView=null
        let trendings = this.state.posts.map((item) =>
        {
            this.state.x = !this.state.x
            if (item.postType === "text") {
                postView = (
                    <Card bg="light" border="light" style={{ width: '10rem'}} key={item.postId}>
                      <Card.Body>
                      <Card.Text>
                      {item.postContent.text}
                      </Card.Text>
                      </Card.Body>
                    </Card>
              
                )
              }
              if (item.postType === "image") {
                postView = (
                    <Card bg="light" border="light" style={{ width: '10rem'}} key={item.postId}>
                    <Card.Body style={{justifyItems:"center"}}>
                      <Card.Img variant="top" src={item.postContent.image}/>
                      <Card.Text>
                      {item.postContent.text}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              }

              if (item.pollExists) {
                var choices = [];
                var sum = 0;
                for (let i = 0; i < item.poll.choices.length; i++) {
                  let c = item.poll.choices[i];
                  sum += c.votes;
                }
                for (let i = 0; i < item.poll.choices.length; i++) {
                  let choice = item.poll.choices[i];
                  let votePercent = ((choice.votes / sum) * 100).toFixed(2);
                  if (!isNaN(votePercent)) {
                    votePercent += "%"
                  }
                  else {
                    votePercent = "0%"
                  }
                  const voteStyle = {
                    backgroundColor: "#69a2ff",
                    // padding: 10,
                    width: votePercent,
                    height: "100%",
                    float:"left"
                  }
                  choices.push(
                    <div key={choice.choiceNo}>
                        <div style={{ flexDirection: "row",  height: 30, backgroundColor: "white",marginTop:3,width:"100%"}}>
                          <div style={voteStyle}>
                            <div style={{ marginLeft: 5, fontSize: 7, marginTop: 5, fontWeight:"bold"}}>{choice.choice}</div>
                          </div>
                          <div style={{float:"right"}}>
                            <div style={{ fontSize: 7, margin: 5,fontWeight:"bold" }}>{votePercent}</div>
                          </div>
                        </div>
                    </div>
                  )
                }
                
                pollView = (
                  <div style={{ flex: 1 }}>
                    <div style={{ flex: 1, flexDirection: "row"}}>
                      <div style={question}>{item.poll.question}</div>
                    </div>
                    {choices}
                  </div>
                )
              }
              else{
                pollView=null
              }
              // this.setState({
              //   x:!this.state.x
              // })

              // if(this.state.x)
              // return(
              //   <div style={
              //     {
              //       padding: '10px 10px 20px 10px',
              //       border: '1px solid #BFBFBF',
              //       'background-color': 'white',
              //       'box-shadow': '10px 10px 5px #aaaaaa',
              //     },rotate_right
              //   }>{postView}{pollView}</div>
              // )
              // else
              return(
                
                <div>
                  <div style={{'background-color': '#2f2f4a',padding: '20px 20px 20px 20px','box-shadow': '10px 10px 5px #aaaaaa'}}>{postView}{pollView}</div>
                  </div>
              )
        }
        );
        return ( 
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                crossorigin="anonymous"></link>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
            </head>
            <body>
              <img src="/header.PNG" style={{height:"10%",width:"100%"}}>
              </img>
              <div style={{display:"flex",flexDirection:"row"}}>
                <img src="/modules.PNG" style={{height:"10%",width:"92%"}}/>
                <div>
                <img src="/trending.png" style={{cursor:"pointer",height:"20px", width:"30px", border:"1px solid", borderColor:"#D3D3D3",'box-shadow': '1px 1px 1px 0 rgba(0, 0, 0, 0.2)'}} onClick={this.onClick}/>
                </div>
                <img src="/options.PNG" style={{height:"30px",width:"5%"}}/>
              </div>
              <img src="/middle.PNG" style={{height:"320px",width:"100%"}}></img>
            
              <div style={{width:"100%"}}>
                <div class='col-lg-auto' style={flexStyle}>
                  {trendings}
                </div>
              </div> 
    
              <footer style={{position: "fixed",left: 0,bottom: 0}}>
              <img src="/footer.PNG" style={{height:"10%",width:"100%"}}></img>
              </footer> 

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

export default withRouter(gaimr)