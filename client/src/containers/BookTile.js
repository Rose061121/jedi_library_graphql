import React from 'react'
import BookDetails from '../components/book/BookDetails'
import BookCover from '../components/book/BookCover'


export default class BookTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            flipping: false
        };

    }

    doneFlipping = () => {
        this.setState({
            flipping: false
        })
    }

    flip = () => {
        if (this.state.flipped === false) {
            this.setState({
                flipped: true,
                flipping: true
            });

        } else {
            this.setState({
                flipped: false,
            })
            setTimeout(this.doneFlipping, 1000);
        }
    }

    render() {
        console.log(this.props)
        const styles = {
            container: {
                width: 100,
                height: 100,
                perspective: 1000,
                display: 'block',
                position: 'absolute',
                float: 'left',
                marginRight: 5,
                zIndex: 1
            },
            containerFlip: {
                width: 100,
                height: 100,
                perspective: 1000,
                display: 'block',
                position: 'absolute',
                float: 'left',
                marginRight: 5,
                zIndex: 10000,
            },
            tile: {
                height: '100%',
                position: 'absolute',
                transition: 'all 1s ease-in-out',
                width: '100%',
                transformStyle: 'preserve-3d',
            },
            tileFlip: {
                height: '100%',
                position: 'absolute',
                transition: 'all 1s ease-in-out',
                width: '100%',
                transformStyle: 'preserve-3d',
                transform: 'scale3d(4,4,4)'
            },
            tileFront: {
                transition: 'all 1s ease-in-out',
                backfaceVisibility: 'hidden',
            },
            tileFrontFlip: {
                transition: 'all 1s ease-in-out',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
            },
            tileBack: {
                backfaceVisibility: 'hidden',
                position: 'absolute',
                top: 5,
                transformStyle: 'preserve-3d',
                transform: 'rotateY(180deg)',
                transition: 'all 1s ease-in-out',

            },
            tileBackFlip: {
                transform: 'rotateY(360deg)',
                transition: 'all 1s ease-in-out',
                backgroundColor: 'white',
                backfaceVisibility: 'hidden',
                position: 'absolute',
                top: 5,
                height: 100,
                width: 100,
            }
        }

        return (
            <div onClick={this.flip} style={this.state.flipping ? styles.containerFlip : styles.container} ref={c => this.container = c}>
                <div style={this.state.flipped ? styles.tileFlip : styles.tile}>
                    <div style={this.state.flipped ? styles.tileFrontFlip : styles.tileFront}>
                        <BookCover book={this.props.book} />
                    </div>
                        <div style={this.state.flipped ? styles.tileBackFlip : styles.tileBack}>
                            <BookDetails book={this.props.book} />
                        </div>
                </div>
            </div>
        );
    }
}