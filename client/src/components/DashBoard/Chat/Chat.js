import React, { useState, useEffect } from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateService } from '../../../Redux/actions/serviceactions'
import { getUser } from '../../../Redux/actions/useractions'

export const Chat = (props) => {
    /* useEffect(() => {
        dispatch(getUser())
    }, []) */
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user);
    const service = useSelector(state => state.serviceReducer.service)
    var ser = service.filter((el) => el._id === props.serv?._id)
    const [chatt, setchatt] = useState(ser[0]?.chat)
    return (
        <div className="edit" style={{ paddingLeft: "140px", margin: "auto", width: "60%", paddingTop: "50px", marginTop: '60px', height: 'auto' }}>
            {ser[0]?.chat.map((el) => {
                console.log(Object.keys(el))
                return (
                    <Comment.Group>
                        <Comment>
                            {(Object.keys(el)[0] === ser[0].ClientId.name) ?
                                <Comment.Avatar style={{ height: "8%" }} src='https://cdn1.iconfinder.com/data/icons/customer-and-service-3/512/7-512.png' /> :
                                <Comment.Avatar style={{ height: "8%" }} src='https://cdn1.vectorstock.com/i/1000x1000/66/20/electric-technician-man-vector-8476620.jpg' />
                            }
                            <Comment.Content>
                                <Comment.Author>{Object.keys(el)}</Comment.Author>
                                <Comment.Metadata>
                                    <div>1 day ago</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <p>
                                        {Object.values(el)}
                                    </p>
                                </Comment.Text>
                                <Comment.Actions>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                )
            })}
            <Comment.Group>
                <Form >
                    <Form.TextArea
                        onChange={(e) => { e.preventDefault(); setchatt({ [user.name]: e.target.value }) }} />
                    <div>
                        <Button primary onClick={(e) => { dispatch(updateService(ser[0]._id, user, { ...ser[0], chat: [...ser[0]?.chat, chatt] })) }}>Reply</Button>
                    </div>
                </Form>
            </Comment.Group>
        </div>
    )
}