import React, { Component } from 'react';

class MemeGenerator extends Component{
   constructor(){
       super()
       this.state = {
             topText:'',
             bottomText:'',
             randomImage:'http://i.imgflip.com/1bij.jpg',
             allMemeImgs:[]
             
       }
       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
   }

   async componentDidMount(){
         const res = await fetch('https://api.imgflip.com/get_memes')
         const pack = await res.json()
         const {memes} = pack.data
         this.setState({
            allMemeImgs:memes
         })
   }

   handleChange(e){
       const {name, value} = e.target
       this.setState({
           [name]:value
       })
   }

   handleSubmit(e){
       e.preventDefault()
       const randMemeImg = this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)]
       this.setState({
        randomImage: randMemeImg.url
       })
   }

 
    render() {
        return(
            <div>
               <form className="form"  onSubmit={this.handleSubmit}>  
                   <input 
                      type="text"
                      value={this.state.topText}
                      name="topText"
                      placeholder='Top text here'
                      onChange={this.handleChange}
                   />
                   <br />
                   <input 
                      type="text"
                      value={this.state.bottomText}
                      name="bottomText"
                      placeholder='Top text here'
                      onChange={this.handleChange}
                   />
                   <br />
                   <button>Gen</button>
               </form>
               
               <div className="meme-container">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className='top_text'>{this.state.topText}</h2>
                    <h2 className='bottom_text'>{this.state.bottomText}</h2>
                </div>
            </div> 
        )
    }
}

export default MemeGenerator