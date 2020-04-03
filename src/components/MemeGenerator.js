import React from 'react'

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(jsonRes => {
            const {memes} = jsonRes.data;
            this.setState({allMemeImages: memes});
            console.log(this.state.allMemeImages);
        })
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const random = Math.floor(Math.random() * this.state.allMemeImages.length) + 1;
        const randomMemeImage = this.state.allMemeImages[random].url;
        this.setState({ randomImage: randomMemeImage});
    }

    render() {
        return (
            <div>
                <form className="meme-form"  onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText" 
                        value={this.state.topText}
                        placeholder="Top Text here"
                        onChange={this.handleChange}
                    />

                    <input 
                        type="text"
                        name="bottomText" 
                        value={this.state.bottomText}
                        placeholder="Bottom Text here"
                        onChange={this.handleChange}
                    />

                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImage} alt="Meme"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;