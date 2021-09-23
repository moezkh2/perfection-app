import { React, useState } from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateService } from '../../../Redux/actions/serviceactions'
export const Chat = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user);
    const service = useSelector(state => state.serviceReducer.service)
    var ser = service.filter((el) => el._id === props.location.state.serv._id)
    const [chatt, setchatt] = useState({})
    return (
        <div style={{ margin: "auto", width: "60%", paddingTop: "50px" }} >

            <div className="edit" style={{ paddingLeft: "140px" }}>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar style={{ height: "8%" }} src='https://cdn1.iconfinder.com/data/icons/customer-and-service-3/512/7-512.png' />
                        <Comment.Content>
                            <Comment.Author>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>1 day ago</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>
                                    The hours, minutes and seconds stand as visible reminders that your
                                    effort put them all there.
                                </p>
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                    <Comment>
                        <Comment.Avatar style={{ height: "8%" }} src='https://image.freepik.com/free-vector/cartoon-technician-repairman_184560-20.jpg' />
                        <Comment.Content>
                            <Comment.Author>Christian Rocha</Comment.Author>
                            <Comment.Metadata>
                                <div>2 days ago</div>
                            </Comment.Metadata>
                            <Comment.Text>I re-tweeted this.</Comment.Text>
                        </Comment.Content>
                    </Comment>

                    <Form >
                        <Form.TextArea
                            onChange={(e) => {e.preventDefault(); setchatt({...chatt, [user.name]: e.target.value })}} />
                        <div>
                            <Button primary onClick={(e) => {e.preventDefault(); dispatch(updateService(ser[0]._id, user,{...ser[0].chat,chatt})) }}>Reply</Button>
                        </div>

                    </Form>
                </Comment.Group>
            </div>
        </div>
    )
}
