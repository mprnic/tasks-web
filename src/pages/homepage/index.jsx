import { CheckOutlined, FormOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import { Status } from '../../const';
import { TasksService } from '../../services';
import { Header, TasksCard } from './components';

import './homepage.scss';

export const Homepage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    const getTasks = async searchString => {
        try {
            const newTasks = await TasksService.getTasks(searchString);
            setTasks(newTasks);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const onChangeStatus = (id, status) => onTaskUpdate(id, { status });

    const onDeleteClick = async id => {
        try {
            setIsLoading(true);
            await TasksService.deleteTask(id);
            getTasks();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const onSearch = searchString => {
        setIsLoading(true);
        getTasks(searchString);
    }

    const onTaskUpdate = async (id, task) => {
        try {
            setIsLoading(true);
            await TasksService.updateTask(id, task);
            getTasks();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="page">
            <Header onSearch={onSearch} />
            <div className="tasks">
                <TasksCard
                    isLoading={isLoading}
                    isToDo
                    tasks={tasks.filter(t => t.status === Status.TO_DO)}
                    title={<>To Do <FormOutlined /></>}
                    onChangeStatus={onChangeStatus}
                    onDeleteClick={onDeleteClick}
                />
                <TasksCard
                    isLoading={isLoading}
                    tasks={tasks.filter(t => t.status === Status.DONE)}
                    title={<>Done <CheckOutlined /></>}
                    onChangeStatus={onChangeStatus}
                    onDeleteClick={onDeleteClick}
                />
            </div>
        </div>
    );
}
