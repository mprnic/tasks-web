import { CheckOutlined, DeleteTwoTone, EditTwoTone, FormOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import React from 'react';

import { Status } from '../../../const';

export const TaskItem = ({ isToDo, task, onChangeStatus, onDeleteClick }) =>
    <List.Item>
        <List.Item.Meta
            description={
                <>
                    <div className="description">{task.description}</div>
                    <div className="buttons">
                        <Button
                            ghost
                            icon={<EditTwoTone />}
                            type="primary"
                            onClick={() => window.location.assign(`/tasks/${task._id}`)}
                        >
                            edit
                        </Button>
                        <Button
                            danger
                            ghost
                            icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
                            onClick={() => onDeleteClick(task._id)}
                        >
                            delete
                        </Button>
                        <Button
                            icon={isToDo ? <CheckOutlined /> : <FormOutlined />}
                            onClick={() => onChangeStatus(task._id, isToDo ? Status.DONE : Status.TO_DO)}
                        >
                            {isToDo ? "change status to Done" : "change status to To Do"}
                        </Button>
                    </div>
                </>
            }
            title={task.title}
        />
    </List.Item>;
