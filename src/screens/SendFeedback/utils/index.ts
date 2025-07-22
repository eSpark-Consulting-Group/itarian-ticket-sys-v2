/**
 *
 * @param req
 * @returns response
 */

import { cannyApi } from '../../../api';
import {
  CannyBoards,
  CannyCategory,
  CannyPosts,
  Canny_CreateComment,
  Canny_CreatePost,
  Canny_CreateUser,
  Vote,
  Vote_CD,
} from '../../../types';
import { REACT_APP_CANNY_SECERT_KEY } from '@env';

const getCategories = async (req?: CannyCategory) => {
  const data: { apiKey: string & CannyCategory } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/categories/list', data);
    return res;
  } catch (err) {
    console.log('Error on fetch categories', err);
    throw new Error('Error ' + err);
  }
};

const getBoards = async () => {
  const data: { apiKey: string } = { apiKey: REACT_APP_CANNY_SECERT_KEY };
  try {
    const res = await cannyApi.post<{ boards: CannyBoards[] }>(
      '/boards/list',
      data,
    );
    return res;
  } catch (err) {
    console.log('Error on Fetching Boards', err);
    throw new Error('Error ' + err);
  }
};

const getPosts = async (req?: CannyPosts) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  console.log('request body for fetch posts??', data);
  try {
    const res = await cannyApi.post('/posts/list', data);
    return res;
  } catch (err) {
    console.log('Error on fetch categories', err);
    throw new Error('Error ' + err);
  }
};

const getPostbyId = async (req?: { id?: string }) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/posts/retrieve', data);
    return res;
  } catch (err) {
    console.log('Error on fetch categories', err);
    throw new Error('Error ' + err);
  }
};

const getCommentsByPostId = async (req?: { postID?: string }) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/comments/list', data);
    return res;
  } catch (err) {
    console.log('Error on fetch post comments', err);
    throw new Error('Error ' + err);
  }
};

const createPost = async (req?: Canny_CreatePost) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/posts/create', data);
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

const getUserByEmail = async (req?: { email?: string }) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post<Canny_CreateUser & { error: string }>(
      '/users/retrieve',
      data,
    );
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

const createUser = async (req?: Canny_CreateUser) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post<{id:string} & { error: string }>(
      '/users/create_or_update',
      data,
    );
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

const fetchVotes = async (req?: Vote) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post<{ hasMore: boolean; votes: any[] }>(
      '/votes/list',
      data,
    );
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

const createVote = async (req?: Vote_CD) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/votes/create', data);
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

const deleteVote = async (req?: Vote_CD) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/votes/delete', data);
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

const createComment = async (req?: Canny_CreateComment) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/comments/create', data);
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

const deleteComment = async (req?: { commentID: string }) => {
  const data: { apiKey: string } = {
    ...req,
    apiKey: REACT_APP_CANNY_SECERT_KEY,
  };
  try {
    const res = await cannyApi.post('/comments/delete', data);
    return res;
  } catch (err) {
    console.log('Error on create post', err);
    throw new Error('Error ' + err);
  }
};

export {
  getCategories,
  getBoards,
  getPosts,
  getPostbyId,
  getCommentsByPostId,
  createPost,
  getUserByEmail,
  createUser,
  fetchVotes,
  createVote,
  deleteVote,
  createComment,
  deleteComment,
};
