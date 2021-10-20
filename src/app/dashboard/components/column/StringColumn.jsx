import React from 'react';

export const StringColumn = (title="N/A",dataIndex='', valueMapped) => {

    return (
        {
            title: title,
            dataIndex: dataIndex,
            key: dataIndex+'_key',
            sorter: (a='', b='') => {
                if(a && b){
                    return a[dataIndex].localeCompare(b[dataIndex])
                }
            },
            sortDirections: ['descend', 'ascend'],
            ellipsis: true,
            render: (columnData, row) => (
                <div
                    style={{
                        whiteSpace: 'pre-line',
                    }}
                >
                    {typeof  valueMapped === 'function' ? valueMapped(columnData, row) :  columnData}
                </div>
            ),
        }
    );
};
