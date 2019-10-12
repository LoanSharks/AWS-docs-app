import React from 'react'
import { Button, Form, Icon, Input, Upload } from 'antd'
import './DocumentUploaderForm.css'
import { uploadDocument } from '../service/aws-docs'

class DocumentUploaderView extends React.Component {

    handleSubmit = e => {
        e.preventDefault();


        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {fileList} = this.state;
                const formData = new FormData();
                fileList.forEach(file => {
                    formData.append('file', file);
                });
                uploadDocument(formData)
                console.log('Received values of form: ', values);
            }
        });
    };

    state = {
        fileList: [],
        uploading: false,
        signingUrl:''
    };

    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });
        uploadDocument(formData);
    }

    render()
    {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        return (<Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item {...formItemLayout} label="Upload Document">
                <div>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Select File
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" htmlType="submit">
                            Upload
                        </Button>
                    </Upload>
                </div>
            </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>

                </Form.Item>
            </Form>
        )
    }
}

const DocumentUploaderWrappedForm = Form.create({ name: 'validate_other' })(DocumentUploaderView);

export default DocumentUploaderWrappedForm
