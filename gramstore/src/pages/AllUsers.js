import { Button, Col, Row, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from "../components/DefaultLayout";
import moment from "moment";
import { Link } from "react-router-dom";
import { followUser, getAllUsers } from '../redux/actions/userActions';

function AllUsers() {
    const {users} = useSelector((state)=>state.usersReducer)
    const dispatch= useDispatch()
    const currentuser = JSON.parse(localStorage.getItem('user'))
    const {followLoading} = useSelector((state)=>state.alertsReducer)

    useEffect(() => {
      dispatch(getAllUsers())
    }, [followLoading])
    
  return (
    <DefaultLayout>
      <div>
        <Row justify="center">
          <Col lg={20} className="d-flex">
            <Input style={{ width: "60%" }}></Input>
          </Col>
        </Row>
        <Row justify="center" gutter={16} className="mt-3">
          {users.map((user) => {
            return (
              <>
                {currentuser._id !== user._id && (
                  <Col lg={5} xs={24} className="text-left">
                    <div className="bs1 p-2 mt-3">
                      {user.profilePicUrl == "" ? (
                        <p className="profilepic2">{user.username[0]}</p>
                      ) : (
                        <img
                          src={user.profilePicUrl}
                          height="60"
                          width="60"
                          style={{ borderRadius: "50%" }}
                        />
                      )}
                      <div>
                        <Link to={`/profile`}>{user.username}</Link>
                      </div>
                      <p>{moment(user.createdAt).format("MMM DD yyyy")}</p>
                      {user.followers.find((obj) => obj == currentuser._id) ? (
                        <div className="d-flex">
                          <Button>Following</Button>
                          <Button className='ml-2'>Unfollow</Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            dispatch(
                              followUser({
                                currentuserid: currentuser._id,
                                receiveruserid: user._id,
                              })
                            );
                          }}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </Col>
                )}
              </>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AllUsers