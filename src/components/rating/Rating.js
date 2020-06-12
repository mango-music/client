/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/Rating.scss';
import { Button } from '@material-ui/core';
import fakeItems from '../../lib/fixtures/fkdtCurrentItems';
import RatingEntry from './RatingEntry';
import Loading from '../auth/Loading';

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
    // Sequential state update using setState callback
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

  handleRatingFinish = (e) => {
    e.preventDefault();
    const { history, callbackPath } = this.props;
    history.push(callbackPath);
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
    if (!isLoading) {
      return <Loading />;
    }
    return (
      <>
        <RatingEntry
          video={currentVideo}
          handleRatingUpdate={this.handleRatingUpdate}
          handleRatingSkip={this.handleRatingSkip}
        />
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
