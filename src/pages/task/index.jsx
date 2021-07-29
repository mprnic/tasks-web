import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import { TasksService } from '../../services';
import { Loader } from './components';

import './task.scss';

export const Task = () => {
    const [task, setTask] = useState({});
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getTask = async () => {
        const id = window.location.pathname.split('/').slice(-1)[0];
        setId(id);
        if (id !== "new") {
            try {
                const task = await TasksService.getTask(id);
                setTask(task);
            } catch (error) {
                console.log(error);
            }
        }
        setIsLoading(false);
    }
    
    const getInitialValues = () => {
        if (task.title) {
            return {
                description: task.description,
                title: task.title
            }
        }

        return {};
    }

    const onFinish = async data => {
        const task = {
            ...data,
            status: "todo"
        }

        setIsLoading(true);

        try {
            if (id === "new") {
                await TasksService.createTask(task);
            } else {
                await TasksService.updateTask(id, task);
            }
            window.location.assign('/');
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getTask();
    }, []);
 
    return (
        <div className="page task">
            {isLoading
                ? <Loader />
                :
                <Card>
                    <Form
                        initialValues={getInitialValues()}
                        labelCol={{ span: 7 }}
                        layout="horizontal"
                        wrapperCol={{ span: 12 }}
                        onFinish={onFinish}
                    >
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => window.history.back()}
                        />
                        <Form.Item wrapperCol={{ offset: 7, span: 12 }}>
                            <h2>New task</h2>
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Title is required' }]}
                        >
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Description is required' }]}
                        >
                            <Input.TextArea
                                placeholder="Description"
                                style={{ height: "200px" }}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 7, span: 12 }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            }
        </div>
    );
}
