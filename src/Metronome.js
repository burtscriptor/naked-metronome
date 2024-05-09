import React, { Component } from 'react';
import './Metronome.css';
import clickStartSound from './sounds/drumsticks.mp3';
import clickSound from './sounds/metronome.mp3';

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4,
        };

        this.clickStart = new Audio(clickStartSound);
        this.click = new Audio(clickSound);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
        this.setState({ bpm });

        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            // set the new BPM and reset beat counter
            this.setState({
                count: 0
            });
        }
    };

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
            this.setState({
                count: 0,
                playing: true
            }, this.playClick);
        }
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;
       

        // Play the appropriate sound based on the boolean flag
        if (count === 0) {
            this.click.play();
        } else {
            this.clickStart.play();
        }

        // keep track of which beat we're on
        this.setState(state => ({
            count: (state.count + 1) % beatsPerMeasure
        
        }));
        console.log(count)
    };

    render() {
        const { playing, bpm } = this.state;

        return (
            <div className="metronome">
                <h1 className='oswald'>Naked Metronome</h1>
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input
                        type="range"
                        min="60"
                        max="130"
                        value={bpm}
                        onChange={this.handleBpmChange}
                    />
                </div>
                <button onClick={this.startStop}>
                    {playing ? 'Stop' : 'Start'}
                </button>
                <div className='information'>
                   
                        <p>Under 70bpm plays click on all counts</p>
                        <p>Over 70pbm plays click on 1st, 2nd and 4th count</p>
                    
                </div>
            </div>
        );
    }
}

export default Metronome;
