import { Card, List, Spin } from 'antd';
import React from 'react';

import { TaskItem } from '.';

export const TasksCard = ({ isLoading, isToDo, tasks, title, onChangeStatus, onDeleteClick }) =>
    <Card
        className="task-card"
        title={title}
    >
        <Spin spinning={isLoading}>
            <List
                dataSource={tasks}
                itemLayout="horizontal"
                renderItem={task =>
                    <TaskItem
                        isToDo={isToDo}
                        task={task}
                        onChangeStatus={onChangeStatus}
                        onDeleteClick={onDeleteClick}
                    />
                }
            />
        </Spin>
    </Card>;
