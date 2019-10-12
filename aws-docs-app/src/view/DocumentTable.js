import React, { useEffect, useState } from 'react'
import { downloadDocs, getAwsTemplate } from '../service/aws-docs'
import { Table } from 'antd'
import "antd/dist/antd.less";
import { LoadDocument } from './EditDocument'

const download = (docId) => {
  downloadDocs(docId)
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
        <LoadDocument docName={record.name}/>
    )
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'Download',
    key: 'download',
    render: (text, record) => (
      <span>
        <a onClick={() => download(record.name)}>Download</a>
      </span>
    ),
  },
];

export const DocumentTable =  () => {
  const [links, setLinks] = useState(null);
  useEffect(
    () => {
      getAwsTemplate().then(data => {
        setLinks(data)
      }).catch((err) => {
        console.log(err)
      })
    },
    []
  )

  if (! links) {
    return null
  }
  return (

    <div>
      <Table rowKey={record => record.docId} columns={columns} dataSource={links}/>
    </div>
  )
}

