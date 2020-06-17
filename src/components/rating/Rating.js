/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/Rating.scss';
import Button from '@material-ui/core/Button';
import fakeItems from '../../lib/fixtures/fkdtCurrentItems2';
import RatingEntry from './RatingEntry';
import Loading from '../auth/Loading';
import RatingSuccessDialog from './RatingSuccessDialog';

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
      ratedVideo: { videoId: '', rating: null }, // Initialize
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

  handleRatingSuccess = () => {
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
    const { nickname } = this.props;
    if (!isLoading) {
      return <Loading />;
    }
    return (
      <>
        <RatingEntry
          video={currentVideo}
          evaluationCount={ratedVideos.length}
          handleRatingUpdate={this.handleRatingUpdate}
          handleRatingSkip={this.handleRatingSkip}
        />
        <RatingSuccessDialog
          isOpen={ratedVideos.length >= 5} // Render this component when isOpen={true}
          nickname={nickname}
          handleRatingSuccess={this.handleRatingSuccess}
        />
      </>
    );
  }
}

export default withRouter(Rating);
