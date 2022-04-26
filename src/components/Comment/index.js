import { Avatar, Comment, Row } from 'antd'
import React, { useState } from 'react'
import { LocationIcon } from '../../assets'

export default function CommentSection() {

  const [isComment, setIsComment] = useState(false);
  
  return (
    !isComment?(<div style={{height: '100%',color:'#AAAFB5'}} className='flex items-center'>
      <Row className="flex justify-center items-center">
        <Row className="fluid flex justify-center"><img src={LocationIcon} className="icon22" /></Row>
        <Row>Start Your Conversation</Row>
        <Row style={{color:'#C5C9CE'}}className="my1 mx3 center">
          click anyware in the doc or select text to add a comment
        </Row>
      </Row>
    </div>):<><ExampleComment /></>
  )
}
const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    content={
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);