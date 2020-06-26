/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
// import '../../styles/rating.scss';
import RatingEntry from './RatingEntry';
import Loading from '../auth/Loading';
import RatingSuccessDialog from './RatingSuccessDialog';
import { samples } from '../../lib/fixtures/sample';
import postRatingMusiclist from '../../lib/apis/postRatingMusiclist';

const initialValues = {
  title: '',
  thumbnail: '',
  videoid: '',
  rating: null,
};

class Rating extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      videos: [],
      currentVideo: {},
      nextVideoIndex: 0,
      ratedVideos: [],
      ratedVideo: initialValues,
    };
  }

  handleRatingUpdate = (video, rating) => {
    // Sequential state update using setState callback
    this.setState((prev) => ({
      ratedVideo: { ...video, rating },
      nextVideoIndex: prev.nextVideoIndex + 1,
    }));
    this.setState((prev) => ({
      ratedVideos: [...prev.ratedVideos, prev.ratedVideo],
      ratedVideo: initialValues,
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

  handleRatingSuccess = async () => {
    const { history, callbackPath } = this.props;
    const status = await postRatingMusiclist(this.state.ratedVideos);
    console.log(status);
    // [Todo] 에러 상태에 따른 화면 분기
    switch (status) {
      case 401:
        // 권한 없음
        return history.push('/*');
      case 404:
        // 잘못된 토큰
        window.alert('잘못된 토큰 입니다.');
        break;
      case 419:
        // 만료된 토큰
        window.alert('만료된 토큰 입니다. 갱신이 필요합니다.');
        break;
      case 500:
        // 서버 에러
        window.alert('잘못된 토큰 입니다.');
        break;
      default:
        // 201
        return history.push(callbackPath);
    }
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
      videos: samples,
      currentVideo: samples[0],
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
          isOpen={ratedVideos.length >= 15} // Render this component when isOpen=true
          nickname={nickname}
          handleRatingSuccess={this.handleRatingSuccess}
        />
      </>
    );
  }
}

export default withRouter(Rating);
