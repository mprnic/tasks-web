import { Button, Input, PageHeader } from 'antd';
import React from 'react';

export const Header = ({ onSearch }) =>
    <PageHeader
        extra={[
            <Button
                key="create-new"
                type="primary"
                onClick={() => window.location.assign('/tasks/new')}
            >
                Create new task
            </Button>
        ]}
        ghost
        title="My tasks"
    >
        <div className="header-search">
            <Input.Search
                enterButton
                placeholder="Search by task name"
                onSearch={onSearch}
            />
        </div>
    </PageHeader>;
