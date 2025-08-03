import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';

export const SortableItem = ({ id, item, isFolder, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        marginBottom: '8px',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Item
                item={item}
                isFolder={isFolder}
                dragHandleProps={{ ...attributes, ...listeners }}
            />
            {children}
        </div>
    );
};