import React, { useReducer } from 'react';

import { useDeleteOnePostMutation } from '../../slices/apiSlice';
import Styles from './PostInteractions.module.scss';
import PostModal from '../PostModals/PostModal';

const PostInteractions = ({ post }) => {

  const [editPost, toggleEditPost] = useReducer(checked => !checked, false);

  const [deletePost, { isLoading }] = useDeleteOnePostMutation();

  const onDelete = async () => {
    if (post.id && !isLoading) {
      try {
        await deletePost(post.id).unwrap();
      } catch (err) {
        console.error('Failed to delete the post: ', err)
      }
    }
  }

  const editPostModalOutlet = (
    editPost
    && <PostModal
      post={post}
      togglePost={toggleEditPost}
      modalType='edit'
    />
  )


  return (
    <div className={Styles.button_wrapper}>
      <button
        type='button'
        onClick={toggleEditPost}
      >Edit</button>
      <button
        type='button'
        onClick={onDelete}
      >Del</button>
      {editPostModalOutlet}
    </div>
  )
};

export default React.memo(PostInteractions);
