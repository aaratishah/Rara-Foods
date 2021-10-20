import React from 'react';

export const NumberColumn = (title = "N/A", dataIndex = '', width) => {
    return (
        {
            width: width,
            title: title,
            dataIndex: dataIndex,
            key: dataIndex + '_key',
            sorter: (a , b) => {
                if (a[dataIndex] && Array.isArray(a[dataIndex])) return a[dataIndex].length - a[dataIndex].length;
                return (a[dataIndex] || 0 )- (b[dataIndex] || 0)
            }
            ,
            sortDirections: ['descend', 'ascend'],
            ellipsis: true,
            render: (columnData) => (
                <div
                    style={{
                        whiteSpace: 'pre-line',
                    }}
                >
                    {(columnData && Array.isArray(columnData) ) ? columnData.length : columnData}
                </div>
            ),
        }
    );
};
