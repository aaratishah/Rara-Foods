import React from 'react';
import moment from "moment";

export const DateColumn = (title = "N/A", dataIndex = '') => {
    return (
        {
            title: title,
            dataIndex: dataIndex,
            key: dataIndex + '_key',
            sorter: (a, b) =>
                moment(a[dataIndex]).unix() - moment(b[dataIndex]).unix(),
            sortDirections: ['descend', 'ascend'],
            ellipsis: true,
            render: (columnData) => {
              const isBefore = moment().isBefore(moment(columnData),'seconds');
              return columnData && (
                <div
                  style={{
                    whiteSpace: 'pre-line',
                  }}
                >
                  {isBefore ?  moment(columnData).toNow() : moment(columnData).fromNow()}
                </div>
              )
            },
        }
    );
};
