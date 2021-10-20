import React from 'react';

export const BoolColumn = (title = "N/A", dataIndex = '',valueMapped, width) => {
    return (
        {
            width: width,
            title: title,
            dataIndex: dataIndex,
            key: dataIndex + '_key',
            sorter: (a = 0, b = 0) => a[dataIndex] - b[dataIndex]
            ,
            sortDirections: ['descend', 'ascend'],
            ellipsis: true,
            render: (columnData, row) => (
                <div
                    style={{
                        whiteSpace: 'pre-line',
                    }}
                >
                    {typeof  valueMapped === 'function' ? valueMapped(columnData, row) :  !!columnData ? 'Yes' : 'No'}
                </div>
            ),
        }
    );
};
