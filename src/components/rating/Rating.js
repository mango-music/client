/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/Rating.scss';
import { Button } from '@material-ui/core';
import fakeItems from '../../lib/fixtures/fkdtCurrentItems';
import RatingEntry from './RatingEntry';

class Rating extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      videos: [],
      currentVideo: {},
      nextVideoIndex: 0,
      ratedVideos: [],
      ratedVideo: {
        videoId: '',
        rating: null,
      },
    };
  }

  handleRatingUpdate = (videoId, rating) => {
    // 콜백을 이용한 순차적 setState
    this.setState((prev) => ({
      ratedVideo: { videoId, rating },
      nextVideoIndex: prev.nextVideoIndex + 1,
    }));
    this.setState((prev) => ({
      ratedVideos: [...prev.ratedVideos, prev.ratedVideo],
      ratedVideo: { videoId: '', rating: null }, // initialize
      currentVideo: prev.videos[prev.nextVideoIndex],
    }));
  };

  handleRatingSkip = () => {
    this.setState((prev) => ({
      nextVideoIndex: prev.nextVideoIndex + 1,
    }));
    this.setState((prev) => ({
      currentVideo: prev.videos[prev.nextVideoIndex],
    }));
  };

  handleRatingFinish = () => {
    const { history, profile } = this.props;
    history.push(`/@${profile.id}`);
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
      videos: fakeItems,
      currentVideo: fakeItems[0],
    });
  }

  componentDidUpdate() {
    console.log('Rating Component Did Update');
  }

  componentWillUnmount() {
    console.log('Rating Component Unmounted');
  }

  render() {
    const { isLoading, currentVideo, ratedVideos } = this.state;
    return (
      <>
        {isLoading ? (
          <>
            <RatingEntry
              video={currentVideo}
              handleRatingUpdate={this.handleRatingUpdate}
              handleSkip={this.handleRatingSkip}
            />
          </>
        ) : (
          <h3>Loading...</h3>
        )}
        {ratedVideos.length >= 5 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRatingFinish}
          >
            시작하기
          </Button>
        ) : null}
      </>
    );
  }
}

export default withRouter(Rating);
