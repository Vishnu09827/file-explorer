import React from 'react';

export const Item = ({ item, isFolder, dragHandleProps, isDragging }) => {
    return (
        <div
            style={{
                padding: '8px',
                border: '1px solid #ddd',
                backgroundColor: isFolder ? '#f0f7ff' : '#f9f9f9',
                borderRadius: '4px',
                cursor: 'grab',
                boxShadow: isDragging ? '0 0 5px rgba(0,0,0,0.2)' : 'none',
            }}
        >
            <div {...dragHandleProps} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>
                    {isFolder ? '📁' : '📄'}
                </span>
                <span>{item.name}</span>
            </div>
        </div>
    );
};